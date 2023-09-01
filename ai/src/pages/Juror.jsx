import React from "react";
import { styled } from "styled-components";
import Header from "../component/Header";
import JurorPost from "../component/JurorPost";
import background from "../imges/back6.jpg";
import { Link } from "react-router-dom";

const Juror = () => {
  return (
    <Background>
      <Header />
      <ChattingInfo>
        <ChatTemplete>
          <ChatTempleteTxt>
            다른 플레이어들이 겪은 상황과 AI 판결문을 보고 <br />
            <span> 본인이 생각하는 아쉬운 판단을 선택해주세요!</span>
          </ChatTempleteTxt>
          <ChatStartLink to="/Chatting">
            <ChatWithAi>Ai 판결 받아보기</ChatWithAi>
          </ChatStartLink>
        </ChatTemplete>
        <JurorPost />
      </ChattingInfo>
    </Background>
  );
};

export default Juror;
const Background = styled.div`
  background-image: url(${background});
  background-color: rgba(0, 0, 0, 0.7);
  background-size: cover;
  background-position: center center;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  font-family: Arial, sans-serif;
`;

const ChatTemplete = styled.div`
  display: flex;
  max-width: 600px;
  margin: auto;
  margin-top: 20px;

  @media (max-width: 767px) {
    width: 88%;
  }
`;

const ChatTempleteTxt = styled.div`
  border: solid 1px #005a82;
  height: 55px;
  width: 100%;
  border-radius: 20px;
  background-color: #0a1428;
  color: white;
  padding: 20px;
  line-height: 1.8;
  text-align: center;
  justify-content: center;
  align-items: center;

  span {
    color: #c89b3c;
  }

  @media (max-width: 767px) {
    width: 90%;
  }

  @media (max-width: 660px) {
    display: none;
  }
`;

const ChatStartLink = styled(Link)``;

const ChatWithAi = styled.button`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  color: white;
  background-color: #1e1e1e;
  border: solid 1px #c89b3c;
  cursor: pointer;
  margin-left: 10px;
  line-height: 1.6;

  @media (max-width: 660px) {
    height: 40px;
    width: 200px;
    margin: 0px;
  }
`;

const ChattingInfo = styled.div`
  background-color: #131313;
  border: solid 1px #c89b3c;
  width: 658px;
  height: 80%;
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

const JurorPostLayout = styled.div`
  margin: auto;
  width: 600px;
  height: 20%;
  border: solid 1px #005a82;
  border-radius: 20px;
  padding: 20px 10px 20px 10px;
  margin-top: 20px;
`;
