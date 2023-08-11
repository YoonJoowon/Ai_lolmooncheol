import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { inputValueState } from "./Recoil";
import { useRecoilState } from "recoil";

const ChattingInfoGage = () => {
  const [inputValue] = useRecoilState(inputValueState);
  const [gageWidth, setGageWidth] = useState(inputValue.length * 6);

  // 누적 width 값 증가
  useEffect(() => {
    setGageWidth((prevGageWidth) => prevGageWidth + inputValue.length * 6);
  }, [inputValue]);
  return <ChattingInfoGageStyle width={gageWidth} />;
};

export default ChattingInfoGage;

const ChattingInfoGageStyle = styled.div`
  height: 2.8px;
  width: ${({ width }) => width}px;
  max-width: 658px;
  position: absolute;
  background: #ffd476;
  box-shadow: 0px 0px 10px #ffcd61;
  /* animation: animFw linear infinite; */

  &::after,
  &::before {
    content: "";
    width: 20px;
    height: 1.5px;
    background: #c89b3c;
    position: absolute;
    top: 10px;
    right: -4px;
    transform: rotate(-45deg) translateX(0px);
    animation: coli1 0.3s linear infinite;
  }
  &::before {
    position: absolute;
    top: -4px;
    transform: rotate(45deg);
    animation: coli2 0.3s linear infinite;
  }

  @keyframes coli1 {
    0% {
      transform: rotate(-45deg) translateX(0px);
      opacity: 0.7;
    }
    100% {
      transform: rotate(-45deg) translateX(-45px);
      opacity: 0;
    }
  }

  @keyframes coli2 {
    0% {
      transform: rotate(45deg) translateX(0px);
      opacity: 1;
    }
    100% {
      transform: rotate(45deg) translateX(-45px);
      opacity: 0.7;
    }
  }
`;
