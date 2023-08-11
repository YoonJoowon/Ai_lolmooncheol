import React, { useState } from "react";
import { styled } from "styled-components";
import Logo from "./Logo";

const Header = () => {
  const TitleText = "2심 : 배심원판결";
  return (
    <Wrapper>
      <Logo />
      <HeaderStyle>
        <HeaderText>{TitleText}</HeaderText>
      </HeaderStyle>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  position: absolute;
  top: 20px;
  align-items: center;
`;

const HeaderStyle = styled.div`
  background-color: #1e1e1e;
  border-radius: 20px;
  border: solid 1px #c89b3c;
  margin: auto;
  width: 658px;
  height: 42px;
  text-align: center;
  color: #9a8fdd;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.p`
  color: white;
  width: auto;
  padding: 10px;
  margin: auto;
  justify-content: center;
  align-items: center;
`;
