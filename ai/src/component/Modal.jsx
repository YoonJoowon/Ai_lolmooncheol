import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../Firebase";

function Modal(props) {
  const firestore = firebase.firestore();
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
        alert("신청이 완료되었습니다. 감사합니다.");
        closeModal();
      });
    }
  };

  return (
    <ModalStyle>
      <ModalGuideTitle>2심 신청</ModalGuideTitle>
      <ModalGuide>
        {/* 인증된 유저만 확인 가능합니다. 이메일을 입력 해주세요. */}
        2심제도는 유저들이 과실 비율을 측정하는 시스템입니다. <br />
        테스트 버전을 받아보고 싶으신 유저는 이메일을 제출 해주세요.
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

export { Modal };

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
  font-size: 14px;
  width: 90%;
  padding: 60px 20px 20px 20px;
  line-height: 1.6;
  position: absolute;
  margin: auto;
  margin-bottom: 10px;
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
  color: black;
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
