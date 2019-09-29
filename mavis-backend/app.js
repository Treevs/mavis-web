var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mavis", { useNewUrlParser: true });
mongoose.promise = global.Promise;



var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// var MLBPlayer = require(__dirname+'/models/MLBPlayer');
var Player = require(__dirname+'/models/Player');
var User = require(__dirname+'/models/User');

require(__dirname+'/config/passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use(require('./routes'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/players', function(req, res) {
  // var query = MLBPlayer.findOne({'name': "Mike Trout"}).exec({

  // });
  Player.find({}).lean().exec(function (err, docs) {
    // docs are plain javascript objects instead of model instances
    res.send(docs);
  });
  // console.log(query);
  // res.send("query");
  
});



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
