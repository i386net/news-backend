const rateLimit = require('express-rate-limit');
const { limiter } = require('../configs/messages');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15m
  max: 100,
  message: limiter.apiLimiter,
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1h
  max: 10, // 10 reqs
  message: limiter.loginLimiter,
});

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1h
  max: 10,
  message: limiter.loginLimiter,
});

module.exports = { apiLimiter, createAccountLimiter, loginLimiter };
