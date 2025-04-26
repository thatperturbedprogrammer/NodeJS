const Queue = require("./queue");

const rateLimiterLeakingBucket = (size) => {
  // defining leaking bucket
  const leakingBucket = new Queue(size);
  // console.log(leakingBucket);

  // Leak one request every 5 seconds
  setInterval(() => {
    if (leakingBucket.size() > 0) {
      leakingBucket.dequeue();
      console.log("Leaked 1 token. Current bucket:", leakingBucket);
      console.log("Size after leaking: ", leakingBucket.size());
    }
  }, 5000);
  return (req, res, next) => {
    // rate limiting logic
    console.log("Current leakingbucket: ", leakingBucket);
    if (leakingBucket.size() < size) {
      // adding token in bucket queue when a new request is made
      // leakingBucket.enqueue(1);
      leakingBucket.enqueue({ timestamp: new Date().toLocaleString() }); // adding timestamp of request

      console.log(
        "Added token after request in leakingBucket: ",
        leakingBucket
      );
      console.log("Size is now: ", leakingBucket.size());

      next();
    } else {
      console.log(leakingBucket.size());
      res
        .status(429)
        .json({ error: "Too many requests, Try again in 5 seconds" });
    }
  };
};

module.exports = rateLimiterLeakingBucket;
