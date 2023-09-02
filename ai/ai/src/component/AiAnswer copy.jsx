import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { showCheckAnswerState } from "../store/Recoil";
import { Modal } from "@mui/material";

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
  const formattedMessage = responseMessage.replace(/\\n/g, "\n");
  const api_key = process.env.REACT_APP_CHATGPT_API_KEY;

  const triggerAiAnswer = useRecoilValue(showCheckAnswerState);
  const setTriggerAiAnswer = useRecoilState(showCheckAnswerState)[1];

  const storedKeywords = JSON.parse(sessionStorage.getItem("inputValues"));
  const sessionInfo = {
    strings: storedKeywords,
  };

  useEffect(() => {
    if (triggerAiAnswer) {
      // handleSubmit();
      console.log("완료됐음");
      setTriggerAiAnswer(true);
    }
  }, [triggerAiAnswer]);

  const handleSubmit = () => {
    setIsLoading(true);
    const messages = [
      {
        role: "system",
        content:
          "롤 게임 관해서 질문 할 것 입니다. 당신은 최고의 롤 변호사입니다. 두 가지 선택지가 주어지면 중립적인 문구없이 첫번째 선택지를 변호해주세요. 답을 선택한 이유를 말해주세요. 그리고 비유를 사용하여 설명해주세요.",
      },
      {
        role: "user",
        content: sessionInfo + "변호를 해주세요",
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
      <AiFeedbackAnswerTitle>
        현재 서버량이 많아 판결이 어렵습니다.
      </AiFeedbackAnswerTitle>
      <AiFeedbackAnswerSry>
        이메일을 입력해주시면 순차적으로 판결 발송 드리겠습니다. 죄송합니다.
      </AiFeedbackAnswerSry>

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
      <SecondBtnStyle onClick={showModal}>결과 받기</SecondBtnStyle>
      {modalOpen && <Modal setModalOpen={setModalOpen} {...props} />}
    </ChattingInfo>
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

const AiFeedbackAnswerTitle = styled.p`
  color: #0077a9;
  font-size: 20px;
  line-height: 1.6;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AiFeedbackAnswerSry = styled.p`
  color: #0077a9;
  font-size: 16px;
  line-height: 1.6;
  margin-top: 20px;
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

const SecondBtnStyle = styled.button`
  color: white;
  width: 300px;
  height: 50px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #0a1428;
  border: solid 1px #005a82;
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
