const mongoose = require('mongoose');
const mongooseValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { emailValidationOptions } = require('../configs/appdata');
const { statusMessage } = require('../configs/messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, statusMessage.minlength],
    maxlength: [30, statusMessage.maxLengthError],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email, emailValidationOptions),
      message: statusMessage.incorrectMail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
},
{ timestamps: true });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(statusMessage.wrongAuthDataError));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject((new Error(statusMessage.wrongAuthDataError)));
        }
        return user;
      });
    });
};
userSchema.plugin(mongooseValidator, { message: statusMessage.conflictError });

module.exports = mongoose.model('user', userSchema);
