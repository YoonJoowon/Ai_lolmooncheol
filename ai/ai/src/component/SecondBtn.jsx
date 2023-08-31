import React, { useState } from "react";
import { styled } from "styled-components";

const SecondBtn = () => {
  return <SecondBtnStyle>2심 신청하기</SecondBtnStyle>;
};

export default SecondBtn;

export const SecondBtnStyle = styled.button`
  color: #acacac;
  width: 658px;
  height: 60px;
  border-radius: 20px;
  padding: 20px 20px;
  background-color: #1e1e1e;
  border: 2.5px solid #60394f;
  position: absolute;
  bottom: 40px;
`;
