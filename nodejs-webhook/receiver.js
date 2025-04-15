const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Parse JSON body
app.use(express.json());

// Webhook endpoint
app.post("/webhook", (req, res) => {
  const data = req.body;
  console.log("📩 Webhook received:", data);

  // Action: Append the data to a log file
  const logEntry = `Received at ${new Date().toISOString()}:\n${JSON.stringify(
    data,
    null,
    2
  )}\n\n`;

  fs.appendFile("webhook-log.txt", logEntry, (err) => {
    if (err) {
      console.error("❌ Error writing to file:", err);
      return res.status(500).send("Failed to process webhook");
    }
    console.log("✅ Action triggered: Data logged");
    res.status(200).send("Webhook received and processed");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Webhook Receiver running on http://localhost:${PORT}`);
});
