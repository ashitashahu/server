const express = require("express");
const {} = require("./connection");
const bodyParser = require("body-parser");
const URL = require("./models/url.model");
const urlRouter = require("./routes/url.routes");
const connectMongoDB = require("./connection");
const app = express();
const port = 8001;

connectMongoDB("mongodb://127.0.0.1:27017/url-shortener").then(() =>
  console.log("Mongo DB Connected")
);

app.use(express.json()); 
app.use(bodyParser.json());

app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
