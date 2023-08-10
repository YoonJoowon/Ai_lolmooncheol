import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chatting from "./pages/Chatting";
import AiAnswer from "./pages/AiAnswer";
import UserSearch from "./pages/UserSearch";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chatting />} />
          <Route path="/AiAnswer" element={<AiAnswer />} />
          {/* <Route path="/UserSearch" element={<UserSearch />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
