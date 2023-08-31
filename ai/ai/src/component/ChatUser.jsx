import React, { useState } from "react";
import { styled } from "styled-components";

const ChatUser = () => {
  return <ChatUserStyle></ChatUserStyle>;
};

export default ChatUser;

const ChatUserStyle = styled.div`
  border: solid 1px #424242;
  
  margin-left: 333px;
  margin-top: 20px;
  width: 300px;
  min-height: 50px;
  border-radius: 20px;
  background-color: #60394f;
  color: white;
`;
