require("dotenv").config();
const API_KEY = process.env.LOL_API_KEY;
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const baseUrl = 'https://KR.api.riotgames.com/lol';
const baseUrl2 = 'https://asia.api.riotgames.com/lol';

app.use(cors());
app.use(bodyParser.json());

app.listen(8080, function () {
  console.log('소환사의 협곡에 오신 것을 환영합니다');
});

// matchId 추출
app.post('/summoner', async function (req, res) {
  const summonerName = req.body.name;
  // console.log(summonerName)

  try {
    // Get summoner information
    const summonerResponse = await axios.get(`${baseUrl}/summoner/v4/summoners/by-name/${summonerName}`, {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    });

    const puuid = summonerResponse.data.puuid;
    console.log(puuid)

    try {
      // 최근 4개 경기
      const matchResponse = await axios.get(`${baseUrl2}/match/v5/matches/by-puuid/${puuid}/ids`, {
        headers: {
          'X-Riot-Token': API_KEY,
        },
      });

      const matchIds = matchResponse.data.slice(0, 4);
      console.log(matchIds)

      // Retrieve details for each match
      const matchDetails = await Promise.all(matchIds.map(matchId => getMatchDetails(matchId, puuid)));

      res.json({ matchDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


async function getMatchDetails(matchId, puuid) {
  try {
    const matchResponse = await axios.get(`${baseUrl2}/match/v5/matches/${matchId}`, {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    });

    const matchData = matchResponse.data;

    // Find the participant with the given puuid
    const participant = matchData.info.participants.find(participant => participant.puuid === puuid);

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
    const teamMembers = matchData.info.participants.filter(participant => participant.teamId === teamId);

    const teamMemberInfo = teamMembers.map(teamMember => ({
      championName: teamMember.championName,
      championImageUrl: `http://ddragon.leagueoflegends.com/cdn/13.15.1/img/champion/${teamMember.championName}.png`,
      kills: teamMember.kills,
      deaths: teamMember.deaths,
      assists: teamMember.assists,
      lane: teamMember.lane,
    }));

    return { championName, championImageUrl, kills, deaths, assists, win, lane, teamMembers: teamMemberInfo };
  } catch (error) {
    console.error(error);
    return null;
  }
}



app.use(bodyParser.urlencoded({ extended: true }));


// 특정 시간에 대한 매치 타임라인 데이터를 가져오는 함수.
async function getMatchTimeline(matchId2, specificTime) {
  try {
    // 특정 시간에 대한 타임스탬프를 계산합니다. (밀리초 단위)
    const timestamp = (specificTime.minute * 60 + specificTime.second) * 1000;

    console.log(timestamp)

    // 매치 타임라인 데이터를 가져옵니다.
    const response = await axios.get(`${baseUrl2}/match/v5/matches/${matchId2}/timeline`, {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    
    }
    );
    console.log(response,"----------------")
    
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
      console.log('해당 시간에 대한 정보를 찾을 수 없습니다.');
      return null;
    }

    const summoner1Data = frames[frameIndex].participantFrames[0];
    const summoner2Data = frames[frameIndex].participantFrames[1];

    // 위치 정보를 포함하여 원하는 정보를 추출합니다.
    const summoner1Info = {
      kills: summoner1Data.kills,
      deaths: summoner1Data.deaths,
      assists: summoner1Data.assists,
      position: summoner1Data.position,
      level: summoner1Data.level,
      currentGold: summoner1Data.currentGold,
      totalGold: summoner1Data.totalGold,
    };

    const summoner2Info = {
      kills: summoner2Data.kills,
      deaths: summoner2Data.deaths,
      assists: summoner2Data.assists,
      position: summoner2Data.position,
      level: summoner2Data.level,
      currentGold: summoner2Data.currentGold,
      totalGold: summoner2Data.totalGold,
    };

    return { summoner1: summoner1Info, summoner2: summoner2Info };
  } catch (error) {
    console.error('타임라인 데이터 오류', error.message);
    throw error;
  }
}

// 입력 값을 받고 특정 시간에 대한 매치 타임라인 데이터를 가져오는 라우트를 정의합니다.
app.post('/fetchMatchTimeline', async (req, res) => {
  const matchId2 = req.body.matchId;
  const specificTime = req.body.specificTime;

  try {
    const timelineData = await getMatchTimeline(matchId2, specificTime);
    res.json(timelineData);
  } catch (error) {
    res.status(500).json({ error: '매치 타임라인 데이터를 가져오는 중 오류 발생' });
  }
});
