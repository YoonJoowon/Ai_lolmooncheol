import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import Header from "../component/Header";
import SearchInput from "../component/SearchInput";

const UserSearch = () => {
  return (
    <Background>
      <Header />
      <ChattingInfo>
        <SearchInput></SearchInput>
      </ChattingInfo>
    </Background>
  );
};

export default UserSearch;

const Background = styled.div`
  background-color: black;
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
`;

const ChattingInfo = styled.div`
  background-color: #1e1e1e;
  border: solid 1px #424242;
  width: 658px;
  min-height: 900px;
  margin: auto;
  margin-top: 80px;
  border-radius: 20px;
  display: flex;
`;
