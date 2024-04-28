const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signup", (req, res) => {
  return res.render("Signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const createduser = await User.create({ fullName, email, password });
  if (!createduser) {
    return res
      .redirect("Signup")
      .status(404)
      .json({ message: "cannot created account" });
  }

  return res.redirect("/");
});

router.get("/login", (req, res) => {
  return res.render("Login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const finduser = User.findOne(email, password);

  if (!finduser) {
    res.render("Signup");
  }

  return res.send("You are logged in")
});

module.exports = router;
