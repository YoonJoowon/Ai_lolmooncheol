import React from "react";
import { styled } from "styled-components";

const JurorPost = () => {
  return (
    <JurorPostStyle>
      <JurorPostMovie></JurorPostMovie>
      <JurorPostjudgment></JurorPostjudgment>
      <JurorPostOpinion></JurorPostOpinion>
    </JurorPostStyle>
  );
};

export default JurorPost;

const JurorPostStyle = styled.div`
  width: 400px;
  height: 300px;

  background-color: gray;
`;

const JurorPostMovie = styled.div`
  width: 400px;
  height: 300px;

  background-color: gray;
`;
const JurorPostjudgment = styled.div``;
const JurorPostOpinion = styled.div``;