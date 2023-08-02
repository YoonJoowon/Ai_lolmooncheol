import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import GptApi from "./pages/Chatting";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chatting from "./pages/Chatting";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/Chatting" element={<Chatting />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;