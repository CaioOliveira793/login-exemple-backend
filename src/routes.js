const { Router } = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserConroller = require('./app/controllers/UserController');
const UserValidator = require('./app/validators/UserValidator');
const AuthController = require('./app/controllers/AuthController');

const routes = Router();

routes.post('/session', AuthController.authenticate);

routes.post('/users', UserValidator.create, UserConroller.create);
routes.get('/users', UserValidator.index, authMiddleware, UserConroller.index);
routes.get('/users/:id', UserValidator.show, authMiddleware, UserConroller.show);
routes.put('/users/:id', UserValidator.update, authMiddleware, UserConroller.update);
routes.delete('/users/:id', UserValidator.destroy, authMiddleware, UserConroller.destroy);

module.exports = routes;
