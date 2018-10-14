var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors =  require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const  dealsRouter =  require('./routes/deals');
const users = require('./models/users');
const history =  require('./routes/transactionHistory');
const mongoose =  require('mongoose');
const passport = require('passport');
var app = express();
const url = 'mongodb://localhost:27017/LoyaltyProgram';
const connect= mongoose.connect(url);

// view engine setup



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.options('*',cors());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

app.use('/public/images',express.static('public/images'));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use('/', indexRouter);
app.use('/history',history)
app.use('/users', usersRouter);
app.use('/deals',dealsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
