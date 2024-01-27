require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { UserModel } = require("../model/user.model");
const upload = require("../middleware/upload");
const { auth } = require("../middleware/auth");
// const { cloudinary } = require("../middleware/cloudinary");

const userRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

userRouter.post("/api/register", upload.single("avatar"), async (req, res) => {
  const { name, email, password } = req.body;
  let avatarUrl;
  if (req.file) {
    try {
      let result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url;
      console.log(secure_ur);
      console.log(avatarUrl, "url");
    } catch (error) {
      console.error("Error uploading avatar to Cloudinary:", error);
      return res.status(500).json({ error: "Failed to upload avatar" });
    }
  }

  //
  try {
    const existinguser = await UserModel.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ msg: "use another mail this is already there!" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const users = new UserModel({
          name,
          avatar: avatarUrl,
          email,
          password: hash,
        });

        await users.save();

        res.status(201).json({ msg: "you are now registerd!", users });
      });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

userRouter.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await UserModel.findOne({ email });
    bcrypt.compare(password, existinguser.password, (error, result) => {
      if (result) {
        const token = jwt.sign(
          { userId: existinguser._id },
          process.env.secretkey
        );
        res
          .status(201)
          .json({ mag: "Login Sucess!", token: token, existinguser });
      } else {
        res.status(401).json({ error: error });
      }
    });
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

userRouter.get("/api/user", async (req, res) => {
  const value = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // console.log(value)
  const users = await UserModel.find(value);
  res.send(users);
});

module.exports = {
  userRouter,
};
