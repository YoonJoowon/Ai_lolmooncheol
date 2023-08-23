import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import landingImgBackImg from "../imges/landingBackground.jpg";
import backImgRealUse from "../imges/example3.png";

const Landing = () => {
  return (
    <Background>
      <BackgroundColor>
        <LandingExplainBox>
          <LandingTitle>AI 롤문철은</LandingTitle>
          <LandingExplain>
            게임 전적의 데이터를 통해 <span>즉각적인 상황을 분석</span>
            하여
            <br />
            플레이어의 판단을 평가하고
            <br />
            이로부터 유도되는 <span>전략적 타당한 선택을 판단</span>하는
            <br />
            채팅형 기반의 인공 지능 서비스입니다.
          </LandingExplain>
          <ChatStartLink to="/Chatting">
            <ChatStartBtn>시작하기</ChatStartBtn>
          </ChatStartLink>
        </LandingExplainBox>
        <LandingImageBox>
          <LandingImage1></LandingImage1>
          <LandingImage2></LandingImage2>
          <LandingImageInfoTxt>
            ※실제 서비스 사용 예시입니다.
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
  /* background-image: url(${landingImgBackImg}); */
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
`;

const LandingTitle = styled.p`
  font-weight: bold;
  font-size: 32px;
  line-height: 16px;
  margin-bottom: 32px;
  font-family: "Noto Sans KR", sans-serif;
`;

const LandingExplain = styled.div`
  color: #000000;
  line-height: 2.4;
  font-size: 18px;
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
`;

const LandingImage2 = styled.div`
  color: white;
  background-image: url(${backImgRealUse});
  background-size: 210% auto;
  background-position: center center;
  width: 600px;
  height: 400px;
  border-radius: 20px;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 80px;
  right: 100px;
`;

const LandingImageInfoTxt = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  color: rgba(38, 69, 223, 0.786);
  position: absolute;
  bottom: 40px;
  right: 100px;
`;
