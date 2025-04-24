const Queue = require("./queue");
// console.log(Queue);

const leakingBucket = new Queue(4);
// console.log(leakingBucket);

// Leak one request every 5 seconds
setInterval(() => {
  if (leakingBucket.size() > 0) {
    leakingBucket.dequeue();
    console.log("Leaked 1 token. Current bucket:", leakingBucket);
  }
}, 5000);

function rateLimiterLeakingBucket(req, res, next) {
  // rate limiting logic
  console.log("Current leakingbucket: ", leakingBucket);
  if (leakingBucket.size() < 4) {
    // adding token in bucket queue when a new request is made
    leakingBucket.enqueue(1);
    console.log("Added token after request in leakkingBucket: ", leakingBucket);
    console.log("Size is now: ", leakingBucket.size());

    next();
  } else {
    console.log(leakingBucket.size());
    res
      .status(429)
      .json({ error: "Too many requests, Try again in 5 seconds" });
  }
}

module.exports = rateLimiterLeakingBucket;
