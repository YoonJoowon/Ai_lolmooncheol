import React, { useState } from "react";
import { styled } from "styled-components";

import axios from "axios";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import { FaStar, FaStarHalf } from "react-icons/fa";

const ChatSurvey = () => {
  // 서버에 보내졌는지 확인하는 상태
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0); // 마우스 호버 시 표시되는 별점
  const [rating, setRating] = useState(null);
  const [tempRating, setTempRating] = useState(null);

  const handleMouseover = (rating) => {
    setRating(tempRating);
    setTempRating(rating);
  };

  const handleMouseout = () => {
    setRating(tempRating);
  };

  const rate = (rating) => {
    setRating(rating);
    setTempRating(rating);
  };

  const stars = [];
  for (let i = 0; i < 5; i++) {
    const star =
      rating >= i && rating !== null ? "ion-ios-star" : "ion-ios-star-outline";
    stars.push(
      <FaStar
        key={i}
        className={star}
        onMouseOver={() => handleMouseover(i)}
        onClick={() => {
          rate(i);
        }}
        onMouseOut={handleMouseout}
        color={(hoverRating || rating) >= i ? "gold" : "#e4e5e9"}
        size={25}
        style={{ cursor: "pointer" }}
      />
    );
  }

  const handleSurveySubmit = (stars) => {
    if (!surveySubmitted) {
      //   setSurveySubmitted(true);
      axios
        .post("/submit-survey", { stars })
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
            서비스 만족도 조사
            <ChatSurveyEmoziWrapper>
              <ChatSurveyEmoziContainer>{stars}</ChatSurveyEmoziContainer>
            </ChatSurveyEmoziWrapper>
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
  height: 100px;
`;

const ChatSurveyEmoziWrapper = styled.div`
  display: flex;
  gap: 50px;
`;

const ChatSurveyEmoziContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default ChatSurvey;
