const express = require("express");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.text());

app.use(cors());

app.post("/sendrequest", (req, res) => {
  const bodyData = req.body;
  console.log(req.body);

  // Time taken logic

  const timeWhenReqSent = req.body.timeWhenReqSent;

  const timeWhenResSent = Date.now();

  console.log("Req time: ", timeWhenReqSent);
  console.log("Res time: ", timeWhenResSent);

  const difference = timeWhenResSent - timeWhenReqSent;

  console.log("Diff time: ", difference);

  res
    .status(200)
    .json({ message: "Success", timeDifference: `${difference} milliseconds` });
});

const PORT = 4008;
app.listen(PORT, () => {
  console.log(`API Request Speed Server running on http://localhost:${PORT}`);
});
