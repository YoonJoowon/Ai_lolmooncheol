import React, { useEffect, useState } from "react";
import styled from "styled-components";
import JurorPostJudgment from "./JurorPostJudgment";
import jurorPostData from "../dummy/jurorPostData.json";
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
  console.log(judgedContent);

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
                  {/* <ResultSummaryTime>
                    분쟁시간 : {`${time.minute}분 ${time.second}초`}
                  </ResultSummaryTime> */}
                  <ResultSummaryWrapper>
                    <UserMatchingDataBox>
                      <UserMatchingDataImg>
                        <img
                          src={post.judgedMyChampImg}
                          alt={post}
                          style={{ width: "60px" }}
                        />
                      </UserMatchingDataImg>
                      <UserMatchingDataName>
                        {post.judgedMyChamp}
                      </UserMatchingDataName>
                      <UserMatchingDataInfo>
                        <div>{`라인: ${post.judgedMyChampLane}`}</div>
                        <div>{`체력: ${post.judgedMyChampCurrentHP}/${post.judgedMyChampHP}`}</div>
                        <div>{`골드: ${post.judgedMyChampGold}`}</div>
                        <div>{`레벨: ${post.judgedMyChampLevel}`}</div>
                      </UserMatchingDataInfo>
                    </UserMatchingDataBox>
                    <ResultVSWrapper>vs</ResultVSWrapper>
                    <UserMatchingDataBox>
                      <UserMatchingDataImg>
                        <img
                          src={post.judgedYourChampImg}
                          alt={post}
                          style={{ width: "60px" }}
                        />
                      </UserMatchingDataImg>
                      <UserMatchingDataName>
                        {post.judgedYourChamp}
                      </UserMatchingDataName>
                      <UserMatchingDataInfo>
                        <div>{`라인: ${post.judgedYourChampLane}`}</div>
                        <div>{`체력: ${post.judgedYourChampCurrentHP}/${post.judgedYourChampHP}`}</div>
                        <div>{`골드: ${post.judgedYourChampGold}`}</div>
                        <div>{`레벨: ${post.judgedYourChampLevel}`}</div>
                      </UserMatchingDataInfo>
                    </UserMatchingDataBox>
                  </ResultSummaryWrapper>
                  <AiFeedbackAnswer>
                    <br />
                    {`우리 팀 지표분석  :`}
                    <br />
                    {`평균 레벨: ${post.judgedTeamLevel}`}
                    <br />
                    {`총 골드: ${post.judgedTeamGold}`}
                    <br />
                    <br />
                    {`상대 팀 지표분석  :`}
                    <br />
                    {`평균 레벨: ${post.judgedEnemyLevel}`}
                    <br />
                    {`총 골드: ${post.judgedEnemyGold}`}
                    <br />
                    <br />
                  </AiFeedbackAnswer>
                  {post.judgedByAI}
                </JurorPostOpinionAi>
                <JurorPostJudgmentExplain>
                  어떤 플레이어의 판단이 아쉬웠나요?
                </JurorPostJudgmentExplain>
                <JurorPostJudgmentExplainChoice
                  judgedMyChamp={post.judgedMyChamp}
                  judgedMyChampImg={post.judgedMyChampImg}
                  judgedMyChampClicked={post.judgedMyChampClicked}
                  judgedYourChamp={post.judgedYourChamp}
                  judgedYourChampImg={post.judgedYourChampImg}
                  judgedYourChampClicked={post.judgedYourChampClicked}
                />
              </JurorPostJudgmentBox>
            )}

            <JurorPostDropdownBtn onClick={() => togglePostExpansion(post.id)}>
              {expandedState[post.id] ? "더보기" : "줄이기"}
            </JurorPostDropdownBtn>
          </JurorPostOpinionBox>
          {expandedState[post.id] && (
            <JurorPostJudgment
              judgedMyChamp={post.judgedMyChamp}
              judgedMyChampImg={post.judgedMyChampImg}
              judgedMyChampClicked={post.judgedMyChampClicked}
              judgedYourChamp={post.judgedYourChamp}
              judgedYourChampImg={post.judgedYourChampImg}
              judgedYourChampClicked={post.judgedYourChampClicked}
            />
          )}
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
  white-space: pre-wrap;

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

const ResultSummaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const AiFeedbackAnswer = styled.div`
  margin: auto;
  border-radius: 20px;
  color: white;
  padding: 20px;
  line-height: 1.8;
  display: flex;
  text-align: justify;
  white-space: pre-wrap;
  align-items: center;
`;

const ResultSummaryTime = styled.div`
  display: flex;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #121212;
  border: solid 1px #424242;
`;

const ResultVSWrapper = styled.div`
  font-size: 30px;
`;

const UserMatchingDataBox = styled.button`
  width: 150px;
  height: 240px;
  background-color: #3f3f3f;
  border: solid 1px ${(index) => (index.isGameSelected ? "red" : "#a7a7a7")};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  @media (max-width: 673px) {
    margin-top: 20px;
  }
`;

const UserMatchingDataImg = styled.div`
  width: 90px;
  height: 90px;
  border: solid 1px #a7a7a7;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const UserMatchingDataName = styled.div`
  margin: 5px;
  text-align: center;
`;

const UserMatchingDataInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
