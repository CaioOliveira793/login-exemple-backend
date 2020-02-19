const { Op } = require('sequelize');
const User = require('../models/User');

const capitalize = require('../utils/capitalize');

module.exports = {
	async store(req, res) {
		const { firstName, lastName, email, password } = req.body;

		try {
			const user = await User.create({
				firstName: capitalize(firstName),
				lastName: capitalize(lastName),
				email,
				password
			});

			return res.json(user);

		} catch (err) {
			console.log(err);
			return res.status(500).send();
		}
	},

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

	async update(req, res) {
		const { email, firstName, lastName, password } = req.body;
		const { id } = req.params;

		try {
			const updated = await User.update({
				email,
				firstName,
				lastName,
				password
			}, {
				where: {
					id
				}
			});

			if (updated[0]) {
				return res.json({
					message: 'user updated'
				});
			}

			return res.status(400).json({
				message: `can not update user ${id}`
			});

		} catch (err) {
			console.log(err);
			return res.status(500).send();
		}
	},

	async destroy(req, res) {
		const { id = -1, password } = req.body;

		try {
			const destroied = await User.destroy({
				where: {
					id,
					password
				}
			});

			if (destroied) {
				return res.json({
					message: 'user deleted'
				});
			}

			return res.status(401).json({
				message: 'user not deleted'
			});

		} catch (err) {
			console.log(err);
			return res.status(500).send();
		}
	}
}
