const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const clientTime = data.clientTime;
        const serverTime = Date.now();

        const serverDelta = serverTime - clientTime; // how long it took to reach the server

        const clientIp =
          req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        console.log(
          `Request from IP: ${clientIp}, Server Delta: ${serverDelta}ms`
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ serverDelta }));
      } catch (e) {
        res.writeHead(400);
        res.end("Invalid JSON");
      }
    });
  } else {
    res.writeHead(405);
    res.end("Method Not Allowed");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
