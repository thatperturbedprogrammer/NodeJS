const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(URI);
    console.log("DB connection succeeded");
  } catch (error) {
    console.log("DB connection failed", error);
  }
}

module.exports = connectDB;
