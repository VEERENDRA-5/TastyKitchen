const mongoose = require("mongoose");

// Define food item schema
const foodItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  cost: Number,
  foodType: String,
  imageUrl: String,
  rating: Number,
});

// Define restaurant menu schema
const restaurantMenuSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    imageUrl: String,
    cuisine: String,
    costForTwo: Number,
    menuType: String,
    location: String,
    opensAt: String,
    rating: Number,
    reviewsCount: Number,
    itemsCount: Number,
    foodItems: [foodItemSchema],
  },
  { collection: "restaurantsMenu" },
);

// Export model
module.exports = mongoose.model("restaurantsMenu", restaurantMenuSchema);
