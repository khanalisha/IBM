const express = require("express");
const { auth } = require("../middleware/auth");
const {
  accesRoute_forChat,
  fetchAllMessage,
  createGroupChat,
  RenameGroup,
  Remove_from_Group,
  addUser_to_Group,
} = require("../controller/chatController");
const chatRoute = express.Router();

chatRoute.route("/chat").post(auth, accesRoute_forChat);
chatRoute.route("/").get(auth, fetchAllMessage);
chatRoute.route("/group").post(auth, createGroupChat);
chatRoute.route("/rename").put(auth, RenameGroup);
chatRoute.route("/remove").put(auth, Remove_from_Group);
chatRoute.route("/add").put(auth, addUser_to_Group);

module.exports = {
  chatRoute,
};
