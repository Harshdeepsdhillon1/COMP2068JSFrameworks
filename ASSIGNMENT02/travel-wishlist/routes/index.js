const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist'); // Import Wishlist model

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    // Fetch wishlist for the logged-in user (or adjust as needed for public display)
    const wishlist = req.user 
      ? await Wishlist.find({ user: req.user._id }) 
      : []; // If no user is logged in, show an empty list or handle it as needed
    res.render('index', { 
      title: 'Travel Wishlist Planner', 
      wishlist 
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
