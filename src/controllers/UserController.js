const User = require('../models/User');

module.exports = {
	async store(req, res) {
		const { firstName, lastName, email, password } = req.body;

		try {
			const user = await User.create({
				firstName,
				lastName,
				email,
				password
			});

			return res.json(user);

		} catch (err) {
			console.log(err);
			return res.status(500).send();
		}
	},

	async login(req, res) {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({
				where: {
					email,
					password
				}
			});

			if (user) {
				return res.json(user);
			}

			return res.status(401).json({
				message: 'user not found'
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
