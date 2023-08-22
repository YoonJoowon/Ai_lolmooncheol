import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { showCheckAnswerState } from "../store/Recoil";
import { Modal } from "./Modal";

function AiAnswer(props) {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  //chatGPT
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const formattedMessage = responseMessage.replace(/\\n/g, "\n");
  const api_key = process.env.REACT_APP_OPENAI_API_KEY;

  const showCheckAnswerRecoil = useRecoilValue(showCheckAnswerState);

  const storedKeywords = JSON.parse(sessionStorage.getItem("inputValues"));
  const filteredString = (storedKeywords || [])
    .map((item) => String(item))
    .join(" ");

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  // 새로고침
  const reFresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (showCheckAnswerRecoil) {
      handleSubmit();
    }
  }, [showCheckAnswerRecoil]);

  const handleSubmit = () => {
    setIsLoading(true);
    const messages = [
      {
        role: "system", // 행동지정, 역할부여
        content:
          "당신의 작업은 롤 게임 관련해서 옳은 판단을 말해주는 것입니다. 두 가지 선택지가 주어지면 중립적인 문구없이 한 선택지를 선택하여 이유와 함께 답해주세요. 이전 내용과 똑같은 형식으로 답을 말해야하고, 당시 상황 지표분석을 토대로 결론을 말해주세요. "+
          "(첫 번째 제드는 5킬 1데스 14어시스트,  3800gold, 레벨은 11 그리고 두 번째 아무무는 1킬 6데스 2어시스트, 2000gold 레벨은 9) 내용도 함께 분석해주세요." +
          "다음 형식을 사용합니다:" +
        
          "안녕하세요! 주어진 상황에서 판경을 시작해볼게요! \n\n" +
        
          "A의 당시 상황 지표분석:\n" +
          "킬/데스/어시스트: a/b/c\n" +
          "골드: d\n" +
          "레벨: e\n\n" +

          "B의 당시 상황 지표분석:\n" +
          "킬/데스/어시스트: h/i/j\n" +
          "골드: k\n" +
          "레벨: l\n\n" +
          "상황: ```\n\n" +
          
          "A의 주장:\n" +
          "```\n\n" +
          "B의 주장:\n" +
          "```\n\n" +
          "결론:\n" +
          "```",
      },
      {
        role: "assistant", // 이전 대화 기억
        content:         
          "안녕하세요! 주어진 상황에서 판결을 시작해볼게요! \n\n" +
         
          "A의 당시 상황 지표분석:\n" +
          "킬/데스/어시스트: a/b/c\n" +
          "골드: d\n" +
          "레벨: e\n\n" +
         
          "B의 당시 상황 지표분석:\n" +
          "킬/데스/어시스트: h/i/j\n" +
          "골드: k\n" +
          "레벨: l\n\n" +
          "상황: ```\n\n" +
         
          "A의 주장:\n" +
          "```\n\n" +
          "B의 주장:\n" +
          "```\n\n" +
          "결론:\n" +
          "```",
      },
      {
        role: "user",
        content: filteredString + "둘 중 누구의 판단이 맞습니까?",
      },
    ];

    const data = {
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      n: 1,
      messages: messages,
    };

    axios
      .post("https://api.openai.com/v1/chat/completions", data, {
        headers: {
          Authorization: "Bearer " + api_key,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setIsLoading(false);
        setResponseMessage(response.data.choices[0].message.content);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("이용 토큰이 만료되었습니다.");
      });
  };

  return (
    <>
      {showCheckAnswerRecoil && (
        <ChattingInfo>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {isLoading && <Loading />}

          {responseMessage && !isLoading && (
            <>
              <AiFeedbackAnswer>{formattedMessage}</AiFeedbackAnswer>
              <ReplayBtnStyle onClick={reFresh}>다시 판결받기</ReplayBtnStyle>
              <SecondBtnStyle onClick={showModal}>2심 신청</SecondBtnStyle>
            </>
          )}
          {modalOpen && <Modal setModalOpen={setModalOpen} {...props} />}
          {/* <SecondBtnStyle onClick={showModal}>2심 신청</SecondBtnStyle> */}
        </ChattingInfo>
      )}
    </>
  );
}

export default AiAnswer;

const ChattingInfo = styled.div`
  border: solid 1px #005a82;
  margin: auto;
  margin-top: 20px;
  width: 570px;
  border-radius: 20px;
  background-color: #121212;
  color: white;
  padding: 20px;
  line-height: 1.8;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const AiFeedbackAnswer = styled.p`
  margin: auto;
  border-radius: 20px;
  color: white;
  padding: 20px;
  line-height: 1.8;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const ReplayBtnStyle = styled.button`
  color: white;
  width: 200px;
  height: 50px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #0a1428;
  border: solid 1px #005a82;
  margin: 0px 10px 0px 10px;
`;

const SecondBtnStyle = styled.button`
  color: white;
  width: 200px;
  height: 50px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #0a1428;
  border: solid 1px #005a82;
  margin: 0px 10px 0px 10px;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-bottom: 10px;
`;

const Loading = styled.div`
  width: 96px;
  height: 48px;
  display: inline-block;
  position: relative;
  background: #fff;
  border-radius: 48px 48px 0 0;
  box-sizing: border-box;
  overflow: hidden;

  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    width: 24px;
    height: 12px;
    border-radius: 24px 24px 0 0;
    background: #ff3d00;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
  &::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 32px;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0;
    background: #ff3d00;
    transform-origin: 50% 100%;
    box-sizing: border-box;
    animation: animloader 2s linear infinite alternate;
  }

  @keyframes animloader {
    0% {
      transform: rotate(-70deg);
    }
    10% {
      transform: rotate(-40deg);
    }
    20%,
    45%,
    35% {
      transform: rotate(-10deg);
    }
    40%,
    30% {
      transform: rotate(-30deg);
    }
    50%,
    60% {
      transform: rotate(20deg);
    }
    55%,
    65%,
    75% {
      transform: rotate(40deg);
    }
    70% {
      transform: rotate(45deg);
    }
    85%,
    90% {
      transform: rotate(50deg);
    }
    95% {
      transform: rotate(75deg);
    }
    100%,
    93% {
      transform: rotate(70deg);
    }
  }
`;
