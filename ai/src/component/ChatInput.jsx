import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { inputValueState } from "../store/Recoil";
import { styled } from "styled-components";

const ChatInput = () => {
  const [input, setInput] = useRecoilState(inputValueState);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isInputLocked, setIsInputLocked] = useState(false);

  // 입력 처리 로직
  const handleInput = () => {
    if (!isInputLocked) {
      setInput(inputBuffer.toLowerCase());
      setInputBuffer("");
      lockInputForDelay(2500);
    }
  };

  // 채팅 입력
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleInput();
    }
  };

  // 입력 버튼 클릭
  const handleButtonClicked = () => {
    handleInput();
  };

  const getValue = (e) => {
    setInputBuffer(e.target.value);
  };

  // 입력 잠금
  const lockInputForDelay = (delay) => {
    setIsInputLocked(true);
    setTimeout(() => {
      setInputBuffer("");
      setIsInputLocked(false);
    }, delay);
  };

  useEffect(() => {
    const keyDownListener = (e) => {
      if (isInputLocked && e.key === "Enter") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", keyDownListener);

    return () => {
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [isInputLocked]);

  return (
    <>
      <ChatInputStyleBox>
        <ChatInputStyle
          placeholder="여기에 답변을 해주세요!"
          id="chatInput"
          value={inputBuffer}
          onChange={getValue}
          onKeyDown={handleKeyPress}
        ></ChatInputStyle>
        <SpendInputTextBtn onClick={handleButtonClicked}>
          전송
        </SpendInputTextBtn>
      </ChatInputStyleBox>
    </>
  );
};

export default ChatInput;

export const ChatInputStyleBox = styled.div`
  color: white;
  white-space: pre-wrap;
  word-wrap: break-word;
  display: flex;
  position: absolute;
  border-radius: 20px;
  outline: none;
  bottom: 20px;

  @media (max-width: 660px) {
    width: 95%;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const ChatInputStyle = styled.textarea`
  color: white;
  width: 550px;
  height: 80px;
  border-radius: 20px;
  outline: none;
  padding: 20px 20px;
  background-color: #1e1e1e;
  border: solid 1px #c89b3c;
  bottom: 70px;

  @media (max-width: 660px) {
    width: 100%;
    height: 50px;
  }
`;

export const SpendInputTextBtn = styled.button`
  width: 60px;
  height: 120px;
  border-radius: 20px;
  color: white;
  background-color: #1e1e1e;
  border: solid 1px #c89b3c;
  cursor: pointer;
  margin-left: 10px;
  right: 0;

  @media (max-width: 660px) {
    height: 90px;
  }
`;
