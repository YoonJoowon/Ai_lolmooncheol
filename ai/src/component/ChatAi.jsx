import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  StartAskingNextState,
  chatUserAnswerState,
  inputValueState,
  showCheckAnswerState,
} from "../store/Recoil";
import { styled } from "styled-components";
import questionsData from "../dummy/questionData.json";
import AiAnswer from "./AiAnswer";
import TypingAnimation from "./TypingAnimation";
import ChatUserInfo from "./ChatUserInfo";

const ChatAi = () => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(questionsData[1]);
  const [conversation, setConversation] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [showCheckAnswer, setShowCheckAnswer] = useState(false);
  const [showCheckAnswerRecoil, setShowCheckAnswerRecoil] =
    useRecoilState(showCheckAnswerState);
  const askStart = useRecoilValue(StartAskingNextState);
  const inputValue = useRecoilValue(inputValueState);
  const [chatUserAnswer, setChatUserAnswer] =
    useRecoilState(chatUserAnswerState);

  // 결과보기 버튼
  const handleButtonClick = () => {
    setShowCheckAnswer(true);
    setShowCheckAnswerRecoil(true);
  };

  const pickNextQuestion = () => {
    const newIndex = questionIndex + 1;
    if (newIndex <= questionsData.length) {
      setQuestionIndex(newIndex);
      const newQuestion = questionsData[newIndex];
      setCurrentQuestion(newQuestion);
      const updatedConversation = [...conversation, currentQuestion];
      setConversation(updatedConversation);
    }
  };

  useEffect(() => {
    if (inputValue || askStart) {
      const cleanedInputValue = inputValue.replace(/\n/g, "");
      setInputValues((prevInputValues) => [
        ...prevInputValues,
        cleanedInputValue,
      ]);
    }
  }, [inputValue, askStart]);

  // session 에 추가
  useEffect(() => {
    setChatUserAnswer(inputValues);
  }, [inputValues]);

  // 다음 질문시작
  useEffect(() => {
    if (inputValues.length > 0) {
      pickNextQuestion();
    }
  }, [inputValues]);

  // auto scroll
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    handleScroll();
  }, [inputValues, showCheckAnswer]);

  return (
    <ChatWrapper>
      <ChatAiStyle>
        <p>{questionsData[0].question}</p>
      </ChatAiStyle>
      <ChatUserInfo></ChatUserInfo>

      {conversation.map((item, index) => (
        <React.Fragment key={index}>
          {inputValues[index] && (
            <ChatUserStyle>
              <p>{inputValues[index]}</p>
            </ChatUserStyle>
          )}

          <ChatAiStyle>
            <TypingAnimation text={item.question} />
          </ChatAiStyle>
        </React.Fragment>
      ))}

      {inputValues[conversation.length] && (
        <>
          <ChatUserStyle>{inputValues[conversation.length]}</ChatUserStyle>
          <ChatChecking onClick={handleButtonClick}>결과 확인하기</ChatChecking>
        </>
      )}

      {showCheckAnswer && (
        <CheckAnswer>
          판결까지 최대 1분 소요 될 예정입니다. 잠시만 기다려주세요.
        </CheckAnswer>
      )}

      <AiAnswer></AiAnswer>

      <div ref={scrollContainerRef}></div>
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const ChatAiStyle = styled.div`
  border: solid 1px #a7a7a7;
  padding: 20px;
  color: white;
  margin-left: 23px;
  margin-top: 20px;
  width: 300px;
  max-width: 500px;
  max-height: 100%;
  border-radius: 20px;
  line-height: 1.6;
  background-color: #3f3f3f;

  @media (max-width: 673px) {
    width: 40%;
  }
`;

const ChatUserStyle = styled.div`
  border: solid 1px #0ac8b9;
  padding: 20px;
  color: white;
  margin-top: 20px;
  width: 300px;
  max-width: 500px;
  min-height: 30px;
  max-height: 100%;
  border-radius: 20px;
  line-height: 1.6;
  background-color: #0a323c;
  white-space: pre-line;
  align-self: flex-end;
  margin-right: 20px;

  @media (max-width: 673px) {
    width: 40%;
    margin-right: 20px;
  }
`;

const ChatChecking = styled.button`
  color: white;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 600px;
  height: 25px;
  margin: auto;
  border-radius: 20px;
  padding: 20px 20px;
  background-color: #0a1428;
  border: solid 1px #005a82;
  margin-top: 20px;
  cursor: pointer;

  @media (max-width: 673px) {
    width: 90%;
  }
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

  @media (max-width: 673px) {
    width: 80%;
  }
`;

export default ChatAi;
