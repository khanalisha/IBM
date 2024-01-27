import React, { useState } from "react";
import { SideBar } from "./SideBar";
import { Groupchatroom } from "./Groupchatroom";
import { Directory } from "./Directory";
import { UserMesg } from "./UserMesg";

export const Chat = () => {
  const [selected, setSelected] = useState();
  return (
    <div className="flex ">
      <SideBar className="side-bar-component " setSelected={setSelected} />
      <UserMesg  className="user-container" />
      <Groupchatroom />
      <Directory />
    </div>
  );
};
// // "react-router-dom": "^6.21.3",