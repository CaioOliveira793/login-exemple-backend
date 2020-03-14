const { Op } = require('sequelize');

const { User } = require('../models');
const { isEmail } = require('validator');
const capitalize = require('../utils/capitalize');

module.exports = {
	async index(req, res) {
		const { page = 1, first = '' } = req.query;

		try {
			const users = await User.findAndCountAll({
				attributes: ['firstName', 'createdAt'],
				where: {
					firstName: {
						[Op.substring]: capitalize(first).split(' ', 1)[0]
					}
				},
				limit: 10,
				offset: (page - 1) * 10,
			});

			return res.json(users);

		} catch (err) {
			return res.status(500).send();
		}
	},

	async show(req, res) {
		const { id } = req.params;

		try {
			const user = await User.findByPk(id, {
				attributes: ['email', 'firstName', 'lastName', 'createdAt', 'updatedAt']
			});

			if (user) return res.json(user);

			return res.status(400).json({ error: 'User not found' });

		} catch (err) {
			return res.status(500).json({
				error: 'An error has occurred on server during user query'
			});
		}
	},

	async update(req, res) {
		const { email, firstName, lastName, password } = req.body;
		const { id } = req.params;

		if (email && !isEmail(email))
			return res.status(400).json({
				error: 'Invalid email'
			});

		if (password && password.length < 8)
			return res.status(400).json({
				error: 'Password less than 8 characters'
			});

		try {
			const [updated] = await User.update({
				email,
				firstName: (firstName) ? capitalize(firstName).split(' ', 1)[0] : undefined,
				lastName: (lastName) ? capitalize(lastName).split(' ', 1)[0] : undefined,
				password: (password) ? await (new User).encryptPassword(password) : undefined
			}, {
				where: { id }
			});

			if (updated) {
				const newUser = await User.findByPk(id, {
					attributes: ['email', 'firstName', 'lastName', 'createdAt', 'updatedAt']
				});

				return res.json(newUser);
			}

			return res.status(400).json({
				message: 'User not updated'
			});

		} catch (err) {
			return res.status(500).json({
				error: 'An error has occurred on server during user update'
			});
		}
	},

	async destroy(req, res) {
		const { id } = req.params;

		try {
			const destroied = await User.destroy({
				where: { id }
			});

			if (destroied)
				return res.json({ message: 'User deleted' });

			return res.status(400).json({
				error: 'User not deleted'
			});

		} catch (err) {
			return res.status(500).json({
				error: 'An error has occurred on server during user delete'
			});
		}
	}
}
