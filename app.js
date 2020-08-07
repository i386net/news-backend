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

const {
  port = 3000,
  webHost = 'http://localhost',
  dbHost = 'mongodb://localhost:27017/newsdb',
} = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookeParser());
mongoose.connect(dbHost, dbOptions)
  .then(() => console.log(`DB connection on: ${dbHost}`))
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

app.listen(port, () => console.log(`Сервер запущен по адресу: ${webHost}:${port}`));
