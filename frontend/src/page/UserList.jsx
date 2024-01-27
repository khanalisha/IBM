import React from "react";
import { ChatState } from "../context/ChatProvider";

export const UserList = () => {
  const { user } = ChatState();
  console.log(user);
  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
};
