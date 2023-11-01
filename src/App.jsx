import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Division, Halqa, Home, Maqam } from "./pages";

function App() {
  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/halqa" element={<Halqa />} />
          <Route path="/maqam" element={<Maqam />} />
          <Route path="/division" element={<Division />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
