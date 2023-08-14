import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { inputValueState } from "../store/Recoil";
import { styled } from "styled-components";

const ChatInput = () => {
  const [input, setInput] = useRecoilState(inputValueState);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isInputLocked, setIsInputLocked] = useState(false);

  const handleKeyPress = (e) => {
    if (!isInputLocked && e.key === "Enter") {
      setInput(inputBuffer.toLowerCase());
      setInputBuffer("");
      lockInputForDelay(2500);
    }
  };

  const getValue = (e) => {
    setInputBuffer(e.target.value);
  };

  // 입력 잠금
  const lockInputForDelay = (delay) => {
    setIsInputLocked(true);
    setTimeout(() => {
      setIsInputLocked(false);
    }, delay);
  };

  useEffect(() => {
    const keyDownListener = (e) => {
      if (isInputLocked) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", keyDownListener);

    return () => {
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [isInputLocked]);

  return (
    <ChatInputStyle
      placeholder="여기에 답변을 해주세요!"
      id="searchInput"
      value={inputBuffer}
      onChange={getValue}
      onKeyDown={handleKeyPress}
    >
    </ChatInputStyle>
  );
};

export default ChatInput;

export const ChatInputStyle = styled.textarea`
  color: white;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 618px;
  min-width: 618px;
  min-height: 5%;
  max-height: 5%;
  border-radius: 20px;
  outline: none;
  padding: 20px 20px;
  background-color: #1e1e1e;
  border: solid 1px #c89b3c;
  bottom: 70px;
  position: fixed;
`;
