import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import {
  Division,
  Halqa,
  Home,
  Maqam,
  ResetPassword,
  SignIn,
  SignUp,
} from "./pages";
import { UserRequests } from "./pages/UserRequests";

function App() {
  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/halqa" element={<Halqa />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/maqam" element={<Maqam />} />
          <Route path="/division" element={<Division />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/user-requests" element={<UserRequests />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
