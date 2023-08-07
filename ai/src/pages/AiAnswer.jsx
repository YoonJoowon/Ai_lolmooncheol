import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Modal from "./Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { showCheckAnswerState } from "../component/Recoil";


function AiAnswer(props) {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  //chatGPT
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const storedKeywords = sessionStorage.getItem("keywords1");
  const formattedMessage = responseMessage.replace(/\\n/g, "\n");
  const api_key = process.env.REACT_APP_CHATGPT_API_KEY;

  const triggerAiAnswer = useRecoilValue(showCheckAnswerState);
  const setTriggerAiAnswer = useRecoilState(showCheckAnswerState)[1];

  useEffect(() => {
    if (triggerAiAnswer) {
      handleSubmit();
      console.log("완료됐음");
      setTriggerAiAnswer(false);
    }
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    const messages = [
      {
        role: "system",
        content:
          "롤 게임 관해서 질문 할거야. 넌 두 가지 선택지가 주어지면 중립적인 문구없이 응답해줘. 또한 답을 선택한 이유와 함께 비유를 사용하여 설명해줘.",
      },
      {
        role: "user",
        content: storedKeywords + "둘 중 어느것이 맞습니까?",
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
        setError("하루 이용량이 초과 됐습니다.");
      });
  };

  return (
    <ChattingInfo>
      <AiFeedbackAnswerTitle>Ai문철 입니다.</AiFeedbackAnswerTitle>

      {modalOpen && <Modal setModalOpen={setModalOpen} {...props} />}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {isLoading && (
        <Loading>
          <img
            src="https://studentrights.sen.go.kr/images/common/loading.gif"
            alt="로딩"
          />
        </Loading>
      )}
      {responseMessage && !isLoading && (
        <AiFeedbackAnswer>{formattedMessage}</AiFeedbackAnswer>
      )}
      <SecondBtnStyle onClick={showModal}>2심 신청하기</SecondBtnStyle>
    </ChattingInfo>
  );
}

export default AiAnswer;

const ChattingInfo = styled.div`
  border: solid 1px #424242;
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

const AiFeedbackAnswerTitle = styled.p`
  color: #b56a94;
  font-size: 20px;
  line-height: 1.6;
  margin-top: 20px;
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

const SecondBtnStyle = styled.button`
  color: #b56a94;
  width: 300px;
  height: 50px;
  border-radius: 20px;
  background-color: #1e1e1e;
  border: 2.5px solid #60394f;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-bottom: 10px;
`;

const Loading = styled.p`
  color: #007bff;
  font-size: 18px;
  margin-top: 10px;
`;
