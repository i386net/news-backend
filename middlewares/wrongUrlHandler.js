const { statusMessage } = require('../configs/messages');
const { NotFoundError } = require('../errors/errors');

module.exports.wrongUrlHandler = (req, res, next) => {
  next(new NotFoundError(statusMessage.resourseNotFoundError));
};
