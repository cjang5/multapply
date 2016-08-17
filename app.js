'use strict';

const express    = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const cors       = require('cors');
const helmet     = require('helmet');
const mongoose   = require('mongoose');
require('dotenv').load();

const app = express();

// configure modules
app.use(logger('dev'));                              // 'dev' format: :method :url :status :response-time ms - :res[content-length]
app.use(bodyParser.urlencoded({ extended: false })); // use querystring library for parsing URLs
app.use(bodyParser.json());                          // parse json
app.use(cors());                                     // allow Cross-Origin Resource Sharing
app.use(helmet());                                   // some extra security for Express apps

// connect to DB
const dbConfig = require('./config/init/database');
mongoose.connect(dbConfig.address);

// Router
const router = require('./app/routes');
app.use('/api/v1', router);

// error logging
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// server definition
let server = app.listen(3000, function () {
  let host = server.address().address;
  host = (host == '::') ? 'localhost' : host;
  let port = server.address().port;

  console.log('App is running on http://%s:%s', host, port);
});







