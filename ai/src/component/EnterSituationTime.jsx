import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import {
  StartAskingNextState,
  timeState,
  matchTimelineDataState,
} from "../store/Recoil";
import TypingAnimation from "./TypingAnimation";
import axios from "axios";

const EnterSituationTime = () => {
  const [eventTime, setEventTimeState] = useRecoilState(timeState);
  const [matchTimelineData, setMatchTimelineData] = useRecoilState(
    matchTimelineDataState
  );
  const [startAskingNextPlz, setStartAskingNextPlz] =
    useRecoilState(StartAskingNextState);

  useEffect(() => {
    setMatchTimelineData((prevState) => ({
      ...prevState,
      specificTime: eventTime,
    }));
    console.log(matchTimelineData);
  }, [eventTime]);

  const handleMinutesChange = (event) => {
    const newMinute = parseInt(event.target.value, 10); // 문자열을 숫자로 변환
    setEventTimeState((prevState) => ({
      ...prevState,
      minute: newMinute,
    }));
  };

  const handleSecondsChange = (event) => {
    const newSecond = parseInt(event.target.value, 10); // 문자열을 숫자로 변환
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
        console.log("Post successful:");
      })
      .catch((error) => {
        console.error("Error posting:", error);
        // 에러 처리 로직을 추가할 수 있습니다.
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
          />
          <TimeInputLabel>초:</TimeInputLabel>
          <TimeInput
            type="number"
            value={eventTime.second}
            onChange={handleSecondsChange}
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
  margin-left: 300px;
  margin-top: 20px;
  width: 300px;
  max-width: 500px;
  min-height: 30px;
  max-height: 100%;
  border-radius: 20px;
  line-height: 1.6;
  background-color: #0a323c;
  white-space: pre-line;
`;

const SituationTimeAnswer = styled.div``;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TimeInputLabel = styled.label`
  margin-right: 10px;
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
  margin-left: 300px;
  margin-top: 20px;
  width: 340px;
  height: 40px;
  border-radius: 20px;
  background-color: #0a323c;
  cursor: pointer;
`;
