const Joi = require("@hapi/joi");

// Register validation
const registerValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    avatar: Joi.string().min(6),
    firstName: Joi.string().min(6).required(),
    lastName: Joi.string().min(6).required(),
    city: Joi.string().min(6).required(),
    postalCode: Joi.string().min(5).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    discipline: Joi.array().required(),
  };

  return Joi.validate(data, schema);
};

// login validation
const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(data, schema);
};

// forgotPassword validation
const forgotPasswordValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
  };

  return Joi.validate(data, schema);
};

// Register validation
const createFighter = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.forgotPasswordValidation = forgotPasswordValidation;
