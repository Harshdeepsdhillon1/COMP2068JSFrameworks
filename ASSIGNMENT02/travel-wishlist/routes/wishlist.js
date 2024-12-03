const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist'); // Import Wishlist model

// Display all destinations (Read)
router.get('/wishlist', async (req, res) => {
  try {
    // Fetch all wishlist items for the logged-in user
    const wishlist = await Wishlist.find({ user: req.user._id }); // Assuming user authentication
    res.render('wishlist', { wishlist, title: 'My Travel Wishlist' });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Add a new destination (Create)
router.post('/wishlist/add', async (req, res) => {
  const { destination, date, story, image } = req.body;
  const newWishlistItem = new Wishlist({
    destination,
    date,
    story,
    image,
    user: req.user._id, // Add the logged-in user
  });

  try {
    await newWishlistItem.save();
    res.redirect('/wishlist');
  } catch (err) {
    console.error(err);
    res.redirect('/wishlist');
  }
});

// Update the To-Do status (Update)
router.post('/wishlist/edit/:id', async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findById(req.params.id);
    if (wishlistItem.user.equals(req.user._id)) { // Ensure only owner can update
      wishlistItem.status = !wishlistItem.status;
      await wishlistItem.save();
    }
    res.redirect('/wishlist');
  } catch (err) {
    console.error(err);
    res.redirect('/wishlist');
  }
});

// Delete a destination (Delete)
router.post('/wishlist/delete/:id', async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findById(req.params.id);
    if (wishlistItem.user.equals(req.user._id)) { // Ensure only owner can delete
      await Wishlist.deleteOne({ _id: req.params.id });
    }
    res.redirect('/wishlist');
  } catch (err) {
    console.error(err);
    res.redirect('/wishlist');
  }
});

module.exports = router;
