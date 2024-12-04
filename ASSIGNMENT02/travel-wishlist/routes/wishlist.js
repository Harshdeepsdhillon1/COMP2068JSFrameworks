// Naming convention > controllers/routers are plural
// Import express and create router object
const express = require("express");
const router = express.Router();
// Import mongoose model to be used
const Wishlist = require("../models/wishlistModel");
const mongoose = require('mongoose');
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

// GET /wishlist/edit/:id - Display edit form
router.get('/edit/:id', async (req, res, next) => {
  try {
    // Find the wishlist item by ID
    const wishlistItem = await Wishlist.findById(req.params.id);
    if (!wishlistItem) {
      return res.redirect('/wishlist'); // Redirect if item not found
    }

    // Render edit page with the wishlist item data
    res.render('wishlist/edit', {
      title: 'Edit Destination',
      wishlist: wishlistItem,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/wishlist'); // Redirect on error
  }
});

// POST /wishlist/edit/:id - Handle form submission to update the wishlist item
router.post('/edit/:id', async (req, res, next) => {
  try {
    // Find the wishlist item by ID and update with form data
    const wishlistItem = await Wishlist.findById(req.params.id);
    if (!wishlistItem) {
      return res.redirect('/wishlist'); // Redirect if item not found
    }

    // Update the fields with new values
    wishlistItem.destination = req.body.destination;
    wishlistItem.date = req.body.date;
    wishlistItem.story = req.body.story;

    // Save the updated item
    await wishlistItem.save();

    // Redirect to wishlist page after saving
    res.redirect('/wishlist');
  } catch (err) {
    console.error(err);
    res.redirect('/wishlist'); // Redirect on error
  }
});
// GET /wishlist/delete/:id
// access parameters via req.params object
router.get("/delete/:_id", async (req, res, next) => {
  let wishlistId = req.params._id;
  await Project.findByIdAndRemove({ _id: wishlistId });
  res.redirect("/wishlist");
});

// Export router object
module.exports = router;