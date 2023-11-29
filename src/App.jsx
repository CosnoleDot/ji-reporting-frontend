import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Signup } from "./pages";
import { Toast } from "./components/Toast";
// import {
//   Division,
//   Halqa,
//   Home,
//   Maqam,
//   ResetPassword,
//   SignIn,
//   SignUp,
// } from "./pages";
// import { UserRequests } from "./pages/UserRequests";
// import { UpdateProfile } from "./pages/UpdateProfile";


function App() {
  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/halqa" element={<Halqa />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/maqam" element={<Maqam />} />
          <Route path="/division" element={<Division />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/user-requests" element={<UserRequests />} />
          <Route path="/update-profile" element={<UpdateProfile />} /> */}
        </Routes>
      </BrowserRouter>
      <Toast />
    </div>
  );
}

export default App;
