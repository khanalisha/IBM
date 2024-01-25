const mongoose = require("mongoose");
const ChatSchema = mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        time: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = {
  Chat,
};
