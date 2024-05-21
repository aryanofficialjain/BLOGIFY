const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId)
    const user = await User.findById(userId);

    if (!user) {
      return res.render("Login");
    }

    res.render("Profile", {
      user: req.user,
    });
  } catch (error) {
    console.log("Error", error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id);

    res.render("Update", {
    user,
  });
});


module.exports = router;
