const { Router } = require('express');

const UserConroller = require('./controllers/UserController');

const routes = Router();

routes.post('/users', UserConroller.store);

module.exports = routes;
