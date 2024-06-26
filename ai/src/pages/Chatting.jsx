import React, { useEffect } from "react";
import { styled } from "styled-components";
import Header from "../component/Header";
import ChatAi from "../component/ChatAi";
import ChatInput from "../component/ChatInput";
import ChattingInfoGage from "../component/ChattingInfoGage";
import SearchInput from "../component/SearchInput";
import back5 from "../imges/back5.jpg";

const Chatting = () => {
  return (
    <Background>
      <Header />
      <ChattingInfo>
        <ChatTemplete>
          <ChatTempleteTxt>
            자세히 설명을 제공 할 수록, <span>최하단의 판결 정확도 게이지</span>
            가 증가합니다! <br /> 판결문과 상황 정보를 토대로 투표 진행이
            예정되어 있습니다.
          </ChatTempleteTxt>
        </ChatTemplete>
        <ChatAi />
        <SearchInput />
        <ChatInput />
        <ChattingInfoGagebox>
          <ChattingInfoGage />
        </ChattingInfoGagebox>
      </ChattingInfo>
    </Background>
  );
};

export default Chatting;

const Background = styled.div`
  background-color: black;
  background-image: url(${back5});
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

  @media (max-width: 660px) {
    margin-top: 60px;
    height: 70%;
  }

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
  max-width: 570px;
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

  @media (max-width: 767px) {
    width: 88%;
  }

  @media (max-width: 467px) {
    height: 80px;
  }
`;

const ChatTempleteTxt = styled.span`
  span {
    color: #c89b3c;
  }

  @media (max-width: 767px) {
    width: 90%;
  }
`;

const ChattingInfoGagebox = styled.div`
  margin: auto;
  margin-top: 80px;
  height: 1px;
  position: absolute;
  bottom: 50px;
  text-align: center;
`;
