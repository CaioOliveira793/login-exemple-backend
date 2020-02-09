const { Router } = require('express');

const UserConroller = require('./controllers/UserController');

const routes = Router();

routes.get('/users', UserConroller.login);
routes.post('/users', UserConroller.store);
routes.delete('/users', UserConroller.destroy);

module.exports = routes;
