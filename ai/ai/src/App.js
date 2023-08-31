import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chatting from "./pages/Chatting";
import UserSearch from "./pages/Juror";
import Chatting_copy from "./pages/Chatting_copy"
import Landing from "./pages/Landing";
import Juror from "./pages/Juror";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Juror" element={<Juror />} />
          {/* <Route path="/Chattingcopy" element={<Chatting_copy />} /> */}
          <Route path="/Chatting" element={<Chatting />} />
          {/* <Route path="/UserSearch" element={<UserSearch />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
