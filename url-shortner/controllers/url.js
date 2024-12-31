// const { nanoid } = require("nanoid");
const nanoid = (...args) =>
  import("nanoid").then(({ default: nanoid }) => fetch(...args)); // dynamic import
const URL = require("../models/url");

// Generate URL
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400);

  const shortId = nanoid(8);

  // Create
  await URL.create({
    redirectURL: body.url,
    shortId: shortId,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

// Redirect URL
async function handleRedirection(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
}

// Analytics
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json( { totalClicks: result.visitHistory.length, analytics: result.visitHistory } )
}

module.exports = { handleGenerateNewShortURL, handleRedirection, handleGetAnalytics };
