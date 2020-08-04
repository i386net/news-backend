const {
  NODE_ENV, PORT, WEB_HOST, DB_HOST,
} = process.env;
let webAddress;
let port;
let dbAddress;
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  connectTimeoutMS: 0,
};

if (NODE_ENV !== 'production') {
  webAddress = 'http://localhost' || WEB_HOST;
  port = 3000 || PORT;
  dbAddress = 'mongodb://localhost:27017/newsdb' || DB_HOST;
}

module.exports = {
  webAddress, port, dbAddress, dbOptions,
};
