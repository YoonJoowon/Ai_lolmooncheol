import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { StartAskingNextState } from "../store/Recoil";

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

  const StartAskingNext = () => {
    setStartAskingNextPlz(true);
  };
  
  const scrollContainerRef = useRef(null);
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <EnterSituationTimeStyle>
        <SituationTimeAnswer>
          언제 일어난 상황인지 입력해주세요.
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
      <TimeInputLabelSubmit onClick={StartAskingNext}>
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
