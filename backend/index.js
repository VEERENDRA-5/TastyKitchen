require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Restaurant = require("./models/restaurants");
const Banner = require("./models/banners.js");
const User = require("./models/user.js");
const RestaurantMenu = require("./models/restaurantsMenu.js");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

// Connect to local MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/TastyKitchen")
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));
// Connect to MongoDB (Atlas in production, .env locally)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

//middleware

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // ✅ lowercase
  if (!authHeader)
    return res.status(400).json({ message: "No token provided" });

  try {
    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// testing

app.get("/test", (req, res) => {
  res.send("server is running...");
});

// Specific Restaurant menu Details

app.get("/restaurantsmenu/:id", async (req, res) => {
  try {
    const menu = await RestaurantMenu.findOne({ id: req.params.id });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Restuarants List

app.get("/restaurantsList", async (req, res) => {
  try {
    const order = req.query.sortBy === "lowest" ? 1 : -1;
    // lowest → ascending (1), highest → descending (-1)

    const data = await Restaurant.find().sort({ "userRating.rating": order });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Banner List

app.get("/banners", authMiddleware, async (req, res) => {
  const data = await Banner.find();
  res.json(data);
});

// Users

app.get("/users", async (req, res) => {
  const data = await User.find();
  res.json(data);
});

//Register

app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedpassword,
    });

    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Login

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Port running

// app.listen(5000, "0.0.0.0", () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
