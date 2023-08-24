import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { StartAskingNextState } from "../store/Recoil";
import TypingAnimation from "./TypingAnimation";

const EnterSituationTime = () => {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [startAskingNextPlz, setStartAskingNextPlz] =
    useRecoilState(StartAskingNextState);

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);
  };

  const startAskingNext = () => {
    setStartAskingNextPlz(true);
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
            value={minutes}
            onChange={handleMinutesChange}
          />
          <TimeInputLabel>초:</TimeInputLabel>
          <TimeInput
            type="number"
            value={seconds}
            onChange={handleSecondsChange}
          />
        </TimeInputContainer>
      </EnterSituationTimeStyle>
      <TimeInputLabelSubmit onClick={startAskingNext}>
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
