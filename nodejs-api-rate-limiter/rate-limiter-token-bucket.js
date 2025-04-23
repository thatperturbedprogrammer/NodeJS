const tokenBucket = [1, 1, 1, 1];
// let intervalStarted = false; // setInterval flag

function rateLimiterTokenBucket(req, res, next) {
  // rate limiting logic
  console.log("initial tokenbucket: ", tokenBucket);
  if (tokenBucket.length > 0) {
    tokenBucket.pop();
    console.log("after request tokenbucket: ", tokenBucket);
    console.log("Size is now: ", tokenBucket.length);

    next();
  } else {
    res.status(429).json({ error: "Too many requests" });
    // filling after 10 seconds
    setTimeout(() => {
      if (tokenBucket.length < 4) {
        tokenBucket.push(1);
        tokenBucket.push(1);
        tokenBucket.push(1);
        tokenBucket.push(1);
        console.log("After filling: ", tokenBucket);
      }
    }, 10000);

    // console.log("Done filling set interval");
    return;
  }
}

module.exports = rateLimiterTokenBucket;
