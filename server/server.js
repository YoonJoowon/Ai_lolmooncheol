const API_KEY = process.env.REACT_APP_LOL_API_KEY;
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
  console.log(summonerName);

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

    // Find the participant with the given puuid
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

    // 팀원
    const teamId = participant.teamId;
    const teamMembers = matchData.info.participants.filter(
      (participant) => participant.teamId === teamId
    );

    const teamMemberInfo = teamMembers.map((teamMember) => ({
      championName: teamMember.championName,
      championImageUrl: `http://ddragon.leagueoflegends.com/cdn/13.15.1/img/champion/${teamMember.championName}.png`,
      kills: teamMember.kills,
      deaths: teamMember.deaths,
      assists: teamMember.assists,
      lane: teamMember.lane,
    }));

    return {
      championName,
      championImageUrl,
      kills,
      deaths,
      assists,
      win,
      lane,
      teamMembers: teamMemberInfo,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
