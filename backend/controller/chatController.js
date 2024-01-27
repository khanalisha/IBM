const Chat = require("../model/chat.model");
const { UserModel } = require("../model/user.model");

const accesRoute_forChat = async (req, res) => {
  const { userId } = req.body;
  console.log(userId, "a");
  if (!userId) {
    console.log("userId param not sent with req");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.users._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.users._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat.id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};
const fetchAllMessage = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.users._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (resultent) => {
        resultent = await UserModel.populate(resultent, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(resultent);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "please fill all field" });
  }
  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    res.status(400).send("More then two user required for group chat.");
  }
  users.push(req.users);
  console.log(users, "admin");
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.users,
    });
    console.log(groupChat, "groupchat....");
    const FullGroupChat = await Chat.findOne({ _id: groupChat.id })
      // console.log(FullGroupChat,"group..")

      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(FullGroupChat);
  } catch (error) {
    throw new Error(error.message);
  }
};

const RenameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  console.log(chatId, chatName, "groupname");

  const updatedChatName = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChatName) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChatName);
  }
};

const Remove_from_Group = async (req, res) => {
  const { chatId, userId } = req.body;
  console.log(chatId, userId, "remove");

  // check if the requestesting person is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found in group");
  } else {
    res.json(removed);
  }
};

const addUser_to_Group = async (req, res) => {
  const { chatId, userId } = req.body;
  console.log(chatId, userId, "add");
  // check if the requestesting person is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found in group");
  } else {
    res.json(added);
  }
};

module.exports = {
  accesRoute_forChat,
  fetchAllMessage,
  createGroupChat,
  RenameGroup,
  Remove_from_Group,
  addUser_to_Group,
};
