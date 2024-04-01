import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import landingImgBackImg from "../imges/landingBackground.jpg";
import back2 from "../imges/back2.jpg";

const Landing = () => {
  return (
    <Background>
      <BackgroundColor>
        <LandingExplainBox>
          <LandingTitle>AI 롤문철</LandingTitle>
          <LandingSubTitle>
            데이터 기반 롤 AI가 게임 상황을 분석하고 <br />
            옳은 판단을 내려줍니다.
          </LandingSubTitle>
          <LandingExplain>
            게임 전적을 분석하여 플레이어의 판단을 평가하고 <br />
            전략적 타당한 선택지를 제안하는 <span>채팅형 인공지능 서비스</span>
            입니다. <br />
            즉각적인 상황을 분석 하여 이로부터 유도되는 <br />
            <span>전략적 타당한 선택의 판단</span>을 도와줍니다.
          </LandingExplain>
          <ChatStartLink to="/Chatting">
            <ChatStartBtn>시작하기</ChatStartBtn>
          </ChatStartLink>
        </LandingExplainBox>
        <LandingImageBox>
          <LandingImage1 />
          <LandingImage2 />
          <LandingImageInfoTxt>
            {/* ※실제 서비스 사용 예시입니다. */}
          </LandingImageInfoTxt>
        </LandingImageBox>
      </BackgroundColor>
    </Background>
  );
};

export default Landing;

const Background = styled.div`
  background-color: #ffffff;
  background-size: cover;
  background-position: center center;
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BackgroundColor = styled.div`
  background-color: #e5f1ff;
  background-size: cover;
  background-position: center center;
  position: absolute;
  width: 100%;
  height: 90%;
  font-family: Arial, sans-serif;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const LandingExplainBox = styled.div`
  color: #000000;
  justify-content: center;
  align-items: center;
  margin-right: 200px;
  margin-left: 200px;

  @media (max-width: 610px) {
    text-align: center;
    margin: auto;
  }
`;

const LandingTitle = styled.p`
  font-weight: bold;
  font-size: 32px;
  line-height: 16px;
  margin-bottom: 32px;
  font-family: "Noto Sans KR", sans-serif;
`;

const LandingSubTitle = styled.p`
  font-weight: bold;
  line-height: 1.6;
  font-size: 24px;
  margin-bottom: 32px;
  font-family: "Noto Sans KR", sans-serif;
`;

const LandingExplain = styled.div`
  color: #000000;
  line-height: 2;
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 450;
  letter-spacing: 2px;

  span {
    font-size: 20px;
    color: #3054c2;
  }
`;

const ChatStartBtn = styled.button`
  color: white;
  background-color: #3054c2;
  text-decoration: none;
  width: 200px;
  padding: 10px 30px 10px 30px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  box-shadow: 4px 4px 8px rgba(38, 69, 223, 0.786);
`;

const ChatStartLink = styled(Link)``;

const LandingImageBox = styled.div`
  width: 800px;
  height: 550px;
  position: relative;
  margin-right: 200px;

  @media (max-width: 610px) {
    display: none;
  }
`;

const LandingImage1 = styled.div`
  color: white;
  background-image: url(${landingImgBackImg});
  background-size: cover;
  background-position: center center;
  width: 600px;
  height: 400px;
  border-radius: 20px;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.8);

  @media (max-width: 1070px) {
    width: 400px;
  }

  @media (max-width: 850px) {
    width: 200px;
    background-size: 400% auto;
  }
`;

const LandingImage2 = styled.div`
  color: white;
  background-image: url(${back2});
  background-size: 100% auto;
  background-position: center center;
  width: 600px;
  height: 400px;
  border-radius: 20px;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 80px;
  right: 100px;

  @media (max-width: 1070px) {
    width: 400px;
  }

  @media (max-width: 850px) {
    width: 200px;
    height: 400px;
    background-size: 400% auto;
  }
`;

const LandingImageInfoTxt = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  color: rgba(38, 69, 223, 0.786);
  position: absolute;
  bottom: 40px;
  right: 100px;
`;
