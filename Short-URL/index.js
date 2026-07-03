const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connect.js");
const {restrictToLoggedinUserOnly,checkAuth} = require("./middleware/auth.js")
//Routes
const staticRoute = require("./routes/staticRouter.js");
const urlRoute = require("./routes/url.js");
const userRoute = require("./routes/user.js");

//models
const URL = require("./models/url.js");

const app = express();
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = 8000;
connectMongoDB("mongodb://localhost:27017/short-url");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", { urls: allUrls });
// });
app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/", checkAuth,staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port`, PORT);
});
