var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');
var quizRoutes = require('./routes/quiz');
var lang_nameRoutes = require('./routes/lang_name');

var db = require('./db');

var app = express();

db.connect(db.MODE_PRODUCTION, function(err){
    if(err){
        console.log("Unable to connect to mysql");
        process.exit(1);
    }
    else{
        console.log("Mysql Connected Successfully");
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


app.use('/api/v1/lang_name', lang_nameRoutes);
app.use('/api/v1/quiz', quizRoutes);
app.use('/', appRoutes);


// catch 404 and render the index page
app.use(function(req, res, next) {
  res.render('index')
});


module.exports = app;
