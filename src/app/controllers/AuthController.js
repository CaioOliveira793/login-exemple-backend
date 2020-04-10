const { Op } = require('sequelize');

const { User } = require('../models');
const generateToken = require('../utils/generateToken');

module.exports = {
	async authenticate(req, res) {
		const { username = '', email = '', password } = req.body;

		try {
			const user = await User.findOne({
				where: {
					[Op.or]: [{ email }, { username }]
				}
			});

			if (!user)
				return res.status(400).json({ error: 'User not found' });

			if (!(await user.comparePassword(password)))
				return res.status(401).json({ error: 'Invalid password' });

			user.password = undefined;

			return res.json({ user, token: generateToken({ id: user.id }) });

		} catch (err) {
			return res.status(500).json();
		}
	},
}
