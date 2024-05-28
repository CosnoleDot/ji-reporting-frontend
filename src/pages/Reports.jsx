import { FaPlus } from "react-icons/fa";
import { GeneralLayout } from "../components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { IlaqaContext, MeContext, useToastState } from "../context";
import instance from "../api/instrance";
import { Link } from "react-router-dom";
import { FaRegFileExcel } from "react-icons/fa";
import { AiFillBell } from "react-icons/ai";
import { UIContext } from "../context/ui";
import { ProvinceReports } from "./Reports/ProvinceReports";
import { DivisionReports } from "./Reports/DivisionReports";
import { MaqamReports } from "./Reports/MaqamReports";
import { IlaqaReports } from "./Reports/IlaqaReports";
import { HalqaReports } from "./Reports/HalqaReports";
import { CountryReport } from "./Reports/CountryReport";
import { UnitReport } from "./Reports/UnitReport";

export const NoReports = () => (
  <div className="card-body flex flex-col items-center justify-center w-full p-2 md:p-5 mb-1 rounded-xl">
    <FaRegFileExcel className="text-gray-300 w-40 h-40" />
    <span className="text-gray-300 font-bold text-3xl">No Reports Found!</span>
  </div>
);

export const months = [
  {
    title: "January",
    value: 1,
  },
  {
    title: "February",
    value: 2,
  },
  {
    title: "March",
    value: 3,
  },
  {
    title: "April",
    value: 4,
  },
  {
    title: "May",
    value: 5,
  },
  {
    title: "June",
    value: 6,
  },
  {
    title: "July",
    value: 7,
  },
  {
    title: "August",
    value: 8,
  },
  {
    title: "September",
    value: 9,
  },
  {
    title: "October",
    value: 10,
  },
  {
    title: "November",
    value: 11,
  },
  {
    title: "December",
    value: 12,
  },
];

export const getDivisionByTehsil = (tehsil, districts) => {
  const districtId = tehsil?.district;

  return districts.find((i) => i?._id === districtId)?.division?.name;
};

