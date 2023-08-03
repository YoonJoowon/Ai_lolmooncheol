import React, { useState } from "react";
import { styled } from "styled-components";

const SearchInput = () => {
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
    <SearchInputStyle
      placeholder="소환사 명을 입력하세요."
      id="searchInput"
      value={input}
      onChange={getValue}
      onKeyDown={handleKeyPress}
    />
  );
};

export default SearchInput;

export const SearchInputStyle = styled.input`
  border: solid 1px #424242;
  margin: auto;
  margin-top: 20px;
  text-align: center;
  color: white;
  width: 610px;
  height: 50px;
  border-radius: 20px;
  background-color: #3f3f3f;
`;
