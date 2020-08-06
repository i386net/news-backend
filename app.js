const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const cookeParser = require('cookie-parser');
const {
  webAddress, port, dbAddress, dbOptions, signupValidationOptions, signinValidationOptions,
} = require('./configs/appdata.js');
const { wrongUrlHandler } = require('./middlewares/wrongUrlHandler');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { requestsLogger, errorsLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { statusMessage } = require('./configs/messages');
const { userRouter } = require('./routes/index.js');
const auth = require('./middlewares/auth');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookeParser());
mongoose.connect(dbAddress, dbOptions)
  .then(() => console.log(`DB connection on: ${dbAddress}`))
  .catch(() => new Error(statusMessage.dbConnectionError));
app.use(requestsLogger);

app.post('/signup', celebrate(signupValidationOptions), createUser);
app.post('/signin', celebrate(signinValidationOptions), login);
app.use(auth);
app.use('/users', userRouter);
// --- article routes ---

// --- end routes ----

// --- logger and joi errors --
app.use(errorsLogger);
app.use(errors());

app.use('*', wrongUrlHandler);
app.use(errorsHandler);

app.listen(port, () => console.log(`Server is listening on: ${webAddress}:${port}`));
