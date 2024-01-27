import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignUp } from "../component/SignUp";
import { Chat } from "../page/Chat";
import { Login } from "../component/Login";
export const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};
