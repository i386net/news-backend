const jwt = require('jsonwebtoken');
const { key } = require('../configs/jwtdata');
const { UnauthorizedError } = require('../errors/errors');
const { statusMessage } = require('../configs/messages');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(new UnauthorizedError(statusMessage.unaithorizedError));
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    return next(new UnauthorizedError(statusMessage.unaithorizedError));
  }
  req.user = payload;
  return next();
};
