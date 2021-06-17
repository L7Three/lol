var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');

var LOL2Router = require('./routes/LOL2');
var indexRouter = require('./routes/index');
var feedbackRouter = require('./routes/feedback');
var xdminRouter = require('./routes/xdmin');
var newsRouter = require('./routes/news');
var xdminlogoRouter = require('./routes/xdminlogo');
var buyRouter = require('./routes/buy');
var pkRouter = require('./routes/pk');
var heroRouter = require('./routes/hero');
var issueRouter = require('./routes/issue');
var userRouter = require('./routes/user');
var hotRouter = require('./routes/hot');
var chatRouter = require('./routes/chat');
var helpRouter = require('./routes/help');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("123"));
app.use(session({
  secret:"123",
  saveUninitialized:true,
  resave:false,
  cookie:{maxAge:60000000000}
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', LOL2Router);
app.use('/index',indexRouter);
app.use('/feedback',feedbackRouter);
app.use('/xdmin',xdminRouter);
app.use('/news',newsRouter);
app.use('/xdminlogo',xdminlogoRouter);
app.use('/buy',buyRouter);
app.use('/pk',pkRouter);
app.use('/hero',heroRouter);
app.use('/issue',issueRouter);
app.use('/user',userRouter);
app.use('/hot',hotRouter);
app.use('/chat',chatRouter);
app.use('/help',helpRouter);


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
  console.log("错误"+err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
