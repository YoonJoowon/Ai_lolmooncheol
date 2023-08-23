import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import EnterSituationTime from "./EnterSituationTime";
import { StartAskingNextState, nickNameInputState } from "../store/Recoil";
import { useRecoilValue } from "recoil";
import lolMatchInfoData from "../dummy/lolMatchInfoData.json";
import TypingAnimation from "./TypingAnimation";
import axios from "axios";

const ChatUserInfo = () => {
  const nickNameInput = useRecoilValue(nickNameInputState);
  const [showUserDataStart, setShowUserDataStart] = useState();
  const [showUserData, setShowUserData] = useState(false);
  const [showNextTeamData, setShowNextTeamData] = useState(false);
  const [showNextWhatTime, setShowNextWhatData] = useState(false);
  const [lolAPIData, setLolAPIData] = useState({ matchDetails: [] });
  const API_KEY = process.env.REACT_APP_LOL_API_KEY;

  // name input
  const [summonerName, setSummonerName] = useState(""); // 초기값 설정

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
          setShowUserData(true);
          setLolAPIData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowUserData(false);
      setShowUserDataStart(true);
    }
    console.log("lolAPIData", lolAPIData);
  }, [nickNameInput]);

  const nextTeamData = () => {
    handleScroll();
    setShowNextTeamData(true);
  };

  const nextWhatTimeData = () => {
    handleScroll();
    setShowNextWhatData(true);
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
  }, [nickNameInput, showNextTeamData, showNextWhatTime]);

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
              {lolAPIData &&
                lolAPIData.matchDetails.map((champion, index) => (
                  <UserMatchingDataBox key={index} onClick={nextTeamData}>
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

      {showNextTeamData && (
        <UserMatchingData>
          <UserMatchingDataGuide>
            <TypingAnimation text="분쟁이 일어났던 아군을 선택해주세요." />
          </UserMatchingDataGuide>
          {lolMatchInfoData.map((champion, index) => (
            <UserMatchingDataBox key={index} onClick={nextWhatTimeData}>
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
      )}

      {showNextWhatTime && <EnterSituationTime />}
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
