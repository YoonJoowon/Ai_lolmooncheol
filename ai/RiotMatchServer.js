const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

const API_KEY = process.env.REACT_APP_LOL_API_KEY;
const baseUrl = 'https://KR.api.riotgames.com/lol';
const baseUrl2 = 'https://asia.api.riotgames.com/lol';

app.use(cors());
app.use(bodyParser.json());

app.listen(8080, function () {
  console.log('listening on 8080');
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

    // Determine the lane the user played
    const lane = participant.lane;

    // Image URL by champion name
    const championImageUrl = `http://ddragon.leagueoflegends.com/cdn/13.15.1/img/champion/${championName}.png`;

    // Get team members of the user's team
    const teamId = participant.teamId;
    const teamMembers = matchData.info.participants.filter(participant => participant.teamId === teamId);

    // Extract information for team members
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

app.post('/summoner', async function (req, res) {
  const summonerName = req.body.name;

  try {
    // Get summoner information
    const summonerResponse = await axios.get(`${baseUrl}/summoner/v4/summoners/by-name/${summonerName}`, {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    });

    const puuid = summonerResponse.data.puuid;

    try {
      // Get the last 4 match IDs
      const matchResponse = await axios.get(`${baseUrl2}/match/v5/matches/by-puuid/${puuid}/ids`, {
        headers: {
          'X-Riot-Token': API_KEY,
        },
      });

      // Last 4 matches
      const matchIds = matchResponse.data.slice(0, 4);

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