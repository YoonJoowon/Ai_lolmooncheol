import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "aimoon-c9fa4.firebaseapp.com",
  projectId: "aimoon-c9fa4",
  storageBucket: "aimoon-c9fa4.appspot.com",
  messagingSenderId: "928734093079",
  appId: "1:928734093079:web:d9e3c6d2d41f26298f2152",
  measurementId: "G-W565SFZ6GF",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

function Modal(props) {
  const bucket = firestore.collection("bucket");
  const [input, setInput] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEmailToFirebase();
    }
  };

  const getValue = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  // 모달창 끄기
  const closeModal = () => {
    props.setModalOpen(false);
    alert("결과 신청이 완료되었습니다. 감사합니다.");
  };

  // 이메일 값, chat 값 담기
  const storedKeywords = JSON.parse(sessionStorage.getItem("inputValues"));
  const saveEmailToFirebase = () => {
    if (input) {
      const dataToAdd = {
        email: input,
        input: storedKeywords,
      };

      bucket.add(dataToAdd).then((docRef) => {
        closeModal();
      });
    }
  };

  return (
    <ModalStyle>
      <ModalGuideTitle>결과 신청</ModalGuideTitle>
      <ModalGuide>
        {/* 인증된 유저만 확인 가능합니다. 이메일을 입력 해주세요. */}
        이메일을 입력 해주세요. 이용에 불편을 드려 대단히 죄송합니다.
      </ModalGuide>
      <ModalInputEmailbox>
        <ModalInputEmail
          placeholder="이메일을 입력해주세요."
          type="email"
          id="searchInput"
          value={input}
          onChange={getValue}
          onKeyDown={handleKeyPress}
        />
        <ModalInputEmailSendBtn onClick={saveEmailToFirebase}>
          전송
        </ModalInputEmailSendBtn>
      </ModalInputEmailbox>
      <ModalClose onClick={closeModal}>X</ModalClose>
    </ModalStyle>
  );
}

export default Modal;

const ModalStyle = styled.div`
  border: solid 1px #c89b3c;
  width: 450px;
  height: 200px;
  color: white;
  font-weight: 500;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #131313;
  box-shadow: 8px 8px 8px rgba(228, 228, 228, 0.2);
`;

const ModalGuideTitle = styled.div`
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  font-weight: 600;
  padding-top: 20px;
  line-height: 1.6;
  position: absolute;
  text-align: center;
`;

const ModalGuide = styled.div`
  cursor: pointer;
  font-size: 16px;
  width: 90%;
  font-weight: 600;
  padding: 60px 20px 20px 20px;
  line-height: 1.6;
  position: absolute;
  margin: auto;
  text-align: center;
  white-space: pre-line;
`;

const ModalInputEmail = styled.input`
  cursor: pointer;
  font-size: 16px;
  width: 250px;
  height: 20px;
  border-radius: 20px;
  padding: 10px;
  margin: auto;
  bottom: 10px;
  left: 15%;
`;

const ModalInputEmailbox = styled.div`
  cursor: pointer;
  display: flex;
  font-size: 16px;
  width: 400px;
  height: 20px;
  border-radius: 20px;
  padding: 10px;
  position: absolute;
  margin: auto;
  bottom: 30px;
  left: 5%;
`;

const ModalInputEmailSendBtn = styled.button`
  cursor: pointer;
  width: 60px;
  height: 40px;
  font-size: 14px;
  border-radius: 20px;
  background-color: #ffffff;
  color: black;
  padding: 10px;
  margin: auto;
`;

const ModalClose = styled.button`
  cursor: pointer;
  font-size: 20px;
  width: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
`;
