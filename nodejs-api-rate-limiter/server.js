const express = require("express");
const cors = require("cors");
const rateLimiterTokenBucket = require("./rate-limiter-token-bucket");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", rateLimiterTokenBucket, (req, res) => {
  res.send("hello");
});

app.listen(4002, () => {
  console.log(`Rate Limiter Server running on http://localhost:4002`);
});
