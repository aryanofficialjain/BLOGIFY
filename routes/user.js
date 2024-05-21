const { Router } = require("express");
const User = require("../models/user");
const {
  checkForAuthenticationCookie,
} = require("../middlewares/authentication");

const router = Router();

router.get("/signup", (req, res) => {
  return res.render("Signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const createduser = await User.create({ fullName, email, password });
    if (!createduser) {
      return res
        .redirect("Signup")
        .status(404)
        .json({ message: "cannot created account" });
    }

    return res.redirect("/user/login");
  } catch (error) {
    console.log(Error, error);
    res.render("Signup", {
      error: "cannot created your account",
    });
  }
});

router.get("/login", (req, res) => {
  return res.render("Login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // const finduser = User.findOne(email, password);
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    console.log("Token", token);

    if (!token) {
      res.render("Login");
    }

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log(Error, error);
    res.render("Login", {
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});




module.exports = router;
