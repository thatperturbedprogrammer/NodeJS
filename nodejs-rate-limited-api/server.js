const express = require("express");
const rateLimit = require("express-rate-limit");

const PORT = 4002;
const app = express();

// Set up a rate limiter that allows 5 requests per IP, every 1 minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 5, // limit each IP to 5 requests per windowMs
  message: `Too many requests from this IP, please try again after a minute`,
  header: true, // Send rate limit headers
});

// Apply rate limiting to all routes
app.use(limiter);

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, world! You are not rate-limited yet!");
});

// Another route that demonstrates rate limiting
app.get("/data", (req, res) => {
  res.send("Here is some data, but remember, rate limiting applies!");
});

app.listen(PORT, () => {
  console.log(`Rate Limiting API Server listening on http://localhost:${PORT}`);
});
