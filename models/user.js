const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { createTokenForUser } = require("../service/authentication");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    profileImage: {
      type: String,
      default: "/public/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedpassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedpassword;

  next();


});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({email});
  if(!user) throw new Error('User not found');

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = createHmac("sha256", salt)
  .update(password)
  .digest("hex");

  if(hashedPassword !== userProvidedHash) throw new Error('incorrect password');

  // return hashedPassword === userProvidedHash 
  // return {...user};

  const token = createTokenForUser(user)
  return token;

          
});

const User = mongoose.model("user", userSchema);

module.exports = User;
