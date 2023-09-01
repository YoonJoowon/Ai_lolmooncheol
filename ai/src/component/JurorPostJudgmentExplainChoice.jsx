import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { votedChampState } from "../store/Recoil";

const JurorPostJudgmentExplainChoice = ({
  judgedMyChamp,
  judgedMyChampImg,
  judgedMyChampClicked,
  judgedYourChamp,
  judgedYourChampImg,
  judgedYourChampClicked,
  judgedContentID,
}) => {
  const [isMyVoteBtnClicked, setMyIsvoteBtnClicked] = useState(false);
  const [isYourVoteBtnClicked, setYourIsvoteBtnClicked] = useState(false);
  const [voteChamp, setVoteChamp] = useRecoilState(votedChampState);

  const myVoteBtnClick = () => {
    setMyIsvoteBtnClicked(true);
    setYourIsvoteBtnClicked(true);
    alert("투표가 완료되었습니다!");
    setVoteChamp((prevState) => ({
      ...prevState,
      _id: judgedContentID,
      votedMyChamp: 1,
      votedYourChamp: 0,
    }));
  };

  const yourVoteBtnClick = () => {
    setYourIsvoteBtnClicked(true);
    setMyIsvoteBtnClicked(true);
    alert("투표가 완료되었습니다!");
    setVoteChamp((prevState) => ({
      ...prevState,
      _id: judgedContentID,
      votedMyChamp: 0,
      votedYourChamp: 1,
    }));
  };

  useEffect(() => {
    axios
      .post("http://localhost:8080/votedChamp", voteChamp)
      .catch((error) => console.log(error));
  }, [voteChamp]);

  return (
    <JurorPostJudgmentStyle>
      <JurorPostJudgmentChampName>
        <JurorPostJudgmentMyRate
          onClick={myVoteBtnClick}
          disabled={isMyVoteBtnClicked}
        >
          {judgedMyChampClicked}
        </JurorPostJudgmentMyRate>
        <JurorPostJudgementImg>
          <img src={judgedMyChampImg} alt="judgedMyChampImg" />
          <p> {judgedMyChamp}</p>
        </JurorPostJudgementImg>
      </JurorPostJudgmentChampName>
      vs
      <JurorPostJudgmentChampName>
        <JurorPostJudgmentYourRate
          onClick={yourVoteBtnClick}
          disabled={isYourVoteBtnClicked}
        >
          {judgedYourChampClicked}
        </JurorPostJudgmentYourRate>
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

  @media (max-width: 767px) {
    justify-content: center;
  }
`;

const baseButtonStyles = css`
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

const JurorPostJudgmentMyRate = styled.button`
  ${baseButtonStyles}
  ${(props) =>
    props.myVoteBtnColor &&
    css`
      background-color: #0ac8b897;
      border-color: #0ac8b897;
      cursor: not-allowed;
    `}
  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
`;

const JurorPostJudgmentYourRate = styled.button`
  ${baseButtonStyles}
  ${(props) =>
    props.yourVoteBtnColor &&
    css`
      background-color: #0ac8b897;
      border-color: #0ac8b897;
      cursor: not-allowed;
    `}
  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
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
