const { celebrate, Joi, Segments } = require('celebrate');
const { User } = require('../models');

module.exports = {
	authenticate: celebrate({
		[Segments.BODY]: Joi.object().keys({
			username: Joi.alternatives().try(
					User.validation.username().required(),
					User.validation.email().required()
				).required(),
			email: Joi.alternatives().try(
					User.validation.username().required(),
					User.validation.email().required()
				).required(),
			password: User.validation.password().required()
		})
	})
}
