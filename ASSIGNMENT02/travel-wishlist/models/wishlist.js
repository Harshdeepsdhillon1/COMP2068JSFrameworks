const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false, // Initially marked as To-Do
  },
  image: {
    type: String, // Store the URL or path of the uploaded image
    required: true, // Set to true if you want the image to be mandatory
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
