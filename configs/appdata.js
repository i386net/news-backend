const { Joi } = require('celebrate');
const { joiMessage } = require('./messages');

const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  connectTimeoutMS: 0,
};
const urlValidationOptions = {
  protocols: ['http', 'https'],
  require_protocol: true,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: true,
  allow_trailing_dot: false,
};
const emailValidationOptions = {
  require_tld: true,
};
const signupValidationOptions = {
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .pattern(/^[a-zA-Zа-яА-ЯёЁ -]*$/)
      .messages({
        'string.pattern.base': 'Имя должно быть строкой',
        'any.required': joiMessage.usernameRequired,
        'string.min': joiMessage.userNameMin,
        'string.max': joiMessage.userNameMax,
        'string.empty': joiMessage.userNameEmpty,
      }),
    email: Joi.string()
      .required()
      .email()
      .messages({
        'any.required': joiMessage.requiredParam,
        'string.email': joiMessage.emailNotValid,
        'string.empty': joiMessage.emptyParam,
      }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]*$/)
      .min(8)
      .max(16)
      .required()
      .messages(
        {
          'string.pattern.base': joiMessage.passwordAlphaNum,
          'string.min': joiMessage.passwordMin,
          'string.max': joiMessage.passwordMax,
          'string.empty': joiMessage.emptyParam,
        },
      )
    ,
  }),
};
const signinValidationOptions = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.empty': joiMessage.emptyParam,
        'any.required': joiMessage.requiredParam,
        'string.email': joiMessage.emailNotValid,
      }),
    password: Joi.string().required()
      .messages({
        'any.required': joiMessage.requiredParam,
        'string.empty': joiMessage.emptyParam,
      }),

  }),
};

module.exports = {
  dbOptions,
  urlValidationOptions,
  emailValidationOptions,
  signupValidationOptions,
  signinValidationOptions,
};
