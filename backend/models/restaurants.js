const mongoose = require("mongoose");

// Sub-schema for userRating
const userRatingSchema = new mongoose.Schema({
  rating: Number,
  ratingColor: String,
  ratingText: String,
  totalReviews: Number,
});

// Main restaurant schema
const restaurantSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    imageUrl: String,
    cuisine: String,
    costForTwo: Number,
    menuType: String,
    location: String,
    opensAt: String,
    hasOnlineDelivery: Boolean,
    hasTableBooking: Boolean,
    isDeliveringNow: Boolean,
    userRating: userRatingSchema,
  },
  { collection: "restaurantsList" },
);

// Export model
module.exports = mongoose.model("restaurantsList", restaurantSchema);
