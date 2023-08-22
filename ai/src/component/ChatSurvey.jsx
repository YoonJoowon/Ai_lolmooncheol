import React, { useState } from "react";
import { styled } from "styled-components";

import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { FaStar, FaStarHalf } from "react-icons/fa";

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
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0); // 마우스 호버 시 표시되는 별점
  const [rating, setRating] = useState(5);
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
  for (let i = 0; i < 10; i++) {
    const star =
      rating >= i && rating !== null ? "ion-ios-star" : "ion-ios-star-outline";
    stars.push(
      <FaStar
        key={i}
        className={star}
        onMouseOver={() => handleMouseover(i)}
        onClick={() => rate(i)}
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
