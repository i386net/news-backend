const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const { celebrate, errors, JOI } = require('celebrate');
const cookeParser = require('cookie-parser');
const {
  webAddress, port, dbAddress, dbOptions,
} = require('./configs/appdata.js');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { NotFoundError } = require('./errors/errors');
const { createUser, login } = require('./controllers/users');
const { statusMessage } = require('./configs/messages');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookeParser());
mongoose.connect(dbAddress, dbOptions)
  .then(() => console.log(`DB connection on: ${dbAddress}`))
  .catch(() => new Error(statusMessage.dbConnectionError));

// --- routres ----
app.post('/signup', createUser);
app.post('/signin', login);
// --- end routes ----

// --- logger and joi errors --

app.use('*', (req, res, next) => {
  next(new NotFoundError(statusMessage.resourseNotFoundError));
});
app.use(errorsHandler);

app.listen(port, () => console.log(`Server is listening on: ${webAddress}:${port}`));
