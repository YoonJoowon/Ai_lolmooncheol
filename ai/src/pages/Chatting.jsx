import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import Header from "../component/Header";
import ChatAi from "../component/ChatAi";
import ChatInput from "../component/ChatInput";

const Chatting = () => {
  return (
    <Background>
      <Header />
      <ChattingInfo>
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
  background-image: url("https://www.leagueoflegends.co.kr/upload/EditorImages/20180928113244_nhr4NI9U.jpg");
  background-size: cover;
  background-position: center center;
  /* background-repeat: no-repeat; */
  position: absolute;
  width: 100%;
  min-height: 100%;
  display: flex;
  font-family: Arial, sans-serif;
`;

const ChattingInfo = styled.div`
  background-color: #131313;
  border: solid 1px #c89b3c;
  width: 658px;
  min-height: 600px;
  max-height: 100%;
  margin: auto;
  margin-top: 80px;
  border-radius: 20px;
  padding-bottom: 200px;
`;

const ChatTemplete = styled.div`
  border: solid 1px #005a82;
  margin: auto;
  margin-top: 20px;
  width: 570px;
  height: 55px;
  border-radius: 20px;
  background-color: #0a1428;
  color: white;
  padding: 20px;
  line-height: 1.8;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
