const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.Mongoose;
const connection = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  connection,
};
