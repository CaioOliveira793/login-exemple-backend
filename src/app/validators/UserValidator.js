const { celebrate, Joi, Segments } = require('celebrate');
const { User } = require('../models');

module.exports = {
	create: celebrate({
		[Segments.BODY]: Joi.object().keys({
			firstName: User.validation.firstName().required(),
			lastName: User.validation.lastName().required(),
			email: User.validation.email().required(),
			username: User.validation.username().required(),
			password: User.validation.password().required()
		})
	}),

	index: celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number().integer().min(1),
			first: Joi.string().empty('').pattern(/^[a-z]+$/i)
		})
	}),

	show: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.string().guid({ version: ['uuidv4'] }).required()
		})
	}),

	update: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.string().guid({ version: ['uuidv4'] }).required()
		}),
		[Segments.BODY]: Joi.object().keys({
			email: User.validation.email(),
			firstName: User.validation.firstName(),
			lastName: User.validation.lastName(),
			password: User.validation.password()
		})
	}),

	destroy: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.string().guid({ version: ['uuidv4'] }).required()
		})
	})
}
