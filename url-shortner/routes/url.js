const express = require("express");
const { handleGenerateNewShortURL, handleRedirection, handleGetAnalytics } = require("../controllers/url");
const router = express.Router();

// POST
router.post("/", handleGenerateNewShortURL);

// GET
router.get("/:shortId", handleRedirection);

// GET analytics
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router; 