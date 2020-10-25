require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const {
  dbOptions, signupValidationOptions, signinValidationOptions,
} = require('./configs/appdata.js');
const { wrongUrlHandler } = require('./middlewares/wrongUrlHandler');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { requestsLogger, errorsLogger } = require('./middlewares/logger');
const { createUser, login, logout } = require('./controllers/users');
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

const allowedCors = [
  'http://localhost:8080',
  'http://i386net.github.io/',
  'https://i386net.github.io/',
  'http://news.i386.me/',
  'https://news.i386.me/',
];

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
// app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(DB_HOST, dbOptions)
  .then(() => console.log(`${timestamp} DB connection on: ${DB_HOST}`))
  .catch(() => new Error(statusMessage.dbConnectionError));
app.use(requestsLogger);

app.post('/signup', celebrate(signupValidationOptions), createAccountLimiter, createUser);
app.post('/signin', celebrate(signinValidationOptions), loginLimiter, login);
app.get('/signout', logout);
app.use(auth);
app.use('/users', apiLimiter, userRouter);
app.use('/articles', articleRouter);

app.use(errors());

app.use('*', wrongUrlHandler);
app.use(errorsHandler);
app.use(errorsLogger);

app.listen(PORT, () => console.log(`${timestamp} Сервер запущен по адресу: ${WEB_HOST}:${PORT}`));
