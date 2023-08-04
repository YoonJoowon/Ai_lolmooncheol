import React, { useState } from "react";
import { styled } from "styled-components";
import Header from "../component/Header";
import ChatAi from "../component/ChatAi";
import ChatInput from "../component/ChatInput";

const Chatting = () => {
  return (
    <Background>
      <Header />
      <ChattingInfo>
        {/* <ConfrontationPicture></ConfrontationPicture> */}
        <ChatTemplete>
          질문에 대하여 최대한 자세하게 설명 해주시면 판결 정확도가 올라갑니다!
        </ChatTemplete>
        <ChatAi></ChatAi>
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
  font-family: Arial, sans-serif;
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
  width: 570px;
  height: 55px;
  border-radius: 20px;
  background-color: #3f3f3f;
  color: white;
  padding: 20px;
  line-height: 1.8;
`;
