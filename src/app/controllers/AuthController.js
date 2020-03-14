const { User } = require('../models');
const { isEmail } = require('validator');
const generateToken = require('../utils/generateToken');
const capitalize = require('../utils/capitalize');

module.exports = {
	async register(req, res) {
		const { firstName, lastName, email, password } = req.body;

		if (!isEmail(email))
			return res.status(400).json({
				error: 'Invalid email'
			});

		if (password.length < 8)
			return res.status(400).json({
				error: 'Password less than 8 characters'
			});

		try {
			const usedEmail = await User.findOne({ where: { email } });

			if (usedEmail)
				return res.status(400).json({ error: 'User already exists' });

			const user = await User.create({
				firstName: capitalize(firstName).split(' ', 1)[0],
				lastName: capitalize(lastName).split(' ', 1)[0],
				email,
				password: await (new User).encryptPassword(password)
			});

			user.password = undefined;

			return res.status(201).json(user);

		} catch (err) {
			console.log(err);
			return res.status(500).json({
				error: 'An error has occurred on server during user creation'
			});
		}
	},

	async authenticate(req, res) {
		const { email, password } = req.body;

		if (!isEmail(email))
			return res.status(400).json({
				error: 'Invalid email'
			});

		if (password.length < 8)
			return res.status(400).json({
				error: 'Password less than 8 characters'
			});

		try {
			const user = await User.findOne({ where: { email } });

			if (!user)
				return res.status(400).json({ error: 'User not found' });

			if (!(await user.comparePassword(password)))
				return res.status(401).json({ error: 'Invalid password' });

			user.password = undefined;

			return res.json({ user, token: generateToken({ id: user.id }) });

		} catch (err) {
			return res.status(500).json({
				error: 'An error has occurred on server during user authentication'
			});
		}
	},
}
