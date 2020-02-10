const User = require('../models/User');

module.exports = {
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
				message: 'a user with these credentials was not found'
			});

		} catch (err) {
			console.log(err);
			return res.status(500).send();
		}
	}
}
