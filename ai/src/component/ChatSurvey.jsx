import React, { useState } from "react";
import { styled } from "styled-components";
import firebase from "../Firebase";

import { FaStar } from "react-icons/fa";

const ChatSurvey = () => {
  // 서버에 보내졌는지 확인하는 상태
  const firestore = firebase.firestore();
  const bucket = firestore.collection("surbey-bucket2");
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0); // 마우스 호버 시 표시되는 별점

  const [rating, setRating] = useState(4);
  const [tempRating, setTempRating] = useState(4);

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
  const defaultStars = 5;
  for (let i = 0; i < defaultStars; i++) {
    const star = "ion-ios-star";
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

  const saveRatingFirebase = () => {
    if (rating !== null) {
      bucket
        .add({ rating }) // Rating을 Firebase에 저장
        .then(() => {
          setSurveySubmitted(true);
        })
        .catch((error) => {console.log(error)});
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
              <div
                style={{
                  border: "0.1px solid white",
                  borderRadius: "20px",
                  cursor: "pointer",
                  backgroundColor: "#005a82",
                }}
                onClick={saveRatingFirebase}
                className="chat-survey"
              >
                제출하기
              </div>
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
  gap: 20px;
  flex-direction: column;
`;

const ChatSurveyEmoziContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default ChatSurvey;
