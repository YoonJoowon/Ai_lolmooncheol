import React, { useEffect, useState } from "react";
import styled from "styled-components";
import JurorPostJudgment from "./JurorPostJudgment";
import JurorPostJudgmentExplainChoice from "./JurorPostJudgmentExplainChoice";
import axios from "axios";

const JurorPost = () => {
  const [expandedState, setExpandedState] = useState({});
  const [judgedContent, setJudgedContent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/jurorContent")
      .then((response) => {
        setJudgedContent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const newExpandedState = {};
    judgedContent.forEach((post) => {
      newExpandedState[post.id] = true;
    });
    setExpandedState(newExpandedState);
  }, []);

  const togglePostExpansion = (postId) => {
    setExpandedState((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <>
      {judgedContent.map((post) => (
        <JurorPostStyle key={post.id}>
          <JurorPostOpinionBox>
            <JurorPostOpinion
              expanded={expandedState[post.id] ? "true" : "false"}
            >
              {post.judgedUserOpinion}
            </JurorPostOpinion>
            {!expandedState[post.id] && (
              <JurorPostJudgmentBox>
                <JurorPostOpinionAi>
                  <p>Ai 롤문철의 판결 </p>
                  {post.judgedByAI}
                </JurorPostOpinionAi>
                <JurorPostJudgmentExplain>
                  어떤 플레이어의 판단이 아쉬웠나요?
                </JurorPostJudgmentExplain>
                <JurorPostJudgmentExplainChoice />
              </JurorPostJudgmentBox>
            )}

            <JurorPostDropdownBtn onClick={() => togglePostExpansion(post.id)}>
              {expandedState[post.id] ? "더보기" : "줄이기"}
            </JurorPostDropdownBtn>
          </JurorPostOpinionBox>
          {expandedState[post.id] && <JurorPostJudgment />}
        </JurorPostStyle>
      ))}
    </>
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
`;

const JurorPostOpinionBox = styled.div`
  overflow: hidden;
  width: 100%;
`;

const JurorPostOpinion = styled.div`
  color: white;
  line-height: 1.8;
  font-size: 15px;
  margin: 10px;
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) =>
    expanded === "true" ? "2" : "unset"};
  -webkit-box-orient: ${({ expanded }) =>
    expanded === "true" ? "vertical" : "unset"};
  overflow: hidden;
  white-space: ${({ expanded }) => (expanded === "true" ? "unset" : "normal")};
  text-overflow: ellipsis;
`;

const JurorPostOpinionAi = styled.div`
  color: white;
  line-height: 1.8;
  font-size: 15px;
  margin: 10px;

  p {
    color: #c89b3c;
  }
`;

const JurorPostJudgmentBox = styled.div`
  width: 100%;
`;

const JurorPostDropdownBtn = styled.button`
  color: #ffffff;
  border: solid 1px #005a82;
  background-color: #0a1428;
  border-radius: 20px;
  padding: 10px 10px;
  cursor: pointer;
  margin-left: 10px;
`;

const JurorPostJudgmentExplain = styled.div`
  width: 500px;
  color: #ffffff;
  border: solid 1px #424242;
  background-color: #121212;
  border-radius: 20px;
  padding: 10px 10px;
  text-align: center;
  margin: auto;
  margin-bottom: 20px;
`;
