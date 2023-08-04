import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { inputValueState } from "./Recoil";
import { styled } from "styled-components";
import questionsData from "../dummy/questionData.json";

const ChatAi = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questionsData[0]);
  const [conversation, setConversation] = useState([]);

  const input = useRecoilValue(inputValueState);

  const pickNextQuestion = () => {
    const newIndex = questionIndex + 1;
    if (newIndex < questionsData.length) {
      setQuestionIndex(newIndex);
      const newQuestion = questionsData[newIndex];
      setCurrentQuestion(newQuestion);
      setConversation([...conversation, currentQuestion]);
    }
  };

  return (
    <ChatWrapper>
      {conversation.map((item, index) => (
        <ChatAiStyle key={index}>
          <p>{item.question}</p>
        </ChatAiStyle>
      ))}

      {currentQuestion && (
        <ChatUserStyle>
          <p>{input}</p>
          <button onClick={pickNextQuestion}>Pick the next question</button>
        </ChatUserStyle>
      )}

      {currentQuestion && (
        <ChatAiStyle>
          <p>{currentQuestion.question}</p>
        </ChatAiStyle>
      )}
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 8px;
    font-size: 14px;
  }
`;

export default ChatAi;
