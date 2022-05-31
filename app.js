require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var apiRouter = require('./routes/api')
var dev_db_url = 'mongodb://127.0.0.1/blog';

var mongoDB = dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser:true});                                                                     
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB conection error:')); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', blogRouter);
app.use('/', verifyToken, apiRouter);
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.get('/api', verifyToken, (req, res, next) =>{
  jwt.verify(req.token, process.env.password, (err, authData) => {
    if(err){
      res.sendStatus(403);
    } else {
      res.json({message:'Hello World', authData})
    }
  });  
});
//Api Login
app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: process.env.user,
    email: 'darioedgar@gmail.com'
  }
  jwt.sign({user}, process.env.password, (err, token) => {
    res.json({
      token
    })
  })
})

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1]
    req.token = bearerToken;
    next();
  }else{
    //I am Sorry!
    res.sendStatus(403);
  }
}
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
