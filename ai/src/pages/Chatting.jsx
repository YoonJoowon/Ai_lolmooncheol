import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Header from "../component/Header";
import ChatAi from "../component/ChatAi";
import ChatInput from "../component/ChatInput";
import ChattingInfoGage from "../component/ChattingInfoGage";

const Chatting = () => {
  return (
    <Background>
      <Header />
      <ChattingInfo>
        <ChatTemplete>
          질문에 대하여 최대한 자세히 정보를 제공해주세요. <br />
          자세히 설명 할 수록 아래의 판결 정확도 게이지가 올라갑니다!
        </ChatTemplete>
        <ChatAi></ChatAi>

        <ChatInputBox>
          <ChatInput />
          <ChattingInfoGagebox>
            <ChattingInfoGage />
          </ChattingInfoGagebox>
        </ChatInputBox>
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
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  font-family: Arial, sans-serif;
`;

const ChattingInfo = styled.div`
  background-color: #131313;
  border: solid 1px #c89b3c;
  width: 658px;
  height: 65%;
  margin: auto;
  margin-top: 80px;
  border-radius: 20px;
  padding-bottom: 100px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
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

const ChatInputBox = styled.div``;

const ChattingInfoGagebox = styled.div`
  margin: auto;
  margin-top: 80px;
  height: 1px;
  position: absolute;
  bottom: 50px;
  text-align: center;
`;
