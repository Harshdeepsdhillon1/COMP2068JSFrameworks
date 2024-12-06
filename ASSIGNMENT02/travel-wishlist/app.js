var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wishlistRouter = require('./routes/wishlist');

var passport = require('passport');
var session = require('express-session');
var User = require('./models/userModel'); // Passport-Local Mongoose model

var mongoose = require('mongoose');
var configs = require('./config/globals');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);
require('hbs').registerPartials(__dirname + '/views/partials');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'TravelWishlistApp',
  resave: false,
  saveUninitialized: false,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wishlist', wishlistRouter);

// Connect to MongoDB
mongoose.connect(configs.ConnectionString.MongoDB)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error Connecting to MongoDB", err));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
