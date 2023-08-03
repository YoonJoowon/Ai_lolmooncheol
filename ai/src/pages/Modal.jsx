import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const api_key = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: api_key,
  authDomain: "dor-project-12340.firebaseapp.com",
  projectId: "dor-project-12340",
  storageBucket: "dor-project-12340.appspot.com",
  messagingSenderId: "426903209241",
  appId: "1:426903209241:web:2626860b249ae1f5213188",
  measurementId: "G-8MGR4M93CP",
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
    alert("인증처리 신청이 완료되었습니다. 감사합니다.");
  };

  // 이메일 값을 Firebase에 저장하고 모달창 닫기
  const saveEmailToFirebase = () => {
    if (input) {
      bucket.add({ email: input }).then((docRef) => {
        console.log("Document ID:", docRef.id);
        closeModal();
      });
    }
  };

  return (
    <ModalStyle>
      <ModalGuideTitle>2심 신청</ModalGuideTitle>
      <ModalGuide>
        인증된 유저만 2심신청이 가능합니다. 이메일을 입력 해주세요.
      </ModalGuide>
      <ModalInputEmailbox>
        <ModalInputEmail
          placeholder="여기에 답변을 해주세요!"
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
  /* border: 2.5px solid #60394f; */
  width: 450px;
  height: 200px;
  color: black;
  font-weight: 500;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #bababa;
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
  background-color: #1e1e1e;
  color: white;
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
