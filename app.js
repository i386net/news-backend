require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const cookeParser = require('cookie-parser');
const {
  dbOptions, signupValidationOptions, signinValidationOptions,
} = require('./configs/appdata.js');
const { wrongUrlHandler } = require('./middlewares/wrongUrlHandler');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { requestsLogger, errorsLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { statusMessage } = require('./configs/messages');
const { userRouter, articleRouter } = require('./routes/index.js');
const auth = require('./middlewares/auth');
const { apiLimiter, createAccountLimiter, loginLimiter } = require('./middlewares/rateLimiter');

const timestamp = (new Date(Date.now())).toLocaleTimeString();

const {
  PORT = 3000,
  WEB_HOST = 'http://localhost',
  DB_HOST = 'mongodb://localhost:27017/newsdb',
} = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookeParser());
mongoose.connect(DB_HOST, dbOptions)
  .then(() => console.log(`${timestamp} DB connection on: ${DB_HOST}`))
  .catch(() => new Error(statusMessage.dbConnectionError));
app.use(requestsLogger);

app.post('/signup', celebrate(signupValidationOptions), createAccountLimiter, createUser);
app.post('/signin', celebrate(signinValidationOptions), loginLimiter, login);
app.use(auth);
app.use('/users', apiLimiter, userRouter);
app.use('/articles', articleRouter);

app.use(errorsLogger);
app.use(errors());

app.use('*', wrongUrlHandler);
app.use(errorsHandler);

app.listen(PORT, () => console.log(`${timestamp} Сервер запущен по адресу: ${WEB_HOST}:${PORT}`));
