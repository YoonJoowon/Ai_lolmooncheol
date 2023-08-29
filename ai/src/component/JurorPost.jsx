import React, { useState } from "react";
import styled from "styled-components";
import JurorPostJudgment from "./JurorPostJudgment";
import jurorPostData from "../dummy/jurorPostData.json";

const JurorPost = () => {
  const initialExpandedState = {};
  jurorPostData.forEach((post) => {
    initialExpandedState[post.id] = true;
  });
  const [expandedState, setExpandedState] = useState(initialExpandedState);

  const togglePostExpansion = (postId) => {
    setExpandedState((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <div>
      {jurorPostData.map((post) => (
        <JurorPostStyle key={post.id}>e
          <JurorPostOpinionBox>
            <JurorPostOpinion expanded={expandedState[post.id]}>
              {post.opinion}
            </JurorPostOpinion>
            <JurorPostDropdownBtn onClick={() => togglePostExpansion(post.id)}>
              {expandedState[post.id] ? "더보기" : "줄이기"}
            </JurorPostDropdownBtn>
          </JurorPostOpinionBox>
          {expandedState[post.id] && <JurorPostJudgment />}
        </JurorPostStyle>
      ))}
    </div>
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

const JurorPostOpinionBox = styled.div`
  overflow: hidden;
`;

const JurorPostOpinion = styled.div`
  color: white;
  line-height: 1.8;
  font-size: 15px;
  margin: 10px;
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "2" : "unset")};
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
`;

const JurorPostDropdownBtn = styled.button`
  color: #ffffff;
  border: solid 1px #005a82;
  background-color: #0a1428;
  border-radius: 20px;
  padding: 10px 10px;
  z-index: 1;
  cursor: pointer;
  margin-left: 10px;
`;
