require("dotenv").config();
const API_KEY = process.env.LOL_API_KEY;
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const baseUrl = "https://KR.api.riotgames.com/lol";
const baseUrl2 = "https://asia.api.riotgames.com/lol";

app.use(cors());
app.use(bodyParser.json());

app.listen(8080, function () {
  console.log("소환사의 협곡에 오신 것을 환영합니다");
});

// matchId 추출
app.post("/summoner", async function (req, res) {
  const summonerName = req.body.name;
  // console.log(summonerName)

  try {
    // Get summoner information
    const summonerResponse = await axios.get(
      `${baseUrl}/summoner/v4/summoners/by-name/${summonerName}`,
      {
        headers: {
          "X-Riot-Token": API_KEY,
        },
      }
    );

    const puuid = summonerResponse.data.puuid;
    console.log(puuid);

    try {
      // 최근 4개 경기
      const matchResponse = await axios.get(
        `${baseUrl2}/match/v5/matches/by-puuid/${puuid}/ids`,
        {
          headers: {
            "X-Riot-Token": API_KEY,
          },
        }
      );

      const matchIds = matchResponse.data.slice(0, 4);
      console.log(matchIds);

      // Retrieve details for each match
      const matchDetails = await Promise.all(
        matchIds.map((matchId) => getMatchDetails(matchId, puuid))
      );

      res.json({ matchDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

async function getMatchDetails(matchId, puuid) {
  try {
    const matchResponse = await axios.get(
      `${baseUrl2}/match/v5/matches/${matchId}`,
      {
        headers: {
          "X-Riot-Token": API_KEY,
        },
      }
    );

    const matchData = matchResponse.data;

    // puuid를 통해 팀원 찾기
    const participant = matchData.info.participants.find(
      (participant) => participant.puuid === puuid
    );

    if (!participant) {
      return null; // Participant not found, handle this case
    }

    const kills = participant.kills;
    const deaths = participant.deaths;
    const assists = participant.assists;
    const championName = participant.championName;
    const win = participant.win;
    const lane = participant.lane;

    // 챔피언 이미지
    const championImageUrl = `http://ddragon.leagueoflegends.com/cdn/13.15.1/img/champion/${championName}.png`;

    // 챔피언 이름 한글번역
    const championNameKR = "http://ddragon.leagueoflegends.com/cdn/13.16.1/";

    // 팀원
    const teamId = participant.teamId;

    const teamMembers = matchData.info.participants
      .filter(
        (teamMember) =>
          teamMember.teamId === teamId && teamMember.puuid !== puuid
      )
      .map((teamMember) => ({
        championName: teamMember.championName,
        championImageUrl: `http://ddragon.leagueoflegends.com/cdn/13.15.1/img/champion/${teamMember.championName}.png`,
        kills: teamMember.kills,
        deaths: teamMember.deaths,
        assists: teamMember.assists,
        lane: teamMember.lane,
        memberPuuid: teamMember.puuid,
      }));

    return {
      championName,
      championImageUrl,
      kills,
      deaths,
      assists,
      win,
      lane,
      puuid,
      matchId,
      teamMembers,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

app.use(bodyParser.urlencoded({ extended: true }));

// 특정 시간에 대한 매치 타임라인 데이터를 가져오는 함수.
async function getMatchTimeline(myPuuId, yourPuuId, matchId, specificTime) {
  try {
    // 특정 시간에 대한 타임스탬프를 계산합니다. (밀리초 단위)
    const timestamp = (specificTime.minute * 60 + specificTime.second) * 1000;

    console.log(timestamp);

    // 매치 타임라인 데이터를 가져옵니다.
    const response = await axios.get(
      `${baseUrl2}/match/v5/matches/${matchId}/timeline`,
      {
        headers: {
          "X-Riot-Token": API_KEY,
        },
      }
    );

    // 특정 시간에 대한 두 소환사의 관련 데이터를 추출합니다.
    const timelineData = response.data;
    const frames = timelineData.info.frames;

    // 특정 시간에 해당하는 프레임을 찾습니다.
    let frameIndex = -1;
    for (let i = 0; i < frames.length; i++) {
      if (frames[i].timestamp >= timestamp) {
        frameIndex = i;
        break;
      }
    }

    if (frameIndex === -1) {
      console.log("해당 시간에 대한 정보를 찾을 수 없습니다.");
      return null;
    }

    // 입력된 puuid를 통해 participantId 매칭
    let myId = -1;
    for (let p = 0; p <= 10; p++) {
      if (myPuuId === timelineData.info.participants[p].puuid) {
        myId = p + 1;
        break;
      }
    }

    let yourId = -1;
    for (let q = 0; q <= 10; q++) {
      if (yourPuuId === timelineData.info.participants[q].puuid) {
        yourId = q + 1;
        break;
      }
    }

    // 시간 양식 재설정
    const time = specificTime.minute + "분 " + specificTime.second + "초";

    // 두 챔피언 선택
    const summoner1Data = frames[frameIndex].participantFrames[myId];
    const summoner2Data = frames[frameIndex].participantFrames[yourId];

    // 개인 필요정보 추출
    const summoner1Info = {
      level: summoner1Data.level,
      health: summoner1Data.championStats.health,
      currentGold: summoner1Data.currentGold,
      totalGold: summoner1Data.totalGold,
    };

    const summoner2Info = {
      level: summoner2Data.level,
      health: summoner2Data.championStats.health,
      currentGold: summoner2Data.currentGold,
      totalGold: summoner2Data.totalGold,
    };

    // 팀 필요정보 추출

    let team1TotalGold = 0;
    let team2TotalGold = 0;

    for (let j = 1; j <= 5; j++) {
      team1TotalGold += frames[frameIndex].participantFrames[j].totalGold;
    }

    for (let k = 6; k <= 10; k++) {
      team2TotalGold += frames[frameIndex].participantFrames[k].totalGold;
    }

    let team1AvgLevel = 0;
    let team2AvgLevel = 0;

    for (let m = 1; m <= 5; m++) {
      team1AvgLevel += frames[frameIndex].participantFrames[m].level;
    }

    for (let n = 6; n <= 10; n++) {
      team2AvgLevel += frames[frameIndex].participantFrames[n].level;
    }

    console.log(team1TotalGold);

    const myTeamInfo = {
      totalGold: team1TotalGold,
      AvgLevel: team1AvgLevel / 5,
    };

    const yourTeamInfo = {
      totalGold: team2TotalGold,
      AvgLevel: team2AvgLevel / 5,
    };
    console.log({
      time: time,
      myData: summoner1Info,
      teamData: summoner2Info,
      myTeamInfo: myTeamInfo,
      yourTeamInfo: yourTeamInfo,
    });
    return {
      time: time,
      myData: summoner1Info,
      teamData: summoner2Info,
      myTeamInfo: myTeamInfo,
      yourTeamInfo: yourTeamInfo,
    };
  } catch (error) {
    console.error("타임라인 데이터 오류", error.message);
    throw error;
  }
}

// 입력 값을 받고 특정 시간에 대한 매치 타임라인 데이터를 가져오는 라우트를 정의합니다.

app.post("/fetchMatchTimeline", async (req, res) => {
  const myPuuid = req.body.myPuuId;
  const yourPuuid = req.body.yourPuuId;
  const matchId = req.body.matchId;

  const specificTime = req.body.specificTime;

  try {
    const timelineData = await getMatchTimeline(
      myPuuid,
      yourPuuid,
      matchId,
      specificTime
    );
    res.json(timelineData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "매치 타임라인 데이터를 가져오는 중 오류 발생" });
  }
});
