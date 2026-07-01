const express = require("express");
const userRouter = require("./routes/user");
const { connectDB } = require("./connection.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = 5000;
//connection
connectDB("mongodb://localhost:27017/users");
//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("Server Start");
});
