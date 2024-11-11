const shortid = require("shortid");
const URL = require("../models/url.model");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

module.exports = { handleGenerateNewShortURL };
