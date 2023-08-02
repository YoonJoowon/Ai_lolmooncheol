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
      type="search"
      placeholder="여기에 답변을 해주세요!"
      id="searchInput"
      value={input}
      onChange={getValue}
      onKeyDown={handleKeyPress}
    ></ChatInputStyle>
  );
};

export default ChatInput;

export const ChatInputStyle = styled.input`
  width: 658px;
  min-height: 100px;
  max-height: 100px;
  border-radius: 20px;
  outline: none;
  padding: 0 20px;
  background-color: #1E1E1E;
  border: 2.5px solid #60394f;
  position: absolute;
  bottom: 40px;
  color: white;
`;
