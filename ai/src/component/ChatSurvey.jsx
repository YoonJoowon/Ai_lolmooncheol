import React, { useState } from "react";
import { styled } from "styled-components";

import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile as fasFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { faFaceSadTear as fasFaceSadTear } from "@fortawesome/free-solid-svg-icons";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: "aimoon-c9fa4.firebaseapp.com",
//   projectId: "aimoon-c9fa4",
//   storageBucket: "aimoon-c9fa4.appspot.com",
//   messagingSenderId: "928734093079",
//   appId: "1:928734093079:web:d9e3c6d2d41f26298f2152",
//   measurementId: "G-W565SFZ6GF",
// };

// firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();

const ChatSurvey = () => {
  //   const surbeyBucket = firestore.collection("surbey-bucket");
  // 서버에 보내졌는지 확인하는 상태
  const [redEmotionState, setRedEmotionState] = useState(false);
  const [greenEmotionState, setGreenEmotionState] = useState(false);
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  const toggleRedEmotion = () => {
    setRedEmotionState((prevState) => !prevState);
    if (greenEmotionState) {
      setGreenEmotionState((prevState) => !prevState);
    }
  };

  const toggleGreenEmotion = () => {
    setGreenEmotionState((prevState) => !prevState);
    if (redEmotionState) {
      setRedEmotionState((prevState) => !prevState);
    }
  };

  const handleSurveySubmit = (emotion) => {
    if (!surveySubmitted) {
      //   setSurveySubmitted(true);
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
        {surveySubmitted ? (
          <>
            <div>설문조사에 응해주셔서 감사합니다.</div>
          </>
        ) : (
          <>
            저희 서비스에 만족하셨습니까?
            <ChatSurveyEmoziWrapper>
              <ChatSurveyEmoziContainer>
                <FontAwesomeIcon
                  values="good"
                  icon={fasFaceSmile}
                  className="icon smile-icon"
                  onClick={toggleGreenEmotion}
                  style={{
                    color: greenEmotionState ? "#00dd00" : "",
                  }}
                />
                <div>만족</div>
              </ChatSurveyEmoziContainer>
              <ChatSurveyEmoziContainer>
                <FontAwesomeIcon
                  values="bad"
                  icon={fasFaceSadTear}
                  className="icon sad-icon"
                  onClick={toggleRedEmotion}
                  style={{
                    color: redEmotionState ? "#ff00007c" : "",
                  }}
                />
                <div>불만족</div>
              </ChatSurveyEmoziContainer>
            </ChatSurveyEmoziWrapper>
            <ChatSurveyInputWrapper>
              <input
                className="survey-input"
                placeholder="의견을 적어주세요"
              ></input>
            </ChatSurveyInputWrapper>
          </>
        )}
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
  height: 200px;
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

const ChatSurveyInputWrapper = styled.div`
  .survey-input {
    width: 300px;
  }
`;
export default ChatSurvey;
