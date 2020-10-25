const jwt = require('jsonwebtoken');
const { key } = require('../configs/jwtdata');
const { UnauthorizedError } = require('../errors/errors');
const { statusMessage } = require('../configs/messages');

module.exports = (req, res, next) => {
  console.log(req);
  if (!req.cookies.jwt) {
    return next(new UnauthorizedError(statusMessage.unauthorizedError));
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    return next(new UnauthorizedError(statusMessage.unauthorizedError));
  }
  req.user = payload;
  return next();
};
