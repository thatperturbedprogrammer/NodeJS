const express = require("express");
const cors = require("cors");
const rateLimiterTokenBucket = require("./rate-limiter-token-bucket");
const rateLimiterLeakingBucket = require("./rate-limiter-leaking-bucket");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", rateLimiterTokenBucket, (req, res) => {
  res.send("hello");
});

app.post("/tokenBucket", rateLimiterTokenBucket, (req, res) => {
  const { userInput } = req.body;
  // console.log("User Input: ", req.body);

  res
    .status(200)
    .json({ message: `Input received successfully`, input: userInput });
});

app.post("/leakingBucket", rateLimiterLeakingBucket(10), (req, res) => {
  const { userInput } = req.body;
  // console.log("User Input: ", req.body);

  res
    .status(200)
    .json({ message: `Input received successfully`, input: userInput });
});

app.listen(4002, () => {
  console.log(`Rate Limiter Server running on http://localhost:4002`);
});
