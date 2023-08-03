import React, { useState } from "react";
import styled from "styled-components";

function Modal(props) {
  // 모달창 끄기
  const closeModal = () => {
    props.setModalOpen(false);
  };

  return <ModalStyle>asdasdasdasdas</ModalStyle>;
}

export default Modal;

const ModalStyle = styled.div`
  border: 5px solid red;
  width: 100px;
`;
