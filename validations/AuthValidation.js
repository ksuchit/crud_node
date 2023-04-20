
const joi = require('joi')

const login = joi.object().keys({
    email: joi.string().required().email(),
    password:joi.string().required()
    })

const registration = joi.object().keys({
    name: joi.string().required().min(4).max(30),
    email: joi.string().required().email(),
    password:joi.string().min(8).required().pattern(/[a-z A-Z 0-9]/)
    })

module.exports={registration}