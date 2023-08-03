import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chatting from "./pages/Chatting";
import AiAnswer from "./pages/AiAnswer";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/Chatting" element={<Chatting />} />
          <Route path="/AiAnswer" element={<AiAnswer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;