import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
  DeleteUser,
  Division,
  EditProfile,
  Halqa,
  Ilaqa,
  LoadingScreen,
  Locations,
  Maqam,
  PersonalReportsDashboard,
  Province,
} from "./pages";
import { useEffect, useRef, useState } from "react";
import instance from "./api/instrance";
import {
  DistrictContext,
  DivisionContext,
  DivisionReportContext,
  HalqaContext,
  HalqaReportContext,
  IlaqaContext,
  IlaqaReportContext,
  MaqamContext,
  MaqamReportContext,
  MeContext,
  ProvinceContext,
  ProvinceReportContext,
  TehsilContext,
  useToastState,
} from "./context";
import { UIContext } from "./context/ui";
import { DoubleScrollLeftRefresh, Loader, ReportUmeedwar } from "./components";
import { ArkanReport } from "./pages/ArkanReport";
import { ProvinceReport } from "./pages/ProvinceReport";
import { DivisionReport } from "./pages/DivisionReport";
import { MaqamReport } from "./pages/MaqamReport";
import { HalqaReport } from "./pages/HalqaReport";
import { ResetPassword } from "./pages/ResetPassword";

function App() {
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState(null);
  const { dispatch } = useToastState();
  const [provinces, setProvinces] = useState([]);
  const [maqams, setMaqams] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [halqas, setHalqas] = useState([]);
  const [ilaqas, setIlaqas] = useState([]);
  const [nazim, setNazim] = useState([]);
  const [provinceReports, setProvinceReports] = useState([]);
  const [maqamReports, setMaqamReports] = useState([]);
  const [ilaqaReports, setIlaqaReports] = useState([]);
  const [divisionReports, setDivisionReports] = useState([]);
  const [halqaReports, setHalqaReports] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [value, setValue] = useState(null);
  const [active, setActive] = useState("province");
  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(true);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [reports, setReports] = useState([]);
  const location = useLocation();
  let dis;
  let r = [];
  const [authenticated, setAuthenticaated] = useState(
    localStorage.getItem("@token")
  );
  const getMe = async () => {
    try {
      sessionStorage.removeItem("storedData");
      setValue("Fetching user info");
      const req = await instance.get("/user/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        const meData = req.data.data;
        [
          "email",
          "fatherName",
          "name",
          "age",
          "dob",
          "address",
          "qualification",
          "subject",
          "semester",
          "institution",
          "phoneNumber",
          "whatsAppNumber",
        ].forEach((i) => {
          if (!meData?.[i]) {
            setIsCompleted(false);
          }
        });
        if (isCompleted) {
          if (
            req?.data?.data?.isDeleted ||
            req?.data?.data?.userAreaId?.disabled
          ) {
            alert(
              "Your account will be logged out as admin has updated your rights"
            );
            localStorage.clear();
            navigate("/login");
          }
          if (
            localStorage?.getItem("@nazimType") &&
            localStorage?.getItem("@type")
          ) {
            if (
              localStorage?.getItem("@nazimType") !==
                req?.data?.data?.nazimType ||
              localStorage?.getItem("@type") !== req?.data?.data?.nazim
            ) {
              console.log(req?.data?.data?.nazimType);
              alert(
                "Your account will be logged out as admin has updated your rights"
              );
              localStorage.clear();
              navigate("/login");
            }
          }
          setMe(req.data.data);
        } else {
          setIsCompleted(true);
        }
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("@token");
      window.location.reload();
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getProvinces = async () => {
    try {
      const req = await instance.get("/locations/province", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        setProvinces(
          req.data?.data?.filter((i) => i?.country === me?.userAreaId?._id)
        );
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getIlaqas = async () => {
    try {
      const req = await instance.get("/locations/ilaqa", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        const enabledIlaqas = req.data.data;
        const type = localStorage.getItem("@type");
        if (type === "country") {
          setIlaqas(
            enabledIlaqas?.filter((halqa) => {
              return halqa?.disabled !== true;
            })
          );
        } else if (type === "province") {
          setIlaqas(
            enabledIlaqas.filter((i) => {
              return i?.maqam?.province?._id === me?.userAreaId?._id;
            })
          );
        } else if (type === "maqam") {
          const validIlaqas = enabledIlaqas.filter(
            (i) => i?.maqam?._id === me?.userAreaId?._id
          );
          setIlaqas(validIlaqas);
        } else {
          const validIlaqas = enabledIlaqas.filter(
            (i) => i?._id === me?.userAreaId?._id
          );
          setIlaqas(validIlaqas);
        }
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getMaqams = async () => {
    try {
      const req = await instance.get("/locations/maqam", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        setMaqams(
          req.data.data.filter(
            (i) =>
              i?._id === me?.userAreaId?._id ||
              i?.province?._id === me?.userAreaId?._id ||
              i?.province?.country === me?.userAreaId?._id
          )
        );
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getDivisions = async () => {
    try {
      const req = await instance.get("/locations/division", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        setDivisions(
          req.data.data.filter(
            (i) =>
              i?._id === me?.userAreaId?._id ||
              i?.province?._id === me?.userAreaId?._id ||
              i?.province?.country === me?.userAreaId?._id
          )
        );
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getTehsils = async () => {
    try {
      const req = await instance.get("/locations/tehsil", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        const allData = req.data.data;
        const validTehsils = allData.filter(
          (i) =>
            i?.district?.division?._id === me?.userAreaId?._id ||
            i?.district?.division?.province?._id === me?.userAreaId?._id ||
            i?.district?.division?.province?.country === me?.userAreaId?._id
        );
        setTehsils(validTehsils);
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getDistricts = async () => {
    try {
      const req = await instance.get("/locations/district", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        const allData = req.data.data;
        const validDistricts = allData.filter(
          (i) =>
            i?.division?._id === me?.userAreaId?._id ||
            i?.division?.province?._id === me?.userAreaId?._id ||
            i?.division?.province?.country === me?.userAreaId?._id
        );
        setDistricts(validDistricts);
        dis = validDistricts;
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getHalqas = async () => {
    try {
      const req = await instance.get("/locations/halqa", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        const enabledHalqas = req.data.data;
        const type = localStorage.getItem("@type");
        if (type === "country") {
          setHalqas(
            enabledHalqas?.filter((halqa) => {
              return halqa?.disabled !== true;
            })
          );
        } else if (type === "province") {
          setHalqas(
            enabledHalqas.filter((i) => {
              if (
                i?.parentType === "Maqam" ||
                i?.parentType === "Ilaqa" ||
                i?.parentType === "Division" ||
                i?.parentType === "Tehsil"
              ) {
                const validMaqamHalqas =
                  i?.parentId?.maqam?.province?._id === me?.userAreaId?._id ||
                  i?.parentId?.province?._id === me?.userAreaId?._id;
                let validDistrictsId;
                if (dis?.length > 0) {
                  validDistrictsId = dis?.map((i) => i?._id?.toString());
                } else {
                  validDistrictsId = districts?.map((i) => i?._id?.toString());
                }
                if (validDistrictsId) {
                  // Check if the parent type is "Tehsil" or "division" and the district matches one of the valid districts
                  const isParentValid =
                    (i?.parentType === "Tehsil" ||
                      i?.parentType === "division") &&
                    validDistrictsId.includes(
                      i?.parentId.district?._id?.toString()
                    );
                  const isDivisionParentValid =
                    i?.parentType === "division" &&
                    i?.parentId._id.toString() ===
                      me?.userAreaId?._id?.toString();

                  // Return true if any of the conditions are met
                  return (
                    isParentValid || isDivisionParentValid || validMaqamHalqas
                  );
                }
              }
            })
          );
        } else if (type === "maqam") {
          const validHalqas = enabledHalqas.filter((i) => {
            if (i?.parentType === "Maqam" || i?.parentType === "Ilaqa") {
              return (
                i?.parentId?._id === me?.userAreaId?._id ||
                i?.parentId?.maqam?._id === me?.userAreaId?._id
              );
            }
          });
          setHalqas(validHalqas);
        } else if (type === "ilaqa") {
          const validHalqas = enabledHalqas.filter(
            (i) =>
              i?.parentType === "Ilaqa" &&
              i?.parentId?._id === me?.userAreaId?._id
          );
          setHalqas(validHalqas);
        } else if (type === "division") {
          let validDistrictsId;
          if (dis?.length > 0) {
            validDistrictsId = dis?.map((i) => i?._id?.toString());
          } else {
            validDistrictsId = districts?.map((i) => i?._id?.toString());
          }
          let isParentValid;
          let isDivisionParentValid;
          const validHalqas = enabledHalqas.filter((halqa) => {
            // Check if the parent type is "Tehsil" or "division" and the district matches one of the valid districts
            if (halqa.parentType === "Tehsil") {
              return (isParentValid = validDistrictsId.includes(
                halqa.parentId.district?._id?.toString()
              ));
            }
            if (halqa.parentType === "Division") {
              return (isDivisionParentValid =
                halqa?.parentId?._id.toString() ===
                me?.userAreaId?._id?.toString());
            }

            // Return true if any of the conditions are met
            return isParentValid || isDivisionParentValid;
          });

          setHalqas(validHalqas);
        } else {
          const validHalqas = enabledHalqas.filter(
            (i) =>
              i?._id === me?.userAreaId?._id ||
              i?.parentId?._id === me?.userAreaId?._id
          );
          setHalqas(validHalqas);
        }
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };

  let provinceR, maqamR, divisionR, halqaR, ilaqaR;
  const getProvinceReports = async () => {
    try {
      const req = await instance.get("/reports/province", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        provinceR = req.data.data;
        setProvinceReports(req.data.data);
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getMaqamReports = async () => {
    try {
      const req = await instance.get("/reports/maqam", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        maqamR = req.data.data;
        setMaqamReports(req.data.data);
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getIlaqaReports = async () => {
    try {
      const req = await instance.get("/reports/ilaqa", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        ilaqaR = req.data.data;
        setIlaqaReports(req.data.data);
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getDivisionReports = async () => {
    try {
      const req = await instance.get("/reports/division", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        divisionR = req.data.data;
        setDivisionReports(req.data.data);
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getHalqaReports = async () => {
    try {
      const req = await instance.get("/reports/halqa", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) {
        halqaR = req.data.data;
        setHalqaReports(req.data.data);
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getNazim = async () => {
    try {
      const req = await instance.get("/user/nazim", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      if (req) setNazim(req?.data?.data);
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
      console.log(err);
    }
  };
  const getAllRequests = async () => {
    if (localStorage.getItem("@token")) {
      try {
        const req = await instance.get("/user/user-requests", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        setUserRequests(req.data?.data);
      } catch (err) {
        console.log(err);
        dispatch({
          type: "ERROR",
          payload: err?.response?.data?.message || err?.message,
        });
      }
    }
  };
  // NOTiFICATIONS CODE
  const getAllReports = async () => {
    if (
      localStorage.getItem("@token") &&
      localStorage.getItem("@type") !== "province"
    ) {
      try {
        let req;
        switch (localStorage.getItem("@type")) {
          case "province":
            req = provinceR;
            break;
          case "maqam":
            req = maqamR;
            break;
          case "ilaqa":
            req = ilaqaR;
            break;
          case "division":
            req = divisionR;
            break;
          case "halqa":
            req = halqaR;
            break;
          default:
            req = [];
            break;
        }
        r = req;
        setReports(req);
      } catch (err) {
        console.log(err);
        console.log(err);
      }
    }
  };
  const getAllNotifications = async () => {
    if (localStorage.getItem("@token")) {
      try {
        const req = await instance.get(
          "/notifications?type=" + localStorage.getItem("@type").toLowerCase(),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("@token")}`,
            },
          }
        );
        setNotifications(
          req.data?.data.filter((i) => {
            const months = r?.map((_) =>
              _.month.split("-").slice(0, 2).join("-")
            );
            return !months.includes(
              i?.createdAt.split("-").slice(0, 2).join("-")
            );
          })
        );
      } catch (err) {
        console.log(err);
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (me) {
        getAllReports();
        getAllRequests();
      }
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (reports?.length > 0) getAllNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports]);

  // NOTiFICATIONS CODE END
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      if (authenticated) {
        getMe();
        hasMounted.current = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);
  useEffect(() => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const fetchData = async () => {
      setCount((100 / 16) * 1);
      setValue("Fetching provinces");
      await getProvinces();
      setCount((100 / 16) * 2);
      setValue("Fetching maqams");
      await getMaqams();
      setCount((100 / 16) * 3);
      setValue("Fetching Ilaqas");
      await getIlaqas();
      setCount((100 / 16) * 4);
      setValue("Fetching divisions");
      await getDivisions();
      setCount((100 / 16) * 5);
      setValue("Fetching districts");
      await sleep(1000);
      await getDistricts();
      setCount((100 / 16) * 6);
      setValue("Fetching tehsils");
      await sleep(1000);
      await getTehsils();
      setCount((100 / 16) * 7);
      setValue("Fetching halqas");
      await sleep(1001);
      await getHalqas();
      setCount((100 / 16) * 8);
      setValue("Fetching province reports");
      await getProvinceReports();
      setCount((100 / 16) * 9);
      setValue("Fetching maqam reports");
      await getMaqamReports();
      setCount((100 / 16) * 10);
      setValue("Fetching division reports");
      await getDivisionReports();
      setCount((100 / 16) * 11);
      setValue("Fetching halqa reports");
      await getHalqaReports();
      setCount((100 / 16) * 12);
      setValue("Fetching nazims");
      await getNazim();
      setCount((100 / 16) * 13);
      setValue("Fetching user requests");
      await getAllRequests();
      setCount((100 / 16) * 14);
      setValue(null);
      setValue("Fetching all notifications");
      await getAllNotifications();
      setCount((100 / 16) * 15);
      setValue(null);
      setValue("Fetching all Ilaqa Reports");
      await getIlaqaReports();
      setCount((100 / 16) * 16);
      setValue(null);
      if (
        location.pathname?.split("/")[2] === "view" ||
        location.pathname?.split("/")[2] === "edit"
      ) {
        navigate("/reports");
      } else if (location.pathname?.includes("reports")) {
        navigate("/");
      }
    };
    if (me) {
      fetchData();
      setActive(localStorage.getItem("@type"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);
  useEffect(() => {
    if (me) {
      if (!isCompleted) {
        dispatch({ type: "ERROR", payload: "Please complete your profile." });
        navigate("/profile");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, isCompleted, navigate]);

  return (
    <MeContext.Provider value={me}>
      <DoubleScrollLeftRefresh />
      <ProvinceContext.Provider value={provinces}>
        <ProvinceReportContext.Provider value={provinceReports}>
          <MaqamContext.Provider value={maqams}>
            <MaqamReportContext.Provider value={maqamReports}>
              <IlaqaContext.Provider value={ilaqas}>
                <DivisionContext.Provider value={divisions}>
                  <DivisionReportContext.Provider value={divisionReports}>
                    <DistrictContext.Provider value={districts}>
                      <TehsilContext.Provider value={tehsils}>
                        <HalqaContext.Provider value={halqas}>
                          <IlaqaReportContext.Provider value={ilaqaReports}>
                            <HalqaReportContext.Provider value={halqaReports}>
                              <UIContext.Provider
                                value={{
                                  userRequests,
                                  nazim,
                                  loading,
                                  notifications,
                                  reports,
                                  active,
                                  isCompleted,
                                  setLoading,
                                  getMe,
                                  getProvinces,
                                  getMaqams,
                                  getDivisions,
                                  getDistricts,
                                  getTehsils,
                                  getHalqas,
                                  getIlaqas,
                                  getProvinceReports,
                                  getMaqamReports,
                                  getIlaqaReports,
                                  getDivisionReports,
                                  getHalqaReports,
                                  getAllRequests,
                                  setReports,
                                  getAllNotifications,
                                  getNazim,
                                  setActive,
                                  setMe,
                                }}
                              >
                                <div className="flex flex-col">
                                  <Routes>
                                    <Route
                                      path="/signup"
                                      element={<Signup />}
                                    />
                                    <Route
                                      path="/login"
                                      element={
                                        <Login
                                          setAuthenticated={setAuthenticaated}
                                        />
                                      }
                                    />
                                    <Route path="/" element={<Dashboard />} />
                                    <Route
                                      path="/reset-password"
                                      element={<Forget />}
                                    />
                                    <Route
                                      path="/reset"
                                      element={<ResetPassword />}
                                    />
                                    <Route
                                      path="change-password"
                                      element={<ChangePassword />}
                                    />
                                    <Route
                                      path="/comparison"
                                      element={<Comparision />}
                                    />
                                    <Route
                                      path="/chart"
                                      element={<ReportChart />}
                                    />
                                    <Route
                                      path="/reports"
                                      element={<Reports />}
                                    />
                                    <Route
                                      path="/personalReport"
                                      element={<PersonalReportsDashboard />}
                                    />
                                    <Route
                                      path="/reports/create"
                                      element={
                                        localStorage.getItem("@type") ===
                                        "maqam" ? (
                                          <Maqam />
                                        ) : localStorage.getItem("@type") ===
                                          "division" ? (
                                          <Division />
                                        ) : localStorage.getItem("@type") ===
                                          "province" ? (
                                          <Province />
                                        ) : localStorage.getItem("@type") ===
                                          "ilaqa" ? (
                                          <Ilaqa />
                                        ) : (
                                          <Halqa />
                                        )
                                      }
                                    />
                                    <Route
                                      path="/reports/edit/:id"
                                      element={
                                        localStorage.getItem("@type") ===
                                        "maqam" ? (
                                          <Maqam />
                                        ) : localStorage.getItem("@type") ===
                                          "ilaqa" ? (
                                          <Ilaqa />
                                        ) : localStorage.getItem("@type") ===
                                          "division" ? (
                                          <Division />
                                        ) : localStorage.getItem("@type") ===
                                          "province" ? (
                                          <Province />
                                        ) : (
                                          <Halqa />
                                        )
                                      }
                                    />
                                    <Route
                                      path={"/reports/view/:id"}
                                      element={
                                        active === "maqam" ? (
                                          <Maqam />
                                        ) : active === "ilaqa" ? (
                                          <Ilaqa />
                                        ) : active === "division" ? (
                                          <Division />
                                        ) : active === "province" ? (
                                          <Province />
                                        ) : (
                                          <Halqa />
                                        )
                                      }
                                    />
                                    <Route
                                      path="/profile"
                                      element={<EditProfile />}
                                    />
                                    <Route
                                      path="/locations"
                                      element={<Locations />}
                                    />
                                    <Route
                                      path="/user-switch"
                                      element={<DeleteUser />}
                                    />
                                    <Route
                                      path="/personalReport/create"
                                      element={<ReportUmeedwar />}
                                    />
                                    <Route
                                      path="/personalReport/view/:id"
                                      element={<ReportUmeedwar />}
                                    />
                                    <Route
                                      path="/personalReport/edit/:id"
                                      element={<ReportUmeedwar />}
                                    />
                                    <Route
                                      path="/personalReport/print/:id"
                                      element={<ArkanReport />}
                                    />
                                    <Route
                                      path="/province-report/print/:id"
                                      element={<ProvinceReport />}
                                    />
                                    <Route
                                      path="/division-report/print/:id"
                                      element={<DivisionReport />}
                                    />
                                    <Route
                                      path="/maqam-report/print/:id"
                                      element={<MaqamReport />}
                                    />
                                    <Route
                                      path="/halqa-report/print/:id"
                                      element={<HalqaReport />}
                                    />
                                  </Routes>
                                  <LoadingScreen count={count} value={value} />
                                  {loading && <Loader />}
                                  <Toast />
                                </div>
                              </UIContext.Provider>
                            </HalqaReportContext.Provider>
                          </IlaqaReportContext.Provider>
                        </HalqaContext.Provider>
                      </TehsilContext.Provider>
                    </DistrictContext.Provider>
                  </DivisionReportContext.Provider>
                </DivisionContext.Provider>
              </IlaqaContext.Provider>
            </MaqamReportContext.Provider>
          </MaqamContext.Provider>
        </ProvinceReportContext.Provider>
      </ProvinceContext.Provider>
    </MeContext.Provider>
  );
}

export default App;
