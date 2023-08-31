require("dotenv").config();
const API_KEY = process.env.LOL_API_KEY;
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const baseUrl = "https://KR.api.riotgames.com/lol";
const baseUrl2 = "https://asia.api.riotgames.com/lol";
const MongoClient = require('mongodb').MongoClient;
const MongoConnect = process.env.MONGO_DB_CONNECT;

app.use(express.urlencoded({ extended: true}));

// let db;
// MongoClient.connect(MongoConnect,
//   { useUnifiedTopology: true }, function(error, client) {
//     if (error) return console.log(error)

//     db = client.db('aimoon');

//     app.post("/judgedContent", function (req, res) {
//       db.collection('post').insertOne( req.body )

//       const result = db.collection('post').find({}).toArray();
//       res.json(result);
//     })
//   })

(async () => {
  try {
    const client = await MongoClient.connect(MongoConnect, {
      useUnifiedTopology: true,
    });
    const db = client.db('aimoon');

    app.post('/judgedContent', async (req, res) => {
      try {
        // insertOne 작업이 완료될 때까지 기다립니다.
        await db.collection('testPost').insertOne(req.body);
       
        res.redirect(301, '/jurorContent');
      } catch (error) {
        console.error(error);
        res.status(500).send('내부 서버 오류');
      }
    });

    app.get('/jurorContent', async (req, res) => {
      try {
        // 컬렉션에서 모든 데이터를 검색합니다.
        const result = await db.collection('testPost').find({}).toArray();
    
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('DB 조회 오류');
      }
    })

  } catch (error) {
    console.error(error);
  }
})();

app.use(cors());
app.use(bodyParser.json());


app.listen(8080, function () {
  console.log("소환사의 협곡에 오신 것을 환영합니다");
});

