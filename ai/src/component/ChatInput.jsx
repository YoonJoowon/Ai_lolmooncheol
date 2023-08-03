import React, { useState } from "react";
import { styled } from "styled-components";

const ChatInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setSearchInput(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getValue = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  return (
    <ChatInputStyle
      placeholder="여기에 답변을 해주세요!"
      id="searchInput"
      value={input}
      onChange={getValue}
      onKeyDown={handleKeyPress}
    ></ChatInputStyle>
  );
};

export default ChatInput;

export const ChatInputStyle = styled.textarea`
  color: white;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 618px;
  min-width: 618px;
  min-height: 60px;
  max-height: 60px;
  border-radius: 20px;
  outline: none;
  padding: 20px 20px;
  background-color: #1e1e1e;
  border: 2.5px solid #60394f;
  position: absolute;
  bottom: 40px;
`;
