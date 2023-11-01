import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Halqa, Maqam } from "./pages";

function App() {
  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Halqa />} />
          <Route path="/maqam" element={<Maqam />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
