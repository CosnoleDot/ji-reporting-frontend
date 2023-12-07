import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Forget } from "./pages/Forget";
import { Dashboard } from "./pages/Dashboard";
import { ChangePassword } from "./pages/ChangePassword";
import { Toast } from "./components/Toast";
import { Comparision } from "./pages/Comparision";
import { ReportChart } from "./components/ReportChart";
import { Signup } from "./pages/Signup";
import { Reports } from "./pages/Reports";
import {
  Division,
  EditProfile,
  Halqa,
  Locations,
  Maqam,
  Province,
} from "./pages";

function App() {
  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/reset-password" element={<Forget />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="/comparison" element={<Comparision />} />
          <Route path="/chart" element={<ReportChart />} />
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/reports/create"
            element={
              localStorage.getItem("@type") === "maqam" ? (
                <Maqam />
              ) : localStorage.getItem("@type") === "division" ? (
                <Division />
              ) : (
                <Halqa />
              )
            }
          />
          <Route
            path="/reports/edit/:id"
            element={
              localStorage.getItem("@type") === "maqam" ? (
                <Maqam />
              ) : localStorage.getItem("@type") === "division" ? (
                <Division />
              ) : (
                <Halqa />
              )
            }
          />
          <Route
            path={
              localStorage.getItem("@type") !== "province"
                ? "/reports/view/:id"
                : "/reports/view/date/:date"
            }
            element={
              localStorage.getItem("@type") === "maqam" ? (
                <Maqam />
              ) : localStorage.getItem("@type") === "division" ? (
                <Division />
              ) : localStorage.getItem("@type") === "province" ? (
                <Province />
              ) : (
                <Halqa />
              )
            }
          />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </BrowserRouter>
      <Toast />
    </div>
  );
}

export default App;
