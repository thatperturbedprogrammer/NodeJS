const axios = require("axios");

function randomIp() {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join(".");
}

// 10000 requests
for (let i = 1; i <= 10000; i++) {
  const clientTime = Date.now();

  axios
    .post(
      "http://localhost:3000",
      { clientTime },
      {
        headers: {
          "X-Forwarded-For": randomIp(),
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      const roundTrip = Date.now() - clientTime;
      console.log(
        `Response no: ${i}\nClient RTT: ${roundTrip}ms, Server Delta: ${res.data.serverDelta}ms`
      );
    })
    .catch(console.error);
}
