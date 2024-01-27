require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

const auth = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.secretkey);
      console.log(decoded,"deco")

      req.users= await UserModel.findById(decoded.userId).select(
        "-password"
      );
      console.log(req.users, "ab");

      next();
    } catch (error) {
    
    }
  }

 
};

module.exports = {
  auth,
};
