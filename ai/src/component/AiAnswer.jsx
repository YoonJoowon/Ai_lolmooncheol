import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import {
  chatUserAnswerState,
  promptDataState,
  timeState,
  showCheckAnswerState,
  judgedContentState,
  // nickNameInputState,
  // StartAskingNextState,
  // inputValueState,
  // conversationState,
  // showUserDataState,
  // showTeamDataState,
} from "../store/Recoil";
import axios from "axios";
import ChatSurvey from "./ChatSurvey";
import html2canvas from "html2canvas";

function AiAnswer(props) {
  //chatGPT
  const api_key = process.env.REACT_APP_OPENAI_API_KEY;
  const judgeContentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const formattedMessage = responseMessage.replace(/\\n/g, "\n");

  const [showCheckAnswerRecoil, setShowCheckAnswerRecoil] =
    useRecoilState(showCheckAnswerState);
  // const [StartAskingNext, setStartAskingNext] =
  //   useRecoilState(StartAskingNextState);
  // const [nickNameInput, setNickNameInput] = useRecoilState(nickNameInputState);
  // const [inputValue, setInputValue] = useRecoilState(inputValueState);
  // const [conversation, setConversation] = useRecoilState(conversationState);
  // const [chatUserAnswer, setChatUserAnswer] =
  //   useRecoilState(chatUserAnswerState);
  // const [showUserData, setShowUserData] = useRecoilState(showUserDataState);
  // const [showTeamData, setShowTeamData] = useRecoilState(showTeamDataState);

  const promptData = useRecoilValue(promptDataState);
  const storedKeywords = useRecoilValue(chatUserAnswerState);
  const [time, setTime] = useRecoilState(timeState);
  const filteredString = (storedKeywords || [])
    .map((item) => String(item))
    .join(" ");
  const aChamp = promptData.myChamp;
  const aChampLane = promptData.myLane;
  const aChampHP = promptData.myHealth;
  const aChampCurrentHP = promptData.myCurrentHealth;
  const aChampGold = promptData.myCurrentGold;
  const aChampLevel = promptData.myLevel;
  const aChampPosition = promptData.myPosition;
  const aChampImg = promptData.myChampImg;

  const bChamp = promptData.yourChamp;
  const bChampLane = promptData.yourLane;
  const bChampHP = promptData.yourHealth;
  const bChampCurrentHP = promptData.yourCurrentHealth;
  const bChampGold = promptData.yourCurrentGold;
  const bChampLevel = promptData.yourLevel;
  const bChampPosition = promptData.yourPosition;
  const bChampImg = promptData.yourChampImg;

  const teamLevel = promptData.myTeamLevel;
  const teamGold = promptData.myTeamGold;

  const enemyLevel = promptData.enemyTeamLevel;
  const enemyGold = promptData.enemyTeamGold;

  const [judgedContent, setJudgedContent] = useRecoilState(judgedContentState);

  // firebase
  // const firestore = firebase.firestore();
  // const bucket = firestore.collection("chat-bucket2");

  // const saveFilteredStringToFirebase = () => {
  //   if ((filteredString, formattedMessage)) {
  //     bucket
  //       .add({ filteredString, formattedMessage })
  //       .then(() => {})
  //       .catch((error) => {
  //         console.error("Error saving filteredString to Firebase:", error);
  //       });
  //   }
  // };

  useEffect(() => {
    if (showCheckAnswerRecoil) {
      handleSubmit();
      // saveFilteredStringToFirebase();
    }
  }, [showCheckAnswerRecoil]);

  const handleSubmit = () => {
    setIsLoading(true);

    const messages = [
      {
        role: "system", // 행동지정, 역할부여
        content: `당신의 작업은 롤 게임 관련해서 옳은 판단을 말해주는 것입니다. 같은 팀인 ${aChamp}의 의견과 ${bChamp}의 의견 중 중립적인 문구없이 옳은 판단을 이유와 함께 답해주세요.`,
      },
      {
        role: "user",
        content:
          filteredString +
          `${aChamp}의 당시 상황 지표분석:\n` +
          `체력: ${aChampCurrentHP}\n` +
          `골드: ${aChampGold}\n` +
          `레벨: ${aChampLevel}\n\n` +
          `${bChamp}의 당시 상황 지표분석:\n` +
          `체력: ${bChampCurrentHP}\n` +
          `골드: ${bChampGold}\n` +
          `레벨: ${bChampLevel}\n\n` +
          `우리 팀 지표분석:\n` +
          `평균 레벨: ${teamLevel}\n` +
          `총 골드: ${teamGold}\n\n` +
          `상대 팀 지표분석:\n` +
          `평균 레벨: ${enemyLevel}\n` +
          `총 골드: ${enemyGold}\n\n` +
          "이 지표들을 기반해서 3가지 이유와 함께 누가 판단을 잘못했는지 결론을 말 해주세요." +
          `참고로 ${aChamp}와 ${bChamp}는 같은 팀입니다.`,
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
        setJudgedContent((prevState) => ({
          ...prevState,
          judgedMyChamp: aChamp,
          judgedMyChampImg: aChampImg,
          judgedMyChampLane: aChampLane,
          judgedMyChampCurrentHP: aChampCurrentHP,
          judgedMyChampHP: aChampHP,
          judgedMyChampGold: aChampGold,
          judgedMyChampLevel: aChampLevel,
          judgedMyChampClicked: 1,

          judgedYourChamp: bChamp,
          judgedYourChampImg: bChampImg,
          judgedYourChampLane: bChampLane,
          judgedYourChampCurrentHP: bChampCurrentHP,
          judgedYourChampHP: bChampHP,
          judgedYourChampGold: bChampGold,
          judgedYourChampLevel: bChampLevel,
          judgedYourChampClicked: 1,

          judgedTeamLevel: teamLevel,
          judgedTeamGold: teamGold,
          judgedEnemyLevel: enemyLevel,
          judgedEnemyGold: enemyGold,
          judgedUserOpinion: storedKeywords[2],
          judgedByAI: response.data.choices[0].message.content,
        }));
      })
      .catch((error) => {
        setIsLoading(false);
        setError("이용 토큰이 만료되었습니다.");
      });
  };

  useEffect(() => {
    if (judgedContent.judgedByAI != "") {
      const data = judgedContent;
      axios.post("/api/judgedContent", data).catch((error) => {
        console.error(error);
      });
    }
  }, [judgedContent]);

  // 사이트 공유
  // const urlToCopy = "https://aimoon-c9fa4.web.app/";
  // const urlCopy = async () => {
  //   try {
  //     await navigator.clipboard.writeText(urlToCopy);
  //     alert("URL이 클립보드에 복사되었습니다.");
  //   } catch (error) {
  //     alert("URL 복사에 실패했습니다.");
  //   }
  // };
  const urlToCopy = "http://aimoon.o-r.kr/";
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = urlToCopy;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        alert("URL이 클립보드에 복사되었습니다.");
        setCopySuccess(true);
      } else {
        alert("URL 복사에 실패했습니다.");
        setCopySuccess(false);
      }
    } catch (error) {
      console.log(error);
      setCopySuccess(false);
    }

    document.body.removeChild(textArea);
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

  const handleRestartButton = () => {
    window.location.reload();
    // setShowCheckAnswerRecoil(false);
    // setStartAskingNext(false);
    // setNickNameInput("");
    // setInputValue("");
    // setConversation("");
    // setChatUserAnswer("");
    // setTime({ minute: 0, second: 0 });
    // setShowUserData(false);
    // setShowTeamData(false);
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
                <ResultSummaryTime>
                  분쟁시간 : {`${time.minute}분 ${time.second}초`}
                </ResultSummaryTime>
                <ResultSummaryWrapper>
                  <UserMatchingDataBox>
                    <UserMatchingDataImg>
                      <img
                        src={aChampImg}
                        alt={aChamp}
                        style={{ width: "60px" }}
                      />
                    </UserMatchingDataImg>
                    <UserMatchingDataName>{aChamp}</UserMatchingDataName>
                    <UserMatchingDataInfo>
                      <div>{`라인: ${aChampLane}`}</div>
                      <div>{`체력: ${aChampCurrentHP}/${aChampHP}`}</div>
                      <div>{`골드: ${aChampGold}`}</div>
                      <div>{`레벨: ${aChampLevel}`}</div>
                    </UserMatchingDataInfo>
                  </UserMatchingDataBox>
                  <ResultVSWrapper>vs</ResultVSWrapper>
                  <UserMatchingDataBox>
                    <UserMatchingDataImg>
                      <img
                        src={bChampImg}
                        alt={bChamp}
                        style={{ width: "60px" }}
                      />
                    </UserMatchingDataImg>
                    <UserMatchingDataName>{bChamp}</UserMatchingDataName>
                    <UserMatchingDataInfo>
                      <div>{`라인: ${bChampLane}`}</div>
                      <div>{`체력: ${bChampCurrentHP}/${bChampHP}`}</div>
                      <div>{`골드: ${bChampGold}`}</div>
                      <div>{`레벨: ${bChampLevel}`}</div>
                    </UserMatchingDataInfo>
                  </UserMatchingDataBox>
                </ResultSummaryWrapper>
                <AiFeedbackAnswer ref={judgeContentRef}>
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
                {/* <ReplayBtnStyle onClick={clipboardHandler}>
                  결과 공유하기
                </ReplayBtnStyle> */}
                <ChatSurvey />
                <ReplayBtnStyle onClick={copyToClipboard}>
                  사이트 공유하기
                </ReplayBtnStyle>
                <RestartWrapper onClick={handleRestartButton}>
                  다시하기
                </RestartWrapper>
                <OtherWrapper>
                  <Link to="/Juror" style={{ textDecoration: "none" }}>
                    다른 사람 판결 보기
                  </Link>
                </OtherWrapper>
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
    margin: auto;
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
  margin: 10px 10px 0px 10px;

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
  margin: 30px 10px 10px 10px;
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

const ResultSummaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ResultSummaryTime = styled.div`
  display: flex;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #121212;
  border: solid 1px #424242;
`;

const ResultVSWrapper = styled.div`
  font-size: 30px;
`;

const UserMatchingDataBox = styled.button`
  width: 150px;
  height: 240px;
  background-color: #3f3f3f;
  border: solid 1px ${(index) => (index.isGameSelected ? "red" : "#a7a7a7")};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  @media (max-width: 673px) {
    margin-top: 20px;
  }
`;

const UserMatchingDataImg = styled.div`
  width: 90px;
  height: 90px;
  border: solid 1px #a7a7a7;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const UserMatchingDataName = styled.div`
  margin: 5px;
  text-align: center;
`;

const UserMatchingDataInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RestartWrapper = styled.button`
  color: white;
  width: 200px;
  height: 50px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #0a1428;
  border: solid 1px #005a82;
  margin: 30px 10px 10px 10px;

  @media (max-width: 550px) {
    margin-top: 10px;
  }
`;

const OtherWrapper = styled.button`
  color: white;
  width: 200px;
  height: 50px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #0a1428;
  border: solid 1px #005a82;
  margin: 30px 10px 10px 10px;

  @media (max-width: 550px) {
    margin-top: 10px;
  }
`;