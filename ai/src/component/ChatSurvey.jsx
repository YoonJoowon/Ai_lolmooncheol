import React, { useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile as fasFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { faFaceSadTear as fasFaceSadTear } from "@fortawesome/free-solid-svg-icons";

const ChatSurvey = () => {
  // 서버에 보내졌는지 확인하는 상태
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  const handleSurveySubmit = (emotion) => {
    if (!surveySubmitted) {
      axios
        .post("/submit-survey", { emotion })
        .then((response) => {
          console.log("Server response:", response.data);
          setSurveySubmitted(true);
        })
        .catch((error) => {
          console.error("Error sending data to server:", error);
        });
    }
  };

  return (
    <>
      <ChatSurveyWrapper>
        저희 서비스에 만족하셨습니까?
        <ChatSurveyEmoziWrapper>
          <ChatSurveyEmoziContainer>
            <FontAwesomeIcon
              values="good"
              icon={fasFaceSmile}
              className="icon smile-icon"
              onClick={() => handleSurveySubmit("good")}
            />
            <div>만족</div>
          </ChatSurveyEmoziContainer>
          <ChatSurveyEmoziContainer>
            <FontAwesomeIcon
              values="bad"
              icon={fasFaceSadTear}
              className="icon sad-icon"
              onClick={() => handleSurveySubmit("bad")}
            />
            <div>불만족</div>
          </ChatSurveyEmoziContainer>
        </ChatSurveyEmoziWrapper>
      </ChatSurveyWrapper>
    </>
  );
};

const ChatSurveyWrapper = styled.div`
  color: white;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  border-radius: 20px;
  padding: 20px 20px;
  background-color: #0a1428;
  border: solid 1px #005a82;
  margin-top: 20px;
  gap: 10px;
  height: 120px;
`;

const ChatSurveyEmoziWrapper = styled.div`
  display: flex;
  gap: 50px;
`;

const ChatSurveyEmoziContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  .icon {
    font-size: 50px;
    background-color: transparent;
  }
  .icon:hover {
    cursor: pointer;
  }
  .smile-icon:hover {
    color: #00dd00;
  }
  .sad-icon:hover {
    color: #ff00007c;
  }
`;

export default ChatSurvey;
