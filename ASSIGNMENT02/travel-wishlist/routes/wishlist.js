// Naming convention > controllers/routers are plural
// Import express and create router object
const express = require("express");
const router = express.Router();
// Import mongoose model to be used
const Wishlist = require("../models/wishlistModel");
// Configure GET/POST handlers
// Path relative to the one configured in app.js > /projects
// GET /projects/
router.get("/", async (req, res, next) => {
    // retrieve ALL data, and sort by dueDate
    let wishlist = await Wishlist.find().sort({ date: 1 });
    // render view
    res.render("wishlist/index", { 
        title: "WISHLIST",
        dataset: wishlist
    })
});
// GET /projects/add
router.get('/add', (req, res, next) => {
    res.render('wishlist/add', { title: 'Add a New Destination' });
});

router.post('/add', async (req, res, next) => {
  // Create a new wishlist item based on the schema
  let newWishlist = new Wishlist({
      destination: req.body.destination, // Matches the "destination" field in your schema
      date: req.body.date,              // Matches the "date" field in your schema
      story: req.body.story,            // Matches the "story" field in your schema
      //image: req.body.image,            // Matches the "image" field in your schema
      status: false                     // Default status as "To-Do" (optional, already defaults to false)
      // Removed user field since you’re not using authentication here
  });

  try {
      await newWishlist.save();  // Save the new wishlist item to the database
      res.redirect('/wishlist'); // Redirect to the wishlist page after saving
  } catch (err) {
      console.error(err);       // Log any errors
      res.redirect('/wishlist'); // Redirect even if there's an error (consider better error handling)
  }
});
// Export router object
module.exports = router;