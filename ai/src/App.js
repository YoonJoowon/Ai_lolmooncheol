import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chatting from "./pages/Chatting";
import AiAnswer from "./pages/AiAnswer";
import UserSearch from "./pages/UserSearch";
import Chatting_copy from "./pages/Chatting_copy";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chatting />} />
          {/* <Route path="/Chattingcopy" element={<Chatting_copy />} /> */}
          {/* <Route path="/UserSearch" element={<UserSearch />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
