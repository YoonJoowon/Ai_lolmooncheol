import React, { useState } from "react";
import { styled } from "styled-components";
import Modal from "./Modal";

function AiAnswer(props) {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  //chatGPT

  return (
    <ChattingInfo>
      <AiFeedbackAnswerTitle>Ai문철 입니다.</AiFeedbackAnswerTitle>
      {modalOpen && <Modal setModalOpen={setModalOpen} {...props} />}
      <AiFeedbackAnswer>
        자르반의 의견은 상대 라인을 밀어서 상대 원딜러가 CS를 놓치게 하고 상대
        정글러의 위치를 알아내는 것이 중요하다는 것입니다. 이렇게 하면 우리 팀이
        유리한 상황을 만들 수 있을 것입니다.반면 베인의 의견은 상대 정글러의
        위치를 알 수 없기 때문에 역갱을 당할 수 있으며, 이로 인해 더 큰 손해를
        볼 수 있다는 것입니다. 그리고 현재 베인의 체력이 매우 낮기 때문에 집에
        가야 한다는 것입니다.이러한 상황에서 저는 각 플레이어의 의견을 듣고
        상황을 판단하여 최선의 결정을 내릴 것입니다. 이는 팀 전략과 상황에 따라
        다를 수 있으며, 팀원들과 함께 의논하여 최선의 선택을 하게 될 것입니다.
      </AiFeedbackAnswer>
      <SecondBtnStyle onClick={showModal}>2심 신청하기</SecondBtnStyle>
    </ChattingInfo>
  );
}

export default AiAnswer;

const ChattingInfo = styled.div`
  border: solid 1px #424242;
  margin: auto;
  margin-top: 20px;
  width: 570px;
  border-radius: 20px;
  background-color: #121212;
  color: white;
  padding: 20px;
  line-height: 1.8;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const AiFeedbackAnswerTitle = styled.p`
  color: #b56a94;
  font-size: 20px;
  line-height: 1.6;
  margin-top: 20px;
`;

const AiFeedbackAnswer = styled.p`
  margin: auto;
  border-radius: 20px;
  color: white;
  padding: 20px;
  line-height: 1.8;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const SecondBtnStyle = styled.button`
  color: #b56a94;
  width: 300px;
  height: 50px;
  border-radius: 20px;
  background-color: #1e1e1e;
  border: 2.5px solid #60394f;
`;
