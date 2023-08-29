import React from "react";
import { styled } from "styled-components";

const JurorPostJudgment = () => {
  return (
    <JurorPostJudgmentStyle>
      <JurorPostJudgmentChampName>
        <JurorPostJudgmentRate>3</JurorPostJudgmentRate>
        <p> 다리우스</p>
      </JurorPostJudgmentChampName>
      vs
      <JurorPostJudgmentChampName>
        <JurorPostJudgmentRate>7</JurorPostJudgmentRate>
        <p>케인</p>
      </JurorPostJudgmentChampName>
    </JurorPostJudgmentStyle>
  );
};

export default JurorPostJudgment;

const JurorPostJudgmentStyle = styled.div`
  color: white;
  display: flex;
  width: 240px;
  right: 0;
  justify-content: flex-end;
  align-items: center;
`;

const JurorPostJudgmentRate = styled.button`
  color: white;
  width: 70px;
  height: 70px;
  border: solid 2px #0ac8b897;
  border-radius: 40px;
  margin: 0px 15px 0px 15px;
  font-size: 20px;
`;

const JurorPostJudgmentChampName = styled.button`
  p {
    font-size: 12px;
    margin-top: 10px;
  }
`;
