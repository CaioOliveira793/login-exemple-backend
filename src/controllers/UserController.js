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
	}
}
