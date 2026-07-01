const mongoose = require("mongoose");

// mongoDB connection
async function connectDB(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log("mongo err", err);
    });
}

module.exports  = { connectDB };
