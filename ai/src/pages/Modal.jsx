import React, { useState } from "react";
import styled from "styled-components";

function Modal(props) {
  const [searchInput, setSearchInput] = useState("");
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setSearchInput(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getValue = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  // 모달창 끄기
  const closeModal = () => {
    props.setModalOpen(false);
  };

  return (
    <ModalStyle>
      <ModalGuideTitle>2심 신청</ModalGuideTitle>
      <ModalGuide>
        인증된 유저만 2심신청이 가능합니다. 이메일을 입력 해주시면 인증처리
        진행하겠습니다.
      </ModalGuide>
      <ModalInputEmail
        placeholder="여기에 답변을 해주세요!"
        type="email"
        id="searchInput"
        value={input}
        onChange={getValue}
        onKeyDown={handleKeyPress}
      ></ModalInputEmail>

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
`;

const ModalInputEmail = styled.input`
  cursor: pointer;
  font-size: 16px;
  width: 300px;
  position: absolute;
  margin: auto;
  bottom: 10px;
  left: 50%;
`;

const ModalClose = styled.button`
  cursor: pointer;
  font-size: 20px;
  width: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
`;
