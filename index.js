const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser")
const methodOverride = require('method-override');

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

app.use(express.static(path.resolve("./public")));

const Blog = require("./models/blog");
const User = require("./models/user");

const blogRoute = require("./routes/blog");

const PORT = 8000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
mongoose
  .connect(
    "mongodb+srv://7985447692:7985447692@cluster0.ufxdpfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/blogify"
  )
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
