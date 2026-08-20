const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  id: String,
  imageUrl: String,
});

module.exports = mongoose.model("Banner", bannerSchema);
