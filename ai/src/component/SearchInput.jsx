import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { StartAskingNextState, nickNameInputState } from "../store/Recoil";
import { useRecoilState, useRecoilValue } from "recoil";

// 첫 정보 받는 input
const SearchInput = () => {
  const [nickNameInput, setNickNameInput] = useRecoilState(nickNameInputState);
  const [inputNickNameBuffer, setNickNameInputBuffer] = useState("");
  const [isInputLocked, setIsInputLocked] = useState(false);
  const reMoveInputFirst = useRecoilValue(StartAskingNextState);

  const handleKeyPress = (e) => {
    if (!isInputLocked && e.key === "Enter") {
      setNickNameInput(inputNickNameBuffer.toLowerCase());
      setNickNameInputBuffer("");
      lockInputForDelay(2500);
    }
  };

  const getnickNameValue = (e) => {
    setNickNameInputBuffer(e.target.value);
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
    <>
      {!reMoveInputFirst && (
        <SearchInputStyle
          placeholder="여기에 답변을 해주세요!"
          id="searchInput"
          value={inputNickNameBuffer}
          onChange={getnickNameValue}
          onKeyDown={handleKeyPress}
        />
      )}
    </>
  );
};

export default SearchInput;

export const SearchInputStyle = styled.textarea`
  color: white;
  white-space: pre-wrap;
  word-wrap: break-word;
  display: block;
  width: 620px;
  min-height: 5%;
  max-height: 5%;
  border-radius: 20px;
  outline: none;
  padding: 20px 20px;
  background-color: #1e1e1e;
  border: solid 1px #c89b3c;
  bottom: 70px;
  position: fixed;
  z-index: 1;

  @media (max-width: 660px) {
    width: 93%;
    bottom: 10px;
  }
`;
