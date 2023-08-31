import React from "react";
import { styled } from "styled-components";

const JurorPostJudgmentExplainChoice = ({
  judgedMyChamp,
  judgedMyChampImg,
  judgedYourChamp,
  judgedYourChampImg,
}) => {
  const alertJudgementBtnClick = () => {
    alert("투표가 완료되었습니다!");
  };

  return (
    <JurorPostJudgmentStyle>
      <JurorPostJudgmentChampName>
        <JurorPostJudgmentRate onClick={alertJudgementBtnClick}>
          3
        </JurorPostJudgmentRate>
        <JurorPostJudgementImg>
          <img src={judgedMyChampImg} alt="judgedMyChampImg" />
          <p> {judgedMyChamp}</p>
        </JurorPostJudgementImg>
      </JurorPostJudgmentChampName>
      vs
      <JurorPostJudgmentChampName>
        <JurorPostJudgmentRate onClick={alertJudgementBtnClick}>
          7
        </JurorPostJudgmentRate>
        <JurorPostJudgementImg>
          <img src={judgedYourChampImg} alt="judgedYourChampImg" />
          <p>{judgedYourChamp}</p>
        </JurorPostJudgementImg>
      </JurorPostJudgmentChampName>
    </JurorPostJudgmentStyle>
  );
};

export default JurorPostJudgmentExplainChoice;

const JurorPostJudgmentStyle = styled.div`
  color: white;
  display: flex;
  width: 240px;
  right: 0;
  justify-content: flex-end;
  align-items: center;
  margin: auto;
`;

const JurorPostJudgmentRate = styled.button`
  color: white;
  width: 70px;
  height: 70px;
  border: solid 2px #0ac8b897;
  border-radius: 40px;
  margin: 0px 15px 0px 15px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0ac8b897;
  }
`;

const JurorPostJudgmentChampName = styled.div`
  p {
    font-size: 12px;
    text-align: center;
  }
`;

const JurorPostJudgementImg = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5px;
  img {
    width: 25px;
    border-radius: 100%;
    border: solid 1px #0ac8b897;
  }
`;
