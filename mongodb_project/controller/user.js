const User = require("../model/user.js");
async function handleCreateNewUser(req, res) {
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
  return res.status(201).json({ message: "Success", id: result._id });
}
async function handlegetAllUser(req, res) {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}
async function handlegetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "user not found" });
  return res.json(user);
}
async function handleUpdateUserById(req, res) {
  //Eidt with id
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });
  return res.json(user);
}
async function handleDeleteUserById(req, res) {
  //delete with id
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "user not found" });
  return res.json({ status: "success", message: "User deleted" });
}
module.exports = {
  handleCreateNewUser,
  handlegetAllUser,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
