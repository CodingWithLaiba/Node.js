const express = require("express");
const {
  handlegetAllUser,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controller/user.js");

const router = express.Router();

// router.get("/users", async (req, res) => {
//   const allDBUsers = await User.find({});
//   const html = `<ul>${allDBUsers.map((user) => `<li>${user.firstname}-${user.email}</li>`).join("")}</ul>`;
//   res.send(html);
// });

router.route("/").get(handlegetAllUser).post(handleCreateNewUser);
router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
