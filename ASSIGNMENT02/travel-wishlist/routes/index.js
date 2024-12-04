const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    res.render('index', { 
      title: 'Travel Wishlist Planner', 
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
