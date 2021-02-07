const mongoose = require('mongoose');
const validator = require('validator');
const { urlValidationOptions } = require('../configs/appdata');
const { statusMessage } = require('../configs/messages');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url, urlValidationOptions),
      message: statusMessage.incorrectURL,
    },
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url, urlValidationOptions),
      message: statusMessage.incorrectURL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('article', articleSchema);
