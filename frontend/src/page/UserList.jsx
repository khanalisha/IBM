import React from "react";
import { ChatState } from "../context/ChatProvider";

export const UserList = ({name,avater}) => {
  return (
    <div>
      <img src={avater} alt="" />
      <p>{name}</p>

    </div>
  );
};
