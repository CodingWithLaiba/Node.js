const express = require("express");
const path = require("path");
const { connectMongoDB } = require("./connect.js");
const staticRoute = require('./routes/staticRouter.js')
const urlRoute = require("./routes/url.js");
const URL = require("./models/url.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
const PORT = 8000;
connectMongoDB("mongodb://localhost:27017/short-url");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", { urls: allUrls });
// });
app.use("/url", urlRoute);
app.use("/", staticRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port`, PORT);
});
