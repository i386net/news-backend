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

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookeParser());
mongoose.connect(dbAddress, dbOptions)
  .then(() => console.log(`DB connection on: ${dbAddress}`))
  .catch(() => new Error(dbConnectionError)); // todo вынести в словарь !

app.listen(port, () => console.log(`Server in listening on: ${webAddress}:${port}`));
