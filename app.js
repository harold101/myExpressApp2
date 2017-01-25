var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nconf = require ('nconf');
var winston=require('winston');
var nunjucks = require('nunjucks');

var index = require('./routes/index');
var users = require('./routes/users');
//setting up error
var app = express();

nunjucks.configure('views', {
  autoescape:true,
  express:app
});


winston.add(winston.transports.File,{"filename":
    "error.log", "level":"error"});
winston.error("Something went wrong");



nconf.env("_");
nconf.file("config.json");

nconf.defaults({
  "http":{
    "port":8000
  }


});
winston.info("initialised nconf");
winston.info('HTTP Configuration', nconf.get("http"));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
const MongoClient = require('mongodb').MongoClient;
var db
MongoClient.connect('mongodb://starwars@localhost/starwars' function(err, database) ){


}
}


//app
 app.get('/', function(req, res) {
   res.send('Hello World')
 })

app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html')


app.post('/quotes', (req, res) => {
 console.log('Hellooooooooooooooooo!')
})




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
