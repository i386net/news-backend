const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const { celebrate, errors, JOI } = require('celebrate');
const cookeParser = require('cookie-parser');
const {
  webAddress, port, dbAddress, dbOptions,
} = require('./configs/appdata.js');
const { dbConnectionError } = require('./configs/messages.js');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { NotFoundError } = require('./errors/errors');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookeParser());
mongoose.connect(dbAddress, dbOptions)
  .then(() => console.log(`DB connection on: ${dbAddress}`))
  .catch(() => new Error(dbConnectionError));

// --- routres ----

// --- end routes ----

// --- logger and joi errors --

app.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден.'));
});
app.use(errorsHandler);

app.listen(port, () => console.log(`Server is listening on: ${webAddress}:${port}`));
