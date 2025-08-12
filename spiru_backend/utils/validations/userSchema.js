const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string().required().messages({
        "string.base": "fristName must be a string",
        "any.required": "firstName is required",
        "string.empty": "firstName is not allowed to be empty"
    }),

    lastName: Joi.string().required().messages({
        "string.base": "lastName must be a string",
        "any.required": "lastName is required",
        "string.empty": "lastName is not allowed to be empty"
    }),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().messages({
        "string.base": "phone must be a string",
        "any.required": "phone is required",
        "string.empty": "phone is not allowed to be empty",
        "string.email": "email must be a valid email"

    }),

    password: Joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        "string.base": "password must be a string",
        "any.required": "password is required",
        "string.empty": "password is not allowed to be empty",
        "string.max": "password length must be less than or equal to 30 characters long",
        "string.min": "password length must be at least 3 characters long"
    }),

    phone: Joi.string().required().messages({
        "string.base": "phone must be a string",
        "any.required": "phone is required",
        "string.empty": "phone is not allowed to be empty"
    })



})

const userLoginSchema = Joi.object({

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().messages({
        "string.base": "phone must be a string",
        "any.required": "phone is required",
        "string.empty": "phone is not allowed to be empty",
        "string.email": "email must be a valid email"

    }),

    password: Joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        "string.base": "phone must be a string",
        "any.required": "phone is required",
        "string.empty": "phone is not allowed to be empty",
        "string.max": "password length must be less than or equal to 30 characters long",
        "string.min": "password length must be at least 3 characters long"
    })

})
const changepasswordSchema = Joi.object({


    oldPasseword: Joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        "string.base": "phone must be a string",
        "any.required": "phone is required",
        "string.empty": "phone is not allowed to be empty",
        "string.max": "password length must be less than or equal to 30 characters long",
        "string.min": "password length must be at least 3 characters long"
    }),
    newPasseword: Joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        "string.base": "phone must be a string",
        "any.required": "phone is required",
        "string.empty": "phone is not allowed to be empty",
        "string.max": "password length must be less than or equal to 30 characters long",
        "string.min": "password length must be at least 3 characters long"
    })

})


module.exports = { userSchema, userLoginSchema, changepasswordSchema }