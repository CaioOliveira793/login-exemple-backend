const { Router } = require('express');

const UserConroller = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

const routes = Router();

routes.post('/login', LoginController.login);

routes.get('/users', UserConroller.index);
routes.post('/users', UserConroller.store);
routes.put('/users/:id', UserConroller.update);
routes.delete('/users', UserConroller.destroy);

module.exports = routes;
