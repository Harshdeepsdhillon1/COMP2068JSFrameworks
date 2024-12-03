var express = require('express');
var router = express.Router();

// Login Page (GET)
router.get('/login', (req, res) => res.render('login', { title: 'Login' }));

// Register Page (GET)
router.get('/register', (req, res) => res.render('register', { title: 'Register' }));

module.exports = router;
