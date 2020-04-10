const { Op } = require('sequelize');

const { User } = require('../models');
const generateToken = require('../utils/generateToken');
const capitalize = require('../utils/capitalize');

module.exports = {
	async create(req, res) {
		const { firstName, lastName, email, username, password } = req.body;

		try {
			const userExists = await User.findOne({
				where: {
					[Op.or]: [{ email }, { username }]
				}
			});

			if (userExists)
				return res.status(400).json({ error: 'User already exists' });

			const user = await User.create({
				firstName: capitalize(firstName),
				lastName: capitalize(lastName),
				email,
				username,
				password
			});

			user.password = undefined;

			return res.status(201).json({ user, token: generateToken({ id: user.id }) });

		} catch (err) {
			return res.status(500).json();
		}
	},

	async index(req, res) {
		const { page = 1, first = '' } = req.query;

		try {
			const users = await User.findAndCountAll({
				attributes: ['id', 'username', 'firstName', 'createdAt'],
				where: {
					firstName: {
						[Op.substring]: capitalize(first)
					}
				},
				limit: 10,
				offset: (page - 1) * 10,
			});

			res.header('X-Total-Count', users.count);

			return res.json(users.rows);

		} catch (err) {
			return res.status(500).json();
		}
	},

	async show(req, res) {
		const { id } = req.params;

		if (req.userId != id)
			return res.status(401).json({
				error: 'the authenticated user cannot show another user'
			});

		try {
			const user = await User.findByPk(id);

			user.password = undefined;

			if (user) return res.json(user);

			return res.status(400).json({ error: 'User not found' });

		} catch (err) {
			return res.status(500).json();
		}
	},

	async update(req, res) {
		const { email, firstName, lastName, password } = req.body;
		const { id } = req.params;

		if (req.userId != id)
			return res.status(401).json({
				error: 'the authenticated user cannot update another user'
			});

		try {
			const [updated] = await User.update({
				email,
				firstName: (firstName) ? capitalize(firstName) : undefined,
				lastName: (lastName) ? capitalize(lastName) : undefined,
				password
			}, {
				where: { id }
			});

			if (updated) {
				const newUser = await User.findByPk(id, {
					attributes: ['email', 'firstName', 'lastName', 'createdAt', 'updatedAt']
				});

				return res.json(newUser);
			}

			return res.status(400).json({ error: 'User not updated' });

		} catch (err) {
			return res.status(500).json();
		}
	},

	async destroy(req, res) {
		const { id } = req.params;

		if (req.userId != id)
			return res.status(401).json({
				error: 'the authenticated user cannot delete another user'
			});

		try {
			const destroied = await User.destroy({
				where: { id }
			});

			if (destroied) return res.status(204).json();

			return res.status(400).json({ error: 'User not deleted' });

		} catch (err) {
			return res.status(500).json();
		}
	}
}
