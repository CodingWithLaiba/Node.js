const { nanoid } = require("nanoid");
const URL = require("../models/url.js");

async function handleGenerateVewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = nanoid(8);
  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy:req.user._id,
  });
  const allUrls = await URL.find({});

  return res.render("home", {
    id: shortID,
    urls: allUrls,
  });
}
async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
async function handleRedirect(req, res) {
  const shortID = req.params.shortID;

  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateVewShortURL,
  handleGetAnalytics,
  handleRedirect,
};
