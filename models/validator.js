const Joi = require("@hapi/joi");

const validateUser = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
  address: Joi.string().min(6),
  number: Joi.number().min(11),
  gender: Joi.string().min(4).max(6),
});

const validateSuggestion = Joi.object({
  name: Joi.string().min(4).required(),
  description: Joi.string().required(),
  category: Joi.string().min(7).required(),
  reason: Joi.string().min(6).required(),
});

module.exports = {
  validateUser,
  validateSuggestion,
};
