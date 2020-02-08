const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
	return res.json({ working: true });
});

module.exports = routes;
