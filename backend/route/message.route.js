const express = require("express");
const { auth } = require("../middleware/auth");
const {
  allMessages,
  sendMessage,
} = require("../controller/messageDataController");

const messageRouter = express.Router();

messageRouter.route("/:chatId").get(auth, allMessages);
messageRouter.route("/chatstart").post(auth, sendMessage);

module.exports = { messageRouter };
