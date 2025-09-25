const Joi = require('joi');


const Signupvalidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().email().required(),
        firstname: Joi.string().min(3).max(100).required(),
        lastname: Joi.string().min(3).max(100).required(),
        phone: Joi.number().required(),
        email: Joi.string().email().required(),
        position: Joi.string().min(2).max(100).required(),
        department: Joi.string().min(2).max(100).required(),
        company: Joi.string().min(3).max(100).required(),
        website: Joi.string().min(3).max(100).required(),
        bio: Joi.string().min(5).max(100).required(),
        skills: Joi.required(),
        password: Joi.string().min(3).max(100).required(),
        location: Joi.string().min(5).max(100).required(),
        linkedin: Joi.string().uri(),
        profileurl: Joi.string().uri().required()
    })
    //object is in the form of string
    var { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'bad request', error
        })
    }
    next();
}

const Loginvalidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().email().required(),
        password: Joi.string().min(5).max(20).required()
    })

    var { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "bad request"

        })
    }
    next();
}
module.exports = {
    Loginvalidation,
    Signupvalidation
}