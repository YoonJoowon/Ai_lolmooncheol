import React, { useState } from "react";
import axios from "axios";

const LolApi = () => {
  const [data, setData] = useState(null);
  const summonerName = "hideonbush";
  const url = "http://localhost:3001"; // 서버의 주소로 변경

  const makeApiCall = () => {
    axios
      .get(`${url}/lol/summoner/${summonerName}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <button onClick={makeApiCall}>Call Riot Games API</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default LolApi;
