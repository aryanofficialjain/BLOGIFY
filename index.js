require('dotenv').config(); 

const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser")

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

app.use(express.static(path.resolve("./public")));

const Blog = require("./models/blog");
const User = require("./models/user");

const blogRoute = require("./routes/blog");

const PORT = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGODB_URL)
  .then((e) => console.log("MongoDB Connected Succesfully"))
  .catch((err) => console.log("Error while connectong mongoDB", err));


app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(bodyParser.json()); // Parse JSON bodies // Middleware to parse form data

app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/profile", profileRoute);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("Home", {
    user: req.user,
    blog: allBlogs,
  });
  // console.log(allBlogs);
});

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
