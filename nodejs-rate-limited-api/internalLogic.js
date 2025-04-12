const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");

// Simple in-memory store (for demonstration purposes)
const store = {};

// Rate limiter middleware
const limiter = (req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 5;

  // Initialize the store for this IP if not already initialized
  if (!store[ip]) {
    store[ip] = { count: 0, lastRequestTime: currentTime };
  }

  const timeDifference = currentTime - store[ip].lastRequestTime;

  // If the time window has expired, reset the counter
  if (timeDifference > windowMs) {
    store[ip].count = 0;
    store[ip].lastRequestTime = currentTime;
  }

  // Check if the limit is reached
  if (store[ip].count >= maxRequests) {
    res.status(429).send("Too many requests, please try again later.");
    return;
  }

  // Otherwise, allow the request and increment the count
  store[ip].count++;
  next();
};

// Apply rate limiting to all routes
app.use(limiter);

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(4001, () => {
  console.log("Server running on http://localhost:4001");
});
