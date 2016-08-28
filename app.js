var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser  = require('body-parser');
var passport    = require('passport');
var cors        = require('cors');

var config      = require('./config');
var db          = require('./db/couchbase');
var index       = require('./modules/routes/index');
var uploads     = require('./modules/routes/uploads');

require('./modules/auth/passport');

db.start();

var app = express();

app.use(cors());
app.use(passport.initialize());

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'html');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Headers', 'origin, authorization, X-Requested-With, content-type, accept, Content-Length, Access-Control-Allow-Origin');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//        res.header('Accept','*/*');
        res.header('Access-Control-Max-Age', '86400'); // 24 hours
        res.header('Accept-Encoding','gzip, deflate, sdch');
        next();
        });

app.use('/', index);
app.use('/uploads', uploads);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('page_'+ (err.status || 500), {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('page_'+(err.status || 500), {
    message: err.message,
    error: {}
  });
});

module.exports = app;
