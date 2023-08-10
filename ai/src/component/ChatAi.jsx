import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputValueState, checkAiAnswer } from "./Recoil";
import { styled } from "styled-components";
import questionsData from "../dummy/questionData.json";
import AiAnswer from "../pages/AiAnswer";

const ChatAi = () => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(questionsData[1]);
  const [conversation, setConversation] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [input, setInput] = useRecoilState(checkAiAnswer);

  const inputValue = useRecoilValue(inputValueState);

  const pickNextQuestion = () => {
    const newIndex = questionIndex + 1;
    if (newIndex <= questionsData.length) {
      setQuestionIndex(newIndex);
      const newQuestion = questionsData[newIndex];
      setCurrentQuestion(newQuestion);
      setConversation([...conversation, currentQuestion]);
    }
  };

  useEffect(() => {
    if (inputValue) {
      setInputValues((prevInputValues) => [...prevInputValues, inputValue]);
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputValues.length > 0) {
      pickNextQuestion();
    }
  }, [inputValues]);

  useEffect(() => {
    sessionStorage.setItem("inputValues", JSON.stringify(inputValues));
  }, [inputValues]);

  return (
    <ChatWrapper>
      <ChatAiStyle>
        <p>{questionsData[0].question}</p>
      </ChatAiStyle>

      {conversation.map((item, index) => (
        <React.Fragment key={index}>
          {inputValues[index] && (
            <ChatUserStyle>
              <p>{inputValues[index]}</p>
            </ChatUserStyle>
          )}
          <ChatAiStyle>
            <p>{item.question}</p>
          </ChatAiStyle>
        </React.Fragment>
      ))}

      {inputValues[conversation.length] && (
        <>
          <ChatUserStyle>
            <p>{inputValues[conversation.length]}</p>
          </ChatUserStyle>
          <CheckAnswer>
            판결까지 최대 1분 소요 될 예정입니다. 잠시만 기다려주세요.
          </CheckAnswer>
        </>
      )}
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 20px 0px;
`;

const ChatAiStyle = styled.div`
  border: solid 1px #424242;
  padding: 20px;
  color: white;
  margin-left: 23px;
  margin-top: 20px;
  width: 300px;
  min-height: 30px;
  border-radius: 20px;
  line-height: 1.6;
  background-color: #3f3f3f;
`;

const ChatUserStyle = styled.div`
  border: solid 1px #424242;
  margin-left: 333px;
  margin-top: 20px;
  width: 300px;
  min-height: 50px;
  border-radius: 20px;
  background-color: #60394f;
  line-height: 1.6;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CheckAnswer = styled.div`
  border: solid 1px #424242;
  margin: auto;
  margin-top: 20px;
  width: 570px;
  height: 25px;
  border-radius: 20px;
  background-color: #121212;
  color: white;
  padding: 20px;
  line-height: 1.8;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export default ChatAi;
