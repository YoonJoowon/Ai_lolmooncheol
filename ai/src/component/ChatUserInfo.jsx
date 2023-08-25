import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import EnterSituationTime from "./EnterSituationTime";
import {
  nickNameInputState,
  matchDataState,
  lolTeamMemberDataState,
  matchTimelineDataState,
  timeState,
  promptDataState,
} from "../store/Recoil";
import { useRecoilValue, useRecoilState } from "recoil";
import TypingAnimation from "./TypingAnimation";
import axios from "axios";

const ChatUserInfo = () => {
  const [nickNameInput, setNickNameInput] = useRecoilState(nickNameInputState);
  const [showUserDataStart, setShowUserDataStart] = useState();
  const [showUserData, setShowUserData] = useState(false);
  const [showTeamData, setShowTeamData] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [selectedGameIndex, setSelectedGameIndex] = useState(null);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(null);
  const [matchData, setMatchData] = useRecoilState(matchDataState);
  const [lolTeamMemberData, setLolTeamMemberData] = useRecoilState(
    lolTeamMemberDataState
  );
  const [matchTimelineData, setMatchTimelineData] = useRecoilState(
    matchTimelineDataState
  );
  const [promptData, setPromptData] = useRecoilState(promptDataState);
  const eventTime = useRecoilValue(timeState);
  const API_KEY = process.env.REACT_APP_LOL_API_KEY;

  // 첫 화면 들어와서 렌더링 되면 값 초기화
  useEffect(() => {
    setNickNameInput("");
  }, []);
  // 소환사 명 post와 매치데이터 get
  useEffect(() => {
    if (nickNameInput) {
      setShowUserDataStart(true);

      // 서버로 요청 보내는 부분
      const data = { name: nickNameInput };
      axios
        .post("http://localhost:8080/summoner", data, {
          "X-Riot-Token": API_KEY,
        })
        .then((response) => {
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
  }, [nickNameInput]);

  // 어떤 게임을 선택했는지 index를 post
  const selectGame = (index) => {
    handleScroll();
    setSelectedGameIndex(index);
    const selectedGame = matchData.matchDetails[index];
    axios
      .post("http://localhost:8080/summoner", selectedGame.puuid)
      .then((response) => {
        setLolTeamMemberData(selectedGame.teamMembers);
        setMatchTimelineData((prevState) => ({
          ...prevState,
          myPuuId: matchData.matchDetails[index].puuid,
          matchId: matchData.matchDetails[index].matchId,
        }));
        setPromptData((prevState) => ({
          ...prevState,
          myChamp: matchData.matchDetails[index].championNameKR,
        }));
        setShowTeamData(true);
      })
      .catch((error) => {
        console.error("Error posting:", error);
        // 에러 처리 로직을 추가할 수 있습니다.
      });
  };

  const selectTeam = (index) => {
    setSelectedTeamIndex(index);
    handleScroll();
    setShowTime(true);
    setMatchTimelineData((prevState) => ({
      ...prevState,
      yourPuuId: lolTeamMemberData[index].memberPuuid,
    }));
    setPromptData((prevState) => ({
      ...prevState,
      yourChamp: lolTeamMemberData[index].championNameKR,
    }));
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
                    isGameSelected={selectedGameIndex === index}
                  >
                    <UserMatchingDataImg>
                      <img
                        src={champion.championImageUrl}
                        alt={champion.championNameKR}
                        style={{ width: "60px" }}
                      />
                    </UserMatchingDataImg>
                    <UserMatchingDataName>
                      {champion.championNameKR}
                      <UserMatchingDataKda>
                        {champion.kills}/{champion.deaths}/{champion.assists}
                      </UserMatchingDataKda>
                    </UserMatchingDataName>
                  </UserMatchingDataBox>
                ))}
            </UserMatchingData>
          ) : (
            <UserMatchingDataFale>
              <TypingAnimation text="찾는 중입니다..." />
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
                  isGameSelected={selectedTeamIndex === index}
                >
                  <UserMatchingDataImg>
                    <img
                      src={champion.championImageUrl}
                      alt={champion.championNameKR}
                      style={{ width: "60px" }}
                    />
                  </UserMatchingDataImg>
                  <UserMatchingDataName>
                    {champion.championNameKR}
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
  width: 100%;
`;

const ChatUserStyle = styled.div`
  border: solid 1px #0ac8b9;
  padding: 20px;
  color: white;
  margin-top: 20px;
  width: 300px;
  min-height: 30px;
  max-height: 100%;
  border-radius: 20px;
  line-height: 1.6;
  background-color: #0a323c;
  white-space: pre-line;
  align-self: flex-end;
  margin-right: 20px;

  @media (max-width: 673px) {
    width: 40%;
    margin-right: 20px;
  }
`;

const UserMatchingData = styled.div`
  border: solid 1px #a7a7a7;
  padding: 18px;
  padding-top: 50px;
  color: white;
  margin-left: 23px;
  margin-top: 20px;
  max-width: 570px;
  max-height: 100%;
  border-radius: 20px;
  line-height: 1.6;
  background-color: #3f3f3f;
  display: flex;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 2fr);

  @media (max-width: 673px) {
    width: 300px;
    grid-template-columns: repeat(2, 2fr);
  }
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
  border: solid 1px ${(index) => (index.isGameSelected ? "red" : "#a7a7a7")};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-right: 20px;
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

const UserMatchingDataKda = styled.div``;