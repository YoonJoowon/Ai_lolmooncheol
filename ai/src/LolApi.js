import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";

const LolApi = () => {
  const api_key =
    "RGAPI-a334caab-5c50-4954-a58b-7253fe84879eRGAPI-a334caab-5c50-4954-a58b-7253fe84879e";
  const summonerName = "쏘이이";

  const url = `https://asia.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;

  const headers = {
    "X-Riot-Token": api_key,
  };
  const [summonerInfo, setSummonerInfo] = useState(null);

  useEffect(() => {
    fetch(url, { headers })
      .then((response) => response.json())
      .then((data) => {
        setSummonerInfo(data);
      })
      .catch((error) => {
        console.error("API 호출에 실패하였습니다.", error);
      });
  }, [url, headers]);

  return (
    <div>
      {summonerInfo ? (
        <div>
          <h1>{summonerInfo.name}</h1>
          <p>Level: {summonerInfo.summonerLevel}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default LolApi;