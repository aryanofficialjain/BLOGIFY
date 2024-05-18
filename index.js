const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const PORT = 8000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://7985447692:7985447692@cluster0.ufxdpfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/blogify"
  )
  .then((e) => console.log("MongoDB Connected Succesfully"))
  .catch((err) => console.log("Error while connectong mongoDB", err));

app.use("/user", userRoute);
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  res.render("Home", {
    user: req.user,
  });
  console.log(req.user);
});

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
