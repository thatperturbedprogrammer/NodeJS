const axios = require("axios");

const webhookUrl = "http://localhost:3000/webhook"; // URL to send webhook to

const fakePayload = {
  event: "user.signup",
  user: {
    id: 123,
    name: "Jane Doe",
    email: "jane@example.com",
  },
  timestamp: new Date(),
};

axios
  .post(webhookUrl, fakePayload)
  .then((res) => {
    console.log("✅ Webhook sent successfully");
    console.log("Response:", res.data);
  })
  .catch((err) => {
    console.error("❌ Error sending webhook:", err.message);
  });
