import React, { useState } from "react";
import { styled } from "styled-components";

const Logo = () => {
  return <LogoStyle>롤 법정 토론</LogoStyle>;
};

export default Logo;

const LogoStyle = styled.div`
  color: #005a82;
  font-size: 20px;
  position: absolute;
  justify-content: center;
  align-items: center;
  padding: 5px 15px 5px 15px;
`;
