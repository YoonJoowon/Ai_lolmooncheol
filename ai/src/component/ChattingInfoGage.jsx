import React from "react";
import { styled } from "styled-components";

const ChattingInfoGage = () => {
  return <ChattingInfoGageStyle></ChattingInfoGageStyle>;
};

export default ChattingInfoGage;

const ChattingInfoGageStyle = styled.div`
  height: 2.8px;
  width: auto;
  position: absolute;
  background: #ffd476;
  box-shadow: 0px 0px 10px #ffcd61;
  animation: animFw 4s linear infinite;

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

  @keyframes animFw {
    0% {
      width: 0;
    }
    100% {
      width: 590px;
    }
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
