import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import Logo from "../component/Logo";
import Header from "../component/Header";
import ChatAi from "../component/ChatAi";
import ChatInput from "../component/ChatInput";
import ChatUser from "../component/ChatUser";

const Chatting = () => {
  
  return (
    <Background>
      <Header />
      <ChattingInfo>
        <ConfrontationPicture></ConfrontationPicture>

        <ChatTemplete></ChatTemplete>

        <ChatAi></ChatAi>
        <ChatUser></ChatUser>

        <ChatInput></ChatInput>
      </ChattingInfo>
    </Background>
  );
};

export default Chatting;

const Background = styled.div`
  background-color: black;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ChattingInfo = styled.div`
  background-color: #1e1e1e;
  border: solid 1px #424242;
  width: 658px;
  min-height: 800px;
  margin: auto;
  margin-top: 80px;
  border-radius: 20px;
`;

const ConfrontationPicture = styled.div`
  border: solid 1px #424242;
  margin: auto;
  margin-top: 20px;
  width: 610px;
  height: 105px;
  border-radius: 20px;
  background-color: #3f3f3f;
`;

const ChatTemplete = styled.div`
  border: solid 1px #424242;
  margin: auto;
  margin-top: 20px;
  width: 610px;
  height: 105px;
  border-radius: 20px;
  background-color: #3f3f3f;
`;
