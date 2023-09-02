import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { StartAskingNextState, nickNameInputState } from "../store/Recoil";
import { useRecoilState, useRecoilValue } from "recoil";

const SearchInput = () => {
  // 첫 정보 받는 input
  const [nickNameInput, setNickNameInput] = useRecoilState(nickNameInputState);
  const [inputNickNameBuffer, setNickNameInputBuffer] = useState("");
  const [isInputLocked, setIsInputLocked] = useState(false);
  const reMoveInputFirst = useRecoilValue(StartAskingNextState);

  // 입력 처리 로직
  const handleInput = () => {
    if (!isInputLocked) {
      setNickNameInput(inputNickNameBuffer.toLowerCase());
      setNickNameInputBuffer("");
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
      {!reMoveInputFirst && (
        <SearchInputStyleBox>
          <SearchInputStyle
            placeholder="여기에 답변을 해주세요!"
            id="searchInput"
            value={inputNickNameBuffer}
            onChange={getnickNameValue}
            onKeyDown={handleKeyPress}
          ></SearchInputStyle>
          <SpendInputTextBtn onClick={handleButtonClicked}>
            전송
          </SpendInputTextBtn>
        </SearchInputStyleBox>
      )}
    </>
  );
};

export default SearchInput;

export const SearchInputStyleBox = styled.div`
  color: white;
  white-space: pre-wrap;
  word-wrap: break-word;
  display: flex;
  position: absolute;
  border-radius: 20px;
  outline: none;
  bottom: 60px;
  z-index: 1;

  @media (max-width: 660px) {
    width: 95%;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const SearchInputStyle = styled.textarea`
  color: white;
  width: 550px;
  height: 45px;
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
  height: 90px;
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
