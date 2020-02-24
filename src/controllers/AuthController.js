const bcryptjs = require('bcryptjs');

const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const capitalize = require('../utils/capitalize');

const ROUNDS = 10;

module.exports = {
	async register(req, res) {
		const { firstName, lastName, email, password } = req.body;

		try {
			const usedEmail = await User.findOne({ where: { email } });

			if (usedEmail)
				return res.status(400).json({ error: 'User already exists' });

			const user = await User.create({
				firstName: capitalize(firstName),
				lastName: capitalize(lastName),
				email,
				password: await bcryptjs.hash(password, ROUNDS)
			});

			user.password = undefined;

			return res.status(201).json(user);

		} catch (err) {
			return res.status(500).json({
				error: 'An error has occurred on server during user creation'
			});
		}
	},

	async authenticate(req, res) {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({ where: { email } });

			if (!user)
				return res.status(400).json({ error: 'User not found' });

			if (!await bcryptjs.compare(password, user.password))
				return res.status(400).json({ error: 'Invalid password' });

			user.password = undefined;

			return res.json({ user, token: generateToken({ id: user.id }) });

		} catch (err) {
			return res.status(500).json({
				error: 'An error has occurred on server during user authentication'
			});
		}
	},
}
