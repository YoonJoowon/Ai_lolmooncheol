import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { promptDataState } from "../store/Recoil";
import axios from "axios";
import ChatSurvey from "./ChatSurvey";
import { showCheckAnswerState } from "../store/Recoil";
import html2canvas from "html2canvas";

function AiAnswer(props) {
  //chatGPT
  const api_key = process.env.REACT_APP_OPENAI_API_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const formattedMessage = responseMessage.replace(/\\n/g, "\n");
  const showCheckAnswerRecoil = useRecoilValue(showCheckAnswerState);
  const promptData = useRecoilValue(promptDataState);
  const storedKeywords = JSON.parse(sessionStorage.getItem("inputValues"));
  const filteredString = (storedKeywords || [])
    .map((item) => String(item))
    .join(" ");

  const aChamp = promptData.myChamp;
  const aChampHp = promptData.myHealth;
  const aChampGold = promptData.myCurrentGold;
  const aChampLevel = promptData.myLevel;
  const aChampLocation = "x:6447 y:6447";

  const bChamp = promptData.yourChamp;
  const bChampHp = promptData.yourHealth;
  const bChampGold = promptData.yourCurrentGold;
  const bChampLevel = promptData.yourLevel;
  const bChampLocation = "x:8154 y:2524";

  const teamLevel = promptData.myTeamLevel;
  const teamGold = promptData.myTeamGold;

  const enemyLevel = promptData.enemyTeamLevel;
  const enemyGold = promptData.enemyTeamGold;

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
          `당신의 작업은 롤 게임 관련해서 옳은 판단을 말해주는 것입니다. ${aChamp}의 의견과 ${bChamp}의 의견 중 중립적인 문구없이 한 의견을 선택하여 이유와 함께 답해주세요. 
          아래의 형식을 사용하고, 주어진 골드, 레벨 등 각각 의 지표들을 하나씩 근거로 들면서 결론을 말해주세요.` +
          "다음 형식을 사용합니다:" +
          "안녕하세요! 주어진 상황에서 판결을 시작해볼게요! \n\n" +
          `${aChamp}의 당시 상황 지표분석:\n` +
          `체력:${aChampHp}\n` +
          `골드:${aChampGold}\n` +
          `레벨:${aChampLevel}\n\n` +
          `위치:${aChampLocation}\n\n` +
          `${bChamp}의 당시 상황 지표분석:\n` +
          `체력:${bChampHp}\n` +
          `골드:${bChampGold}\n` +
          `레벨:${bChampLevel}\n\n` +
          `위치:${bChampLocation}\n\n` +
          `우리 팀 지표분석:\n` +
          `평균 레벨:${teamLevel}\n` +
          `총 골드:${teamGold}\n` +
          `상대 팀 지표분석:\n` +
          `평균 레벨:${enemyLevel}\n` +
          `총 골드:${enemyGold}\n` +
          `${aChamp}의 주장:\n` +
          "```\n\n" +
          `${bChamp}의 주장:\n` +
          "```\n\n" +
          "결론:\n" +
          "```",
      },
      {
        role: "assistant",
        content:
          "안녕하세요! 주어진 상황에서 판결을 시작해볼게요! \n\n" +
          `${aChamp}의 당시 상황 지표분석:\n` +
          `체력:${aChampHp}\n` +
          `골드:${aChampGold}\n` +
          `레벨:${aChampLevel}\n\n` +
          `위치:${aChampLocation}\n\n` +
          `${bChamp}의 당시 상황 지표분석:\n` +
          `체력:${bChampHp}\n` +
          `골드:${bChampGold}\n` +
          `레벨:${bChampLevel}\n\n` +
          `위치:${bChampLocation}\n\n` +
          `우리 팀 지표분석:\n` +
          `평균 레벨:${teamLevel}\n` +
          `총 골드:${teamGold}\n` +
          `상대 팀 지표분석:\n` +
          `평균 레벨:${enemyLevel}\n` +
          `총 골드:${enemyGold}\n` +
          `${aChamp}의 주장:\n` +
          "```\n\n" +
          `${bChamp}의 주장:\n` +
          "```\n\n" +
          "결론:\n" +
          "```",
      },
      {
        role: "user",
        content:
          filteredString +
          "당시 상황을 토대로 누구의 주장이 맞는지 판단해주세요.",
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

  // 사이트 공유
  const urlToCopy = "https://aimoon-c9fa4.web.app/";
  const urlCopy = async () => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      alert("URL이 클립보드에 복사되었습니다.");
    } catch (error) {
      alert("URL 복사에 실패했습니다.");
    }
  };

  // 결과 공유
  const ref = useRef(null);
  const clipboardHandler = () => {
    if (ref.current) {
      html2canvas(ref.current).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            try {
              navigator.clipboard
                .write([new ClipboardItem({ "image/png": blob })])
                .then(() => {
                  alert("결과 이미지가 클립보드에 복사되었습니다.");
                })
                .catch((error) => {
                  console.error("Clipboard write error:", error);
                  alert("결과 이미지 복사에 실패했습니다.");
                });
            } catch (error) {
              console.error("Clipboard write error:", error);
              alert("결과 이미지 복사에 실패했습니다.");
            }
          }
        });
      });
    }
  };

  return (
    <>
      <div ref={ref}>
        {showCheckAnswerRecoil && (
          <ChattingInfo>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {isLoading && <Loading />}
            {responseMessage && !isLoading && (
              <>
                <AiFeedbackAnswer>{formattedMessage}</AiFeedbackAnswer>
                <ReplayBtnStyle onClick={urlCopy}>
                  사이트 공유하기
                </ReplayBtnStyle>
                <ReplayBtnStyle onClick={clipboardHandler}>
                  결과 공유하기
                </ReplayBtnStyle>
                <ChatSurvey />
              </>
            )}
          </ChattingInfo>
        )}
      </div>
    </>
  );
}
export default AiAnswer;

const ChattingInfo = styled.div`
  border: solid 1px #005a82;
  width: 570px;
  border-radius: 20px;
  background-color: #121212;
  color: white;
  padding: 20px;
  line-height: 1.8;
  text-align: center;
  margin: auto;
  margin-top: 20px;
  margin-left: 23px;

  @media (max-width: 673px) {
    width: 80%;
  }
`;

const AiFeedbackAnswer = styled.p`
  margin: auto;
  border-radius: 20px;
  color: white;
  padding: 20px;
  line-height: 1.8;
  display: flex;
  text-align: justify;
  white-space: pre-wrap;
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

  @media (max-width: 550px) {
    margin-top: 10px;
  }
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
