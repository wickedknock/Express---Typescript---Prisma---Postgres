import Joi from 'joi';

export = {
	createUserSchema: Joi.object({
		first_name: Joi.string().required().max(100),
		last_name: Joi.string().required().max(100),
		email: Joi.string().email().required().max(100),
		phone: Joi.string()
			.pattern(/\d{16}$/)
			.required()
			.messages({
				'string.pattern.base': 'Phone number must be exactly 16 digits',
				'any.required': 'Phone number is required'
			}),
		password: Joi.string()
			.min(8)
			.max(50)
			.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
			.required()
			.messages({
				'string.min':
					'Password must be at least {#limit} characters long',
				'string.max':
					'Password cannot be longer than {#limit} characters',
				'string.pattern.base':
					'Requires at least one lowercase, one uppercase, and one digit',
				'any.required': 'Password is required'
			}),
		birthday: Joi.string()
			.pattern(/^\d{4}-\d{2}-\d{2}$/)
			.required()
			.messages({
				'string.pattern.base': 'Invalid date format. Use "yyyy-mm-dd"',
				'any.required': 'Birthday is required'
			})
	}),

	ValidAccountId: Joi.string().uuid().message('Not a Valid UUID'),

	LoginUserSchema: Joi.object({
		email: Joi.string().email().required().max(100),
		password: Joi.string()
			.min(8)
			.max(50)
			.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
			.required()
			.messages({
				'string.min':
					'Password must be at least {#limit} characters long',
				'string.max':
					'Password cannot be longer than {#limit} characters',
				'string.pattern.base':
					'Requires at least one lowercase, one uppercase, and one digit',
				'any.required': 'Password is required'
			})
	})
};
