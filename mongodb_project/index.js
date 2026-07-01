const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = 5000;
// mongoDB connection
mongoose
  .connect("mongodb://localhost:27017/users")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("mongo err", err);
  });
// MongoDB Schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true },
);
const User = mongoose.model("user", userSchema);

app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `<ul>${allDBUsers.map((user) => `<li>${user.firstname}-${user.email}</li>`).join("")}</ul>`;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});

  return res.json(allDBUsers);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }
  const result = await User.create({
    firstname: body.first_name,
    lastname: body.last_name,
    email: body.email,
    gender: body.gender,
  });
  console.log("result", result);
  return res.status(201).json({ message: "Success" });
});
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    //Eidt with id
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    return res.json(user);
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "user not found" });
    return res.json({ status: "success", message: "User deleted" });
  });

app.listen(PORT, () => {
  console.log("Server Start");
});
