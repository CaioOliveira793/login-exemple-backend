const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
	create: celebrate({
		[Segments.BODY]: Joi.object().keys({
			firstName: Joi.string().required().min(3).max(15).pattern(/^[a-z]+$/i),
			lastName: Joi.string().required().min(3).max(15).pattern(/^[a-z]+$/i),
			email: Joi.string().required().max(20).email(),
			username: Joi.string().required().min(5).max(20).pattern(/^([a-z\d]-?[a-z\d]*)+[^\W_]$/i),
			password: Joi.string().required().min(8).max(30)
		})
	}),

	index: celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number().integer().min(1),
			first: Joi.string().pattern(/^[a-z]+$/i)
		})
	}),

	show: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required().min(1)
		})
	}),

	update: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required().min(1)
		}),
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().max(20).email(),
			firstName: Joi.string().min(3).max(15).pattern(/^[a-z]+$/i),
			lastName: Joi.string().min(3).max(15).pattern(/^[a-z]+$/i),
			password: Joi.string().min(8).max(30)
		})
	}),

	destroy: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required().min(1)
		})
	})
}
