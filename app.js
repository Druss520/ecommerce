var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('config-lite');
var winston = require('winston');
var expressWinston = require('express-winston');

var mongoose = require("./DAO/mongoose.js");

var db =mongoose();

var route = require('./routes/index');


var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name:config.session.key,
  secret:config.session.secret,
  cookie:{
    maxAge:config.session.maxAge
  },
  store: new MongoStore({
    url:config.dbpath
  })
}));


app.use(expressWinston.logger({
  transports:[
      // new (winston.transports.Console)({
      //   json:true,
      //   colorize:true
      // }),
      new winston.transports.File({
        filename:'logs/success.log'
      })
  ]
}));
route(app);
app.use(expressWinston.errorLogger({
  transports: [
    // new winston.transports.Console({
    //   json: true,
    //   colorize: true
    // }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  // res.json(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err)
});

module.exports = app;