// matchId 추출
app.post("/summoner", async function (req, res) {
  const summonerName = req.body.name;
  

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

    const lineTranslation = {
      TOP: "탑",
      JUNGLE: "정글",
      MIDDLE: "미드",
      BOTTOM: "바텀"
    };

    const kills = participant.kills;
    const deaths = participant.deaths;
    const assists = participant.assists;
    const championName = participant.championName;
    const win = participant.win;
    const lane = participant.lane;
    const mylane = lineTranslation[participant.lane];

    // 챔피언 이미지
    const championImageUrl = `http://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${championName}.png`;

    // 챔피언 이름 한글번역
    const EngToKoR = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/13.16.1/data/ko_KR/champion/${championName}.json`
    );

    const championNameKR = EngToKoR.data.data[championName].name;

    const championNameTranslation = {
      Aatrox: "아트록스",
      Ahri: "아리",
      Akali: "아칼리",
      Akshan: "아크샨",
      Alistar: "알리스타",
      Amumu: "아무무",
      Anivia: "애니비아",
      Annie: "애니",
      Aphelios: "아펠리오스",
      Ashe: "애쉬",
      AurelionSol: "아우렐리온 솔",
      Azir: "아지르",
      Bard: "바드",
      Belveth: "벨베스",
      Blitzcrank: "블리츠크랭크",
      Brand: "브랜드",
      Braum: "브라움",
      Caitlyn: "케이틀린",
      Camille: "카밀",
      Cassiopeia: "카시오페아",
      Chogath: "초가스",
      Corki: "코르키",
      Darius: "다리우스",
      Diana: "다이애나",
      Draven: "드레이븐",
      DrMudo: "문도박사",
      Ekko: "에코",
      Elise: "엘리스",
      Evelynn: "이블린",
      Ezreal: "이즈리얼",
      Fiddlesticks: "피들스틱",
      Fiora: "피오라",
      Fizz: "피즈",
      Galio: "갈리오",
      Gangplank: "갱플랭크",
      Garen: "가렌",
      Gnar: "나르",
      Gragas: "그라가스",
      Graves: "그레이브즈",
      Gwen: "그웬",
      Hecarim: "헤카림",
      Heimerdinger: "하이머딩거",
      Illaoi: "일라오이",
      Irelia: "이렐리아",
      Ivern: "아이번",
      Janna: "잔나",
      JarvanIV: "자르반 4세",
      Jax: "잭스",
      Jayce: "제이스",
      Jhin: "진",
      Jinx: "징크스",
      Kaisa: "카이사",
      Kalista: "칼리스타",
      Karma: "카르마",
      Karthus: "카서스",
      Kassadin: "카사딘",
      Katarina: "카타리나",
      Kayle: "케일",
      Kayn: "케인",
      Kennen: "케넨",
      Khazix: "카직스",
      Kindred: "킨드레드",
      Kled: "클레드",
      KogMaw: "코그모",
      KSante: "크산테",
      Leblanc: "르블랑",
      LeeSin: "리 신",
      Leona: "레오나",
      Lillia: "릴리아",
      Lissandra: "리산드라",
      Lucian: "루시안",
      Lulu: "룰루",
      Lux: "럭스",
      Malphite: "말파이트",
      Malzahar: "말자하",
      Maokai: "마오카이",
      MasterYi: "마스터 이",
      Milio: "밀리오",
      MissFortune: "미스 포츈",
      MonkeyKing: "오공",
      Mordekaiser: "모데카이저",
      Morgana: "모르가나",
      Naafiri: "나피리",
      Nami: "나미",
      Nasus: "나서스",
      Nautilus: "노틸러스",
      Neeko: "니코",
      Nidalee: "니달리",
      Nilah: "닐라",
      Nocturne: "녹턴",
      Nunu: "누누",
      Olaf: "올라프",
      Orianna: "오리아나",
      Ornn: "오른",
      Pantheon: "판테온",
      Poppy: "뽀삐",
      Pyke: "파이크",
      Qiyana: "키아나",
      Quinn: "퀸",
      Rakan: "라칸",
      Rammus: "람머스",
      RekSai: "렉사이",
      Rell: "렐",
      Renata: "레나타",
      Renekton: "레넥톤",
      Rengar: "렝가",
      Riven: "리븐",
      Rumble: "럼블",
      Ryze: "라이즈",
      Samira: "사미라",
      Sejuani: "세주아니",
      Senna: "세나",
      Seraphine: "세라핀",
      Sett: "세트",
      Shaco: "샤코",
      Shen: "쉔",
      Shyvana: "쉬바나",
      Singed: "신지드",
      Sion: "사이온",
      Sivir: "시비르",
      Skarner: "스카너",
      Sona: "소나",
      Soraka: "소라카",
      Swain: "스웨인",
      Sylas: "사일러스",
      Syndra: "신드라",
      TahmKench: "탐 켄치",
      Taliyah: "탈리야",
      Talon: "탈론",
      Taric: "타릭",
      Teemo: "티모",
      Thresh: "쓰레쉬",
      Tristana: "트리스타나",
      Trundle: "트런들",
      Tryndamere: "트린다미어",
      TwistedFate: "트위스티드 페이트",
      Twitch: "트위치",
      Udyr: "우디르",
      Urgot: "우르곳",
      Varus: "바루스",
      Vayne: "베인",
      Veigar: "베이가",
      Velkoz: "벨코즈",
      Vex: "벡스",
      Vi: "바이",
      Viego: "비에고",
      Viktor: "빅토르",
      Vladimir: "블라디미르",
      Volibear: "볼리베어",
      Warwick: "워윅",
      Xayah: "자야",
      Xerath: "제라스",
      XinZhao: "신 짜오",
      Yasuo: "야스오",
      Yone: "요네",
      Yorick: "요릭",
      Yuumi: "유미",
      Zac: "자크",
      Zed: "제드",
      Zeri: "제리",
      Ziggs: "직스",
      Zilean: "질리언",
      Zoe: "조이",
      Zyra: "자이라",
    };


    // 팀원
    const teamId = participant.teamId;

    const teamMembers = matchData.info.participants
      .filter(
        (teamMember) =>
          teamMember.teamId === teamId && teamMember.puuid !== puuid
      )

      .map((teamMember) => {
        const teamchampionNameKR =
          championNameTranslation[teamMember.championName] ||
          teamMember.championName;

        return {
          championNameKR: teamchampionNameKR,
          championName: teamMember.championName,
          championImageUrl: `http://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${teamMember.championName}.png`,
          kills: teamMember.kills,
          deaths: teamMember.deaths,
          assists: teamMember.assists,
          lane: lineTranslation[teamMember.lane],
          memberPuuid: teamMember.puuid,
        };
      });

    return {
      championNameKR,
      championName,
      championImageUrl,
      kills,
      deaths,
      assists,
      win,
      mylane,
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
      healthMax: summoner1Data.championStats.healthMax,
      currentGold: summoner1Data.currentGold,
      totalGold: summoner1Data.totalGold,
      position: summoner1Data.position,
      
    };

    const summoner2Info = {
      level: summoner2Data.level,
      health: summoner2Data.championStats.health,
      healthMax: summoner2Data.championStats.healthMax,
      currentGold: summoner2Data.currentGold,
      totalGold: summoner2Data.totalGold,
      position: summoner2Data.position,
      
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

    

    const myTeamInfo = {
      totalGold: team1TotalGold,
      AvgLevel: team1AvgLevel / 5,
    };

    const yourTeamInfo = {
      totalGold: team2TotalGold,
      AvgLevel: team2AvgLevel / 5,
    };
    
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
