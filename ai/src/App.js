import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import GptApi from "./GptApi";
import LolApi from "./LolApi";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<GptApi />} /> */}
          <Route path="/LolApi" element={<LolApi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;