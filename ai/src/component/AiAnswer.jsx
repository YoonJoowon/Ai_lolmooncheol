import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { chatUserAnswerState, promptDataState } from "../store/Recoil";
import axios from "axios";
import ChatSurvey from "./ChatSurvey";
import { showCheckAnswerState } from "../store/Recoil";
import html2canvas from "html2canvas";
import firebase from "../Firebase";

function AiAnswer(props) {
  //chatGPT
  const api_key = process.env.REACT_APP_OPENAI_API_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const formattedMessage = responseMessage.replace(/\\n/g, "\n");
  const showCheckAnswerRecoil = useRecoilValue(showCheckAnswerState);
  const promptData = useRecoilValue(promptDataState);
  const storedKeywords = useRecoilValue(chatUserAnswerState);
  const filteredString = (storedKeywords || [])
    .map((item) => String(item))
    .join(" ");

  const aChamp = promptData.myChamp;
  const aChampHp = promptData.myHealth;
  const aChampGold = promptData.myCurrentGold;
  const aChampLevel = promptData.myLevel;
  const aChampPosition = promptData.myPosition;

  const bChamp = promptData.yourChamp;
  const bChampHp = promptData.yourHealth;
  const bChampGold = promptData.yourCurrentGold;
  const bChampLevel = promptData.yourLevel;
  const bChampPosition = promptData.yourPosition;

  const teamLevel = promptData.myTeamLevel;
  const teamGold = promptData.myTeamGold;

  const enemyLevel = promptData.enemyTeamLevel;
  const enemyGold = promptData.enemyTeamGold;

  // firebase
  const firestore = firebase.firestore();
  const bucket = firestore.collection("chat-bucket");

  const saveFilteredStringToFirebase = () => {
    if ((filteredString, formattedMessage)) {
      bucket
        .add({ filteredString, formattedMessage })
        .then(() => {})
        .catch((error) => {
          console.error("Error saving filteredString to Firebase:", error);
        });
    }
  };

  useEffect(() => {
    if (showCheckAnswerRecoil) {
      handleSubmit();
      saveFilteredStringToFirebase();
    }
  }, [showCheckAnswerRecoil]);

  const handleSubmit = () => {
    setIsLoading(true);
    const messages = [
      {
        role: "system", // 행동지정, 역할부여
        content: `당신의 작업은 롤 게임 관련해서 옳은 판단을 말해주는 것입니다. 같은 팀인 ${aChamp}의 의견과 ${bChamp}의 의견 중 중립적인 문구없이 옳은 판단을 이유와 함께 답해주세요. 
          아래의 형식을 사용하고, 지표들을 하나씩 근거로 들면서 결론을 말해주세요.`,
      },
      {
        role: "assistant",
        content:
          "안녕하세요! 주어진 상황에서 판결을 시작해볼게요! \n\n" +
          `${aChamp}의 당시 상황 지표분석:\n` +
          `체력: ${aChampHp}\n` +
          `골드: ${aChampGold}\n` +
          `레벨: ${aChampLevel}\n` +
          `위치: ${aChampPosition}\n\n` +
          `${bChamp}의 당시 상황 지표분석:\n` +
          `체력: ${bChampHp}\n` +
          `골드: ${bChampGold}\n` +
          `레벨: ${bChampLevel}\n` +
          `위치: ${bChampPosition}\n\n` +
          `우리 팀 지표분석:\n` +
          `평균 레벨: ${teamLevel}\n` +
          `총 골드: ${teamGold}\n\n` +
          `상대 팀 지표분석:\n` +
          `평균 레벨: ${enemyLevel}\n` +
          `총 골드: ${enemyGold}\n\n` +
          `${aChamp}의 상황:\n` +
          "```\n\n" +
          `${bChamp}의 상황:\n` +
          "```\n\n" +
          "결론:\n" +
          "```",
      },
      {
        role: "user",
        content:
          `${aChamp}의 당시 상황 지표분석:\n` +
          `체력: ${aChampHp}\n` +
          `골드: ${aChampGold}\n` +
          `레벨: ${aChampLevel}\n` +
          `위치: ${aChampPosition}\n\n` +
          `${bChamp}의 당시 상황 지표분석:\n` +
          `체력: ${bChampHp}\n` +
          `골드: ${bChampGold}\n` +
          `레벨: ${bChampLevel}\n` +
          `위치: ${bChampPosition}\n\n` +
          `우리 팀 지표분석:\n` +
          `평균 레벨: ${teamLevel}\n` +
          `총 골드: ${teamGold}\n\n` +
          `상대 팀 지표분석:\n` +
          `평균 레벨: ${enemyLevel}\n` +
          `총 골드: ${enemyGold}\n\n` +
          "이 지표들을 기반해서 3가지 이유와 함께 누가 판단을 잘못했는지 결론을 말 해주세요." +
          `참고로 ${aChamp}와 ${bChamp}는 같은 팀입니다.` +
          filteredString,
      },
    ];

    const data = {
      model: "gpt-3.5-turbo",
      temperature: 1,
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
      <ChattingInfoCapture ref={ref}>
        {showCheckAnswerRecoil && (
          <ChattingInfo>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {isLoading && <Loading />}
            {responseMessage && !isLoading && (
              <>
                <AiFeedbackAnswer>
                  {`${aChamp}의 당시 상황 지표분석:`}
                  <br />
                  {`체력: ${aChampHp}`}
                  <br />
                  {`골드: ${aChampGold}`}
                  <br />
                  {`레벨: ${aChampLevel}`}
                  <br />
                  {`위치: X: ${aChampPosition.x} Y: ${aChampPosition.y}`}
                  <br />
                  <br />
                  {`${bChamp}의 당시 상황 지표분석:`}
                  <br />
                  {`체력: ${bChampHp}`}
                  <br />
                  {`골드: ${bChampGold}`}
                  <br />
                  {`레벨: ${bChampLevel}`}
                  <br />
                  {`위치: X: ${bChampPosition.x} Y: ${bChampPosition.y}`}
                  <br />
                  <br />
                  {`우리 팀 지표분석:`}
                  <br />
                  {`평균 레벨: ${teamLevel}`}
                  <br />
                  {`총 골드: ${teamGold}`}
                  <br />
                  <br />
                  {`상대 팀 지표분석:`}
                  <br />
                  {`평균 레벨: ${enemyLevel}`}
                  <br />
                  {`총 골드: ${enemyGold}`}
                  <br />
                  <br /> {formattedMessage}
                </AiFeedbackAnswer>
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
      </ChattingInfoCapture>
    </>
  );
}
export default AiAnswer;

const ChattingInfoCapture = styled.div`
  margin: auto;
  margin-top: 20px;
`;

const ChattingInfo = styled.div`
  border: solid 1px #005a82;
  width: 570px;
  border-radius: 20px;
  background-color: #121212;
  color: white;
  padding: 20px;
  line-height: 1.8;
  text-align: center;

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
