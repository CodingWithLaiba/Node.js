const express = require("express");

const {
  handleGenerateVewShortURL,
  handleGetAnalytics,
  handleRedirect,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateVewShortURL);

router.get("/analytics/:shortID", handleGetAnalytics);

router.get("/:shortID", handleRedirect);

module.exports = router;