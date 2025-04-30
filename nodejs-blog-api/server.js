const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const User = require("./models/User");
const Post = require("./models/Post");
const connectDB = require("./config/db");

// Connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// routes
const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
