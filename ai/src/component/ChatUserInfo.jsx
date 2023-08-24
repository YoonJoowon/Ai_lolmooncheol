import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import EnterSituationTime from "./EnterSituationTime";
import {
  nickNameInputState,
  matchDataState,
  lolTeamMemberDataState,
  matchTimelineDataState,
  timeState,
} from "../store/Recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import TypingAnimation from "./TypingAnimation";
import axios from "axios";

const ChatUserInfo = () => {
  const nickNameInput = useRecoilValue(nickNameInputState);
  const [showUserDataStart, setShowUserDataStart] = useState();
  const [showUserData, setShowUserData] = useState(false);
  const [showTeamData, setShowTeamData] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [matchData, setMatchData] = useRecoilState(matchDataState);
  const [lolTeamMemberData, setLolTeamMemberData] = useRecoilState(
    lolTeamMemberDataState
  );
  const [matchTimelineData, setMatchTimelineData] = useRecoilState(
    matchTimelineDataState
  );
  const eventTime = useRecoilValue(timeState);
  const API_KEY = process.env.REACT_APP_LOL_API_KEY;

  // 소환사 명 post와 매치데이터 get
  useEffect(() => {
    if (nickNameInput) {
      setShowUserDataStart(true);
      console.log(nickNameInput);
      // 서버로 요청 보내는 부분
      const data = { name: nickNameInput };
      axios
        .post("http://localhost:8080/summoner", data, {
          "X-Riot-Token": API_KEY,
        })
        .then((response) => {
          console.log(response.data);
          if (Array.isArray(response.data) && response.data.length === 0) {
            setShowUserData(false);
          } else {
            setShowUserData(true);
            setMatchData(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowUserData(false);
      setShowUserDataStart(true);
    }
  }, [nickNameInput, eventTime]);

  // 어떤 게임을 선택했는지 index를 post
  const selectGame = (index) => {
    handleScroll();
    const selectedGame = matchData.matchDetails[index];
    axios
      .post("http://localhost:8080/summoner", selectedGame.puuID)
      .then((response) => {
        console.log("Post successful:", selectedGame.teamMembers);
        setLolTeamMemberData(selectedGame.teamMembers);
        setMatchTimelineData((prevState) => ({
          ...prevState,
          myPuuID: matchData.matchDetails[index].puuID,
          matchID: matchData.matchDetails[index].matchID,
        }));
        console.log("selectGame", matchTimelineData);
        setShowTeamData(true);
      })
      .catch((error) => {
        console.error("Error posting:", error);
        // 에러 처리 로직을 추가할 수 있습니다.
      });
  };

  const selectTeam = (index) => {
    handleScroll();
    setShowTime(true);
    setMatchTimelineData((prevState) => ({
      ...prevState,
      yourPuuID: lolTeamMemberData[index].memberPuuID,
    }));
    console.log("selectTeam", matchTimelineData); // 확인을 위한 로그
  };

  // scroll
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    handleScroll();
  }, [nickNameInput, showTeamData, showTime]);

  return (
    <ChatUserInfoStyle>
      {showUserDataStart && nickNameInput && (
        <>
          {nickNameInput && (
            <ChatUserStyle>
              <p>{nickNameInput}</p>
            </ChatUserStyle>
          )}

          {showUserData ? (
            <UserMatchingData>
              <UserMatchingDataGuide>
                <TypingAnimation text="판결을 원하는 게임을 선택해주세요." />
              </UserMatchingDataGuide>
              {matchData &&
                matchData.matchDetails.map((champion, index) => (
                  <UserMatchingDataBox
                    key={index}
                    onClick={() => selectGame(index)}
                  >
                    <UserMatchingDataImg>
                      <img
                        src={champion.championImageUrl}
                        alt={champion.championName}
                        style={{ width: "60px" }}
                      />
                    </UserMatchingDataImg>
                    <UserMatchingDataName>
                      {champion.championName}
                      <UserMatchingDataKda>
                        {champion.kills}/{champion.deaths}/{champion.assists}
                      </UserMatchingDataKda>
                    </UserMatchingDataName>
                  </UserMatchingDataBox>
                ))}
            </UserMatchingData>
          ) : (
            <UserMatchingDataFale>
              <TypingAnimation
                text="등록되지 않은 소환사입니다.
                다시 입력해주세요."
              />
            </UserMatchingDataFale>
          )}
        </>
      )}

      {showTeamData && (
        <UserMatchingData>
          <UserMatchingDataGuide>
            <TypingAnimation text="분쟁이 일어났던 아군을 선택해주세요." />
          </UserMatchingDataGuide>
          {lolTeamMemberData.map(
            (champion, index) =>
              index <= 3 && (
                <UserMatchingDataBox
                  key={index}
                  onClick={() => {
                    selectTeam(index);
                  }}
                >
                  <UserMatchingDataImg>
                    <img
                      src={champion.championImageUrl}
                      alt={champion.championName}
                      style={{ width: "60px" }}
                    />
                  </UserMatchingDataImg>
                  <UserMatchingDataName>
                    {champion.championName}
                    <UserMatchingDataKda>
                      {champion.kills}/{champion.deaths}/{champion.assists}
                    </UserMatchingDataKda>
                  </UserMatchingDataName>
                </UserMatchingDataBox>
              )
          )}
        </UserMatchingData>
      )}

      {showTime && <EnterSituationTime />}
      <div ref={scrollContainerRef}></div>
    </ChatUserInfoStyle>
  );
};

export default ChatUserInfo;

const ChatUserInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserMatchingData = styled.div`
  border: solid 1px #a7a7a7;
  padding: 18px;
  padding-top: 50px;
  color: white;
  margin-left: 23px;
  margin-top: 20px;
  min-width: 570px;
  max-width: 570px;
  max-height: 100%;
  border-radius: 20px;
  line-height: 1.6;
  background-color: #3f3f3f;
  display: flex;
  position: relative;
`;

const UserMatchingDataGuide = styled.div`
  position: absolute;
  top: 5px;
  padding: 10px;
  font-size: 14px;
`;

const UserMatchingDataFale = styled.div`
  border: solid 1px #a7a7a7;
  padding: 20px;
  color: #ffffff;
  margin-left: 23px;
  margin-top: 20px;
  width: 300px;
  max-width: 500px;
  min-height: 30px;
  max-height: 100%;
  border-radius: 20px;
  line-height: 1.6;
  background-color: #3f3f3f;
`;

const UserMatchingDataBox = styled.button`
  width: 130px;
  height: 170px;
  border: solid 1px #a7a7a7;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-right: 20px;
  cursor: pointer;
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

const UserMatchingDataKda = styled.div``;

const ChatUserStyle = styled.div`
  border: solid 1px #0ac8b9;
  padding: 20px;
  color: white;
  margin-left: 300px;
  margin-top: 20px;
  width: 300px;
  max-width: 500px;
  min-height: 30px;
  max-height: 100%;
  border-radius: 20px;
  line-height: 1.6;
  background-color: #0a323c;
  white-space: pre-line;
`;
