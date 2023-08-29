import React from "react";
import { styled } from "styled-components";

const JurorPost = () => {
  return (
    <JurorPostStyle>
      <div>
        <JurorPostOpinion>
          내가 위에서 애들 턴 미드 정글 탑 이렇게 다 빼주고 <br />
          <br />
          르블랑이 여기선 탑에서 싸울게 아니라 바텀 텔.... <br />
          <br />
        </JurorPostOpinion>
        <JurorPostDropdownBtn>더보기</JurorPostDropdownBtn>
      </div>
      <JurorPostJudgment>
        <JurorPostJudgmentRate>3</JurorPostJudgmentRate>
        <JurorPostJudgmentRate>7</JurorPostJudgmentRate>
      </JurorPostJudgment>
    </JurorPostStyle>
  );
};

export default JurorPost;

const JurorPostStyle = styled.div`
  width: 100%;
  margin: auto;
  overflow-y: hidden;
  padding: 0px 10px;
  margin: auto;
  width: 600px;
  border: solid 1px #005a82;
  border-radius: 20px;
  padding: 20px 10px 20px 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const JurorPostOpinion = styled.div`
  color: white;
  line-height: 0.7;
`;

const JurorPostDropdownBtn = styled.button`
  color: white;
  border: 1px solid white;
  border-radius: 20px;
  padding: 5px;
  z-index: 1;
  cursor: pointer;
`;

const JurorPostJudgment = styled.div`
  color: white;
  display: flex;
  width: 200px;
  right: 0;
  justify-content: flex-end;
`;

const JurorPostJudgmentRate = styled.button`
  color: white;
  width: 100px;
  height: 70px;
  border: solid 1px #005a82;
  border-radius: 40px;
  margin-right: 20px;
`;
