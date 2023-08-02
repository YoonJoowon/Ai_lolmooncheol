const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const api_key = "RGAPI-38cbe536-9f40-459a-afe8-4b084abae9c3";
const url = "https://kr.api.riotgames.com";

app.use(cors());

app.get("/lol/summoner/:summonerName", async (req, res) => {
  const summonerName = req.params.summonerName;
  const request_header = {
    "X-Riot-Token": api_key,
  };

  try {
    const response = await axios.get(
      `${url}/lol/summoner/v4/summoners/by-name/${summonerName}`,
      { headers: request_header }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(error.response?.status || 500)
      .json({ error: "An error occurred" });
  }
});

const port = 3001; // 또는 다른 포트 번호로 변경 가능
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
