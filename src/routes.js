const { Router } = require('express');

const UserConroller = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

const routes = Router();

routes.post('/login', LoginController.login);

routes.post('/users', UserConroller.store);
routes.get('/users', UserConroller.index);
routes.get('/users/:id', UserConroller.show);
routes.put('/users/:id', UserConroller.update);
routes.delete('/users/:id', UserConroller.destroy);

module.exports = routes;
