import React, { useState } from "react";
import { styled } from "styled-components";

const ChatAi = () => {
  return <ChatAiStyle></ChatAiStyle>;
};

export default ChatAi;

const ChatAiStyle = styled.div`
  border: solid 1px #424242;
  margin-left: 23px;
  margin-top: 20px;
  width: 300px;
  min-height: 50px;
  border-radius: 20px;
  background-color: #3f3f3f;
`;
