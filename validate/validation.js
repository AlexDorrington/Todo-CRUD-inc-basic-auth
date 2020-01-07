const Joi = require('@hapi/joi')

const validateRegister = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .min(2),
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(6)
    })
    return schema.validate(data)
}

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(6)
    })
    return schema.validate(data)
}

module.exports =  {
    validateRegister,
    validateLogin
}