const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./route/user.route");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/images", express.static("images")); //https:lcoalhost:8080/images/12341341234/png

app.use(userRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connect now");
    console.log(`server is running port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
