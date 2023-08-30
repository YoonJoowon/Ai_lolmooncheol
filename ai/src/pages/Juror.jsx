import React from "react";
import { styled } from "styled-components";
import Header from "../component/Header";
import JurorPost from "../component/JurorPost";
import background from "../imges/back6.jpg";

const Juror = () => {
  return (
    <Background>
      <Header></Header>
      <ChattingInfo>
        <ChatTemplete>
          <ChatTempleteTxt>
            다른 플레이어들이 겪은 상황과 AI 판결문을 보고 <br />
            <span> 본인이 생각하는 옳바른 판단을 선택해주세요!</span>
          </ChatTempleteTxt>
        </ChatTemplete>
        <JurorPost />
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
