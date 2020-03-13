const { Router } = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserConroller = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');

const routes = Router();

routes.post('/auth/authenticate', AuthController.authenticate);
routes.post('/auth/register', AuthController.register);

routes.use('/users', authMiddleware);
routes.get('/users', UserConroller.index);
routes.get('/users/:id', UserConroller.show);
routes.put('/users/:id', UserConroller.update);
routes.delete('/users/:id', UserConroller.destroy);

module.exports = routes;
