
const joi = require('joi')

const login = {
    body: joi.object().keys({
    email: joi.string().required().email(),
    password:joi.string().required()
    })
}

const registration = {
    body: joi.object().keys({
    name: joi.string().required().min(4).max(30),
    email: joi.string().required().email(),
    password:joi.string().min(8).required().pattern(/[a-z A-Z 0-9]/)
    })
}