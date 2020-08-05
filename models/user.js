const mongoose = require('mongoose');
const mongooseValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { emailValidationOptions } = require('../configs/appdata');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени 2 символа'],
    maxlength: [30, 'Максимальная длина имени 30 символов'],
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email, emailValidationOptions),
      message: (props) => `${props.value} некорректная почта`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  articles: [{
    type: mongoose.Schema.ObjectID,
    ref: 'article',
    default: [],
  }],
},
{ timestamps: true });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неверная почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject((new Error('Неверная почта или пароль')));
        }
        return user;
      });
    });
};
userSchema.plugin(mongooseValidator, { message: 'Пользователь с таким адресом уже существует.' });

module.exports = mongoose.model('user', userSchema);
