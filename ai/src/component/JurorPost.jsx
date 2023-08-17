import React from "react";
import { styled } from "styled-components";

const JurorPost = () => {
  return (
    <JurorPostStyle>
      <JurorPostMovie></JurorPostMovie>
      <JurorPostjudgment></JurorPostjudgment>
      <JurorPostOpinion>
        내가 위에서 애들 턴 미드 정글 탑 이렇게 다 빼주고 있고 심지어 탑하고 cs
        차이도 2배나는데 영상 보면 알겠지만 저기서 내가 스킬 다쓰고 결국 뒤에
        합류한 탑땜에 제압킬을 애니한테 줬음. <br />
        <br />
        근데 그거 가지고 르블랑이 여기선 탑에서 싸울게 아니라 바텀 텔 타면 상대
        6/0/0 하고 있는 칼리스타 잡고 겜 더 쉽다고 우겨서 찡찡 대길래 맥문철
        하자길래 올렸음. <br />
        <br />
        진짜 누가 더 잘 못했음?
      </JurorPostOpinion>
    </JurorPostStyle>
  );
};

export default JurorPost;

const JurorPostStyle = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  overflow-y: hidden;
`;

const JurorPostMovie = styled.div`
  width: 566px;
  height: 318px;
  margin: auto;
  display: flex;
  border-radius: 20px;
  background-color: gray;
`;

const JurorPostjudgment = styled.div``;

const JurorPostOpinion = styled.div`
  color: white;
`;
