var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');

// Register Page (GET)
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Register Handler (POST)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Register the user
    const newUser = await User.register(new User({ username, email }), password);

    // Log the user in automatically
    req.logIn(newUser, (err) => {
      if (err) throw err;
      res.redirect('/wishlist');
    });
  } catch (err) {
    console.error('Registration Error:', err);

    let errorMsg = 'Registration failed.';
    if (err.name === 'UserExistsError') {
      errorMsg = 'A user with that email already exists.';
    }

    res.render('register', { title: 'Register', error: errorMsg });
  }
});

// Login Page (GET)
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    messages: req.session.messages || [],
  });
  req.session.messages = []; // Clear old messages
});

// Login Handler (POST)
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication Error:', err);
      return next(err);
    }

    if (!user) {
      req.session.messages = [info?.message || 'Invalid credentials'];
      return res.redirect('/users/login');
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Login Error:', err);
        return next(err);
      }
      res.redirect('/wishlist');
    });
  })(req, res, next);
});

// Logout (GET)
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout Error:', err);
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});

module.exports = router;
