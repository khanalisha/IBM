import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    setUser(userInformation);
    
  }, []);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
