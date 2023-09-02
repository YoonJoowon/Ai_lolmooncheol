import React from "react";
import { styled } from "styled-components";
import Header2 from "../component/Header2";
import JurorPost from "../component/JurorPost";

const Juror = () => {
  return (
    <Background>
      <Header2></Header2>
      <ChattingInfo>
        <JurorPostLayout>
          <JurorPost></JurorPost>
        </JurorPostLayout>
        <JurorPostLayout>
          <JurorPost></JurorPost>
        </JurorPostLayout>
      </ChattingInfo>
    </Background>
  );
};

export default Juror;
const Background = styled.div`
  background-color: black;
  background-size: cover;
  background-position: center center;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  font-family: Arial, sans-serif;
`;

const ChattingInfo = styled.div`
  background-color: #131313;
  border: solid 1px #c89b3c;
  width: 658px;
  height: 90%;
  margin: auto;
  margin-top: 80px;
  border-radius: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const JurorPostLayout = styled.div`
  margin: auto;
  width: 600px;
  height: 600px;
  border: solid 1px #c89b3c;
  padding: 20px 0px 20px 0px;
  margin-bottom: 20px;
`;
