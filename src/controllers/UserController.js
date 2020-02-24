const { Op } = require('sequelize');

const User = require('../models/User');
const capitalize = require('../utils/capitalize');

module.exports = {
	async index(req, res) {
		const { page = 1, first = '' } = req.query;

		try {
			const users = await User.findAndCountAll({
				attributes: ['firstName', 'createdAt'],
				where: {
					firstName: {
						[Op.substring]: capitalize(first)
					}
				},
				limit: 10,
				offset: (page - 1) * 10,
			});

			return res.json(users);

		} catch (err) {
			console.log(err);
			return res.status(500).send();
		}
	},

	async show(req, res) {
		const { id } = req.params;

		try {
			const user = await User.findOne({
				attributes: ['firstName', 'lastName', 'email'],
				where: { id }
			});

			if (user) return res.json(user);

			return res.status(400).json({ message: `Cannot find user with id ${id}` });

		} catch (err) {
			return res.status(500).json({
				error: 'An error has occurred on server during user query'
			});
		}
	},

	async update(req, res) {
		const { email, firstName, lastName, password } = req.body;
		const { id } = req.params;

		try {
			const updated = await User.update({
				email,
				firstName,
				lastName,
				password
			}, { where: { id } });

			if (updated[0]) {
				return res.json({ message: 'User updated' });
			}

			return res.status(400).json({
				message: `Cannot update user with id ${id}`
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

			return res.status(500).json({
				error: `Cannot delete user with id ${id}`
			});

		} catch (err) {
			return res.status(500).json({
				error: 'An error has occurred on server during user delete'
			});
		}
	}
}
