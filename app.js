/* app.js - Entry point for MiniArka App */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* Require db schemes and connection checking to db */
require('./app_api/models/db');
require('./app_api/models/orders');

/* Require known routes */
var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
var routesApi = require('./app_api/routes/index');


var app = express();

/* view engine setup */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

/* Pre-configs for webapp */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));
app.use('/', routes);
app.use('/api', routesApi);
app.use('/users', users);


/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* error handler */
app.use(function(err, req, res, next) {

  /* set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /* render the error page */
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
