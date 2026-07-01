const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/users", (req, res) => {
  const html = `<ul>${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //Eidt with id
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = { ...users[userIndex], ...body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
      return res.json({ status: "success", updatedUser: users[userIndex] });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex,1)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
      return res.json({ status: "success", message: "User deleted" });
    });
  });

app.listen(PORT, () => console.log("Server Start"));
