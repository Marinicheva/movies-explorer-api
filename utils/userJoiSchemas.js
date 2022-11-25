const { Joi } = require('celebrate');

// Незарегистрированный пользователь
const unregisteredUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
};

// Незалогиненный пользователь
const unloginedUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

// Залогиненный пользователь
const loginedUserSchema = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
};

module.exports = { unregisteredUserSchema, unloginedUserSchema, loginedUserSchema };
