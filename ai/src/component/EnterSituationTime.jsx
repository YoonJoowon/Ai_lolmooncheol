import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import {
  StartAskingNextState,
  timeState,
  matchTimelineDataState,
  promptDataState,
} from "../store/Recoil";
import TypingAnimation from "./TypingAnimation";
import axios from "axios";

const EnterSituationTime = () => {
  const API_KEY = process.env.REACT_APP_LOL_API_KEY;
  const [eventTime, setEventTimeState] = useRecoilState(timeState);
  const [matchTimelineData, setMatchTimelineData] = useRecoilState(
    matchTimelineDataState
  );
  const [startAskingNextPlz, setStartAskingNextPlz] =
    useRecoilState(StartAskingNextState);
  const [promptData, setPromptData] = useRecoilState(promptDataState);
  useEffect(() => {
    setMatchTimelineData((prevState) => ({
      ...prevState,
      specificTime: eventTime,
    }));
  }, [eventTime]);

  const handleMinutesChange = (event) => {
    let newMinute = parseInt(event.target.value, 10); // 문자열을 숫자로 변환
    newMinute = Math.min(60, Math.max(0, newMinute)); // 범위 제한
    setEventTimeState((prevState) => ({
      ...prevState,
      minute: newMinute,
    }));
  };

  const handleSecondsChange = (event) => {
    let newSecond = parseInt(event.target.value, 10); // 문자열을 숫자로 변환
    newSecond = Math.min(59, Math.max(0, newSecond)); // 범위 제한
    setEventTimeState((prevState) => ({
      ...prevState,
      second: newSecond,
    }));
  };

  const postTimelineData = () => {
    setStartAskingNextPlz(true);
    axios
      .post("http://localhost:8080/fetchMatchTimeline", matchTimelineData)
      .then((response) => {
        setPromptData((prevData) => ({
          ...prevData,
          myCurrentGold: response.data.myData.currentGold,
          myLevel: response.data.myData.level,
          myHealth: response.data.myData.health,
          myPosition: {
            x: response.data.myData.position.x,
            y: response.data.myData.position.y,
          },
          // 아군 분쟁 상대 정보
          yourCurrentGold: response.data.teamData.currentGold,
          yourLevel: response.data.teamData.level,
          yourHealth: response.data.teamData.health,
          yourPosition: {
            x: response.data.teamData.position.x,
            y: response.data.teamData.position.y,
          },
          // 내 팀 정보
          myTeamGold: response.data.myTeamInfo.totalGold,
          myTeamLevel: response.data.myTeamInfo.AvgLevel,
          // 상대 팀 정보
          enemyTeamGold: response.data.yourTeamInfo.totalGold,
          enemyTeamLevel: response.data.yourTeamInfo.AvgLevel,
        }));
        console.log(promptData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <EnterSituationTimeStyle>
        <SituationTimeAnswer>
          <TypingAnimation text="언제 일어난 상황인지 입력해주세요." />
        </SituationTimeAnswer>
        <TimeInputContainer>
          <TimeInputLabel>분:</TimeInputLabel>
          <TimeInput
            type="number"
            value={eventTime.minute}
            onChange={handleMinutesChange}
            min="0"
            max="60"
          />
          <TimeInputLabel>초:</TimeInputLabel>
          <TimeInput
            type="number"
            value={eventTime.second}
            onChange={handleSecondsChange}
            min="0"
            max="59"
          />
        </TimeInputContainer>
      </EnterSituationTimeStyle>

      <TimeInputLabelSubmit onClick={postTimelineData}>
        전송
      </TimeInputLabelSubmit>
    </>
  );
};

export default EnterSituationTime;

const EnterSituationTimeStyle = styled.div`
  border: solid 1px #0ac8b9;
  padding: 20px;
  color: white;
  margin-top: 20px;
  width: 300px;
  max-width: 500px;
  min-height: 30px;
  max-height: 100%;
  border-radius: 20px;
  line-height: 1.6;
  background-color: #0a323c;
  white-space: pre-line;
  align-self: flex-end;
  margin-right: 20px;

  @media (max-width: 673px) {
    width: 40%;
    margin-right: 20px;
  }
`;

const SituationTimeAnswer = styled.div``;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 673px) {
    display: block;
  }
`;

const TimeInputLabel = styled.label`
  margin-right: 10px;
  @media (max-width: 673px) {
    display: block;
  }
`;

const TimeInput = styled.input`
  border-radius: 10px;
  padding: 5px;
  color: black;
  width: 50px;
  height: 20px;
  margin-right: 20px;
`;

const TimeInputLabelSubmit = styled.button`
  border: solid 1px #0ac8b9;
  color: white;
  margin-top: 20px;
  width: 340px;
  height: 40px;
  border-radius: 20px;
  background-color: #0a323c;
  cursor: pointer;
  white-space: pre-line;
  align-self: flex-end;
  margin-right: 20px;

  @media (max-width: 673px) {
    width: 47%;
  }
`;