export const Reports = () => {
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);

  const me = useContext(MeContext);
  const { dispatch } = useToastState();
  const [tab, setTab] = useState(
    ["province", "maqam"].includes(localStorage.getItem("@type"))
      ? "maqam"
      : ["division"].includes(localStorage.getItem("@type"))
      ? "division"
      : ["ilaqa"].includes(localStorage.getItem("@type"))
      ? "ilaqa"
      : "halqa"
  );
  const [id, setId] = useState(null);
  const { active, setActive, filterMuntakhib } = useContext(UIContext);
  const [notifyTo, setNotifyTo] = useState("halqa");
  const ilaqas = useContext(IlaqaContext);
  const params = useLocation();

  // GENERATE MONTHS
  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};
      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }
      if (queryParams?.areaId) setId(queryParams.areaId);
      if (queryParams?.active) setActive(queryParams?.active);
      if (queryParams?.tab) setTab(queryParams?.tab);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleReport = () => {
    if (me?.userAreaType === "Maqam") {
      filterMuntakhib(me?.userAreaId?._id);
      navigate(`/reports/create`);
    } else {
      navigate(`/reports/create`);
    }
  };

  useEffect(() => {
    if (window) {
      if (window.innerWidth < 520) {
        setIsMobileView(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const sendNotification = async () => {
    try {
      const req = await instance.post(
        "/notifications",
        { created_for: notifyTo, content: "Please fill your area reports" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
  };
  return (
    <GeneralLayout
      title={me?.userAreaId?.name.toUpperCase()}
      active={"reports"}
    >
      <div className="relative flex flex-col gap-3 items-center p-5 justify-center h-[calc(100vh-65.6px-64px)]">
        <h3 className="w-full font-bold text-left text-xl hidden lg:block xl:block">
          Reports
        </h3>
        <div className="flex flex-col w-full items-center justify-between md:flex-row">
          <div className="flex justify-end items-center gap-4">
            <button className="btn " onClick={handleReport}>
              <FaPlus />
              <span className="hidden lg:block xl:block">New Report</span>
            </button>

            {!isMobileView &&
              ((active === "province" &&
                localStorage.getItem("@type") === "country") ||
                (active === "division" &&
                  localStorage.getItem("@type") === "province") ||
                (active === "maqam" &&
                  localStorage.getItem("@type") === "province") ||
                (active === "ilaqa" &&
                  localStorage.getItem("@type") === "maqam") ||
                (active === "halqa" &&
                  (localStorage.getItem("@type") === "maqam" ||
                    localStorage.getItem("@type") === "division" ||
                    localStorage.getItem("@type") === "ilaqa") &&
                  localStorage.getItem("@type") !== "province" &&
                  localStorage.getItem("@type") !== "country")) && (
                <button
                  onClick={sendNotification}
                  className={`btn ${!isMobileView ? "join-item" : "ms-3"}`}
                >
                  <AiFillBell />
                </button>
              )}
          </div>
        </div>
        {["umeedwar", "rukan", "umeedwaar-nazim", "rukan-nazim"].includes(
          me?.nazimType
        ) && (
          <Link
            to={"/personalReport"}
            role="tab"
            className={`tab flex justify-center items-center w-full ${
              tab === "personal" ? "tab-active" : ""
            } font-bold underline`}
            onClick={() => setTab("personal")}
          >
            Personal
          </Link>
        )}
        <div
          role="tablist"
          className="w-full flex justify-between items-center overflow-hidden overflow-x-scroll"
        >
          {["country"].includes(localStorage.getItem("@type")) &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) && (
              <Link
                to={"?active=country"}
                role="tab"
                className={`tab flex justify-center items-center mb-2 p-2 w-full ${
                  active === "country" ? "tab-active bg-slate-200" : ""
                }  font-bold underline`}
                onClick={() => setNotifyTo("country")}
              >
                Country
              </Link>
            )}
          {["country", "province"].includes(localStorage.getItem("@type")) &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) && (
              <Link
                to={"?active=province"}
                role="tab"
                className={`tab flex justify-center items-center mb-2 p-2 w-full ${
                  active === "province" ? "tab-active bg-slate-200" : ""
                } font-bold underline`}
                onClick={() => setNotifyTo("province")}
              >
                Province
              </Link>
            )}
          {["country", "province", "division"].includes(
            localStorage.getItem("@type")
          ) &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) && (
              <Link
                to={"?active=division"}
                role="tab"
                className={`tab flex justify-center items-center mb-2 p-2 w-full ${
                  active === "division" ? "tab-active" : ""
                } font-bold underline`}
                onClick={() => setNotifyTo("division")}
              >
                Division
              </Link>
            )}
          {["country", "province", "maqam"].includes(
            localStorage.getItem("@type")
          ) &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) && (
              <Link
                to={"?active=maqam"}
                role="tab"
                className={`tab flex justify-center items-center mb-2 p-2 w-full ${
                  active === "maqam" ? "tab-active" : ""
                } font-bold underline`}
                onClick={() => setNotifyTo("maqam")}
              >
                Maqam
              </Link>
            )}
          {["country", "maqam", "ilaqa"].includes(
            localStorage.getItem("@type")
          ) &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) &&
            ilaqas?.length > 0 && (
              <Link
                to={"?active=ilaqa"}
                role="tab"
                className={`tab flex justify-center items-center mb-2 p-2 w-full ${
                  active === "ilaqa" ? "tab-active" : ""
                } font-bold underline`}
                onClick={() => setNotifyTo("ilaqa")}
              >
                Ilaqa
              </Link>
            )}

          {["country", "province", "maqam", "ilaqa", "division"].includes(
            localStorage.getItem("@type")
          ) &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) && (
              <Link
                to={"?active=halqa"}
                role="tab"
                className={`tab flex justify-center items-center mb-2 p-2 w-full ${
                  active === "halqa" ? "tab-active" : ""
                } font-bold underline`}
                onClick={() => setNotifyTo("halqa")}
              >
                Halqa
              </Link>
            )}
        </div>

        <div className="relative overflow-y-scroll gap-3 w-full items-center p-0 md:p-5 justify-center h-[calc(100vh-65.6px-64px-48px)]">
          {active === "province" ? (
            <ProvinceReports />
          ) : active === "division" ? (
            <DivisionReports tab={active} />
          ) : active === "maqam" ? (
            <MaqamReports />
          ) : active === "ilaqa" ? (
            <IlaqaReports />
          ) : active === "halqa" ? (
            me?.userAreaType === "Halqa" ||
            me?.userAreaType === "Ilaqa" ||
            me?.userAreaType === "Maqam" ||
            me?.userAreaType === "Division" ? (
              <UnitReport setPage={setPage}/>
            ) : (
              <HalqaReports />
            )
          ) : active === "country" ? (
            <CountryReport />
          ) : (
            <NoReports />
          )}
        </div>
      </div>
    </GeneralLayout>
  );
};
