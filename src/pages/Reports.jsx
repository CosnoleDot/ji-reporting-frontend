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
    <FaRegFileExcel className="text-gray-300 w-20 h-20 md:w-40 md:h-40 " />
    <span className="text-gray-300 font-bold text-md md:text-3xl">
      No Reports Found!
    </span>
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
  const {
    active,
    setActive,
    filterMuntakhib,
    getHalqaReports,
    getIlaqaReports,
    getMaqamReports,
    getDivisionReports,
    getProvinceReports,
    getMarkazReport,
  } = useContext(UIContext);
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
  useEffect(() => {
    switch (active) {
      case "country":
        getMarkazReport();
        break;
      case "province":
        getProvinceReports();
        break;
      case "division":
        getDivisionReports();
        break;
      case "maqam":
        getMaqamReports();
        break;
      case "ilaqa":
        getIlaqaReports();
        break;
      case "halqa":
        getHalqaReports();
        break;
      default:
        break;
    }
  }, [active]);

  return (
    <GeneralLayout
      title={me?.userAreaId?.name.toUpperCase()}
      active={"reports"}
    >
      <div className="relative flex flex-col gap-3 items-center p-5 justify-center">
        <div className="flex md:flex-row flex-col w-full items-center justify-between py-4 mb-4 border-b border-inputBorder">
          <div className="flex flex-col justify-start w-full md:mb-0 mb-4">
            <h1 class="font-inter text-heading text-[18px] font-medium leading-[28px] text-left">
              Reports
            </h1>
            <p class="font-inter text-[14px] font-normal leading-[20px] text-left text-secondaryText">
              Get a sneak peek into your reports
            </p>
          </div>
          <div className="flex gap-2 md:flex-row flex-col w-full">
            <div className="flex items-center gap-2 w-full">
              {active === localStorage.getItem("@type") && (
                <button
                  className="font-inter w-full gap-1 justify-center flex items-center bg-primary  text-white p-2 rounded text-[14px] font-medium leading-[20px] text-left"
                  onClick={handleReport}
                >
                  <FaPlus />
                  <span className="">New Report</span>
                </button>
              )}
              <button
                className="font-inter w-full text-[14px] bg-primary flex justify-center text-white p-2 rounded font-medium leading-[20px] text-left"
                onClick={() => navigate("/compilation")}
              >
                Compile
              </button>
            </div>
            {[
              "umeedwar",
              "rukan",
              "umeedwaar-nazim",
              "rukan-nazim",
              "nazim",
            ].includes(me?.nazimType) && (
              <button
                className="font-inter w-full text-[14px] bg-primary flex justify-center text-white p-2 rounded font-medium leading-[20px] text-left"
                onClick={() => {
                  setTab("personal");
                  navigate("/personalReport");
                }}
              >
                Arkan/umeedwaran reports
              </button>
            )}
            {((active === "province" &&
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
                className={`text-[14px] bg-primary  text-white p-2 rounded font-medium leading-[20px] text-left ${
                  !isMobileView ? "join-item" : "ms-3"
                } `}
              >
                <AiFillBell />
              </button>
            )}
          </div>
        </div>

        <div
          role="tablist"
          className="w-full flex text-slate-400 justify-between gap-3 items-center overflow-hidden overflow-x-scroll"
        >
          <div className="flex items-center justify-between w-full">
            {["country"].includes(localStorage.getItem("@type")) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <Link
                  to={"?active=country"}
                  role="tab"
                  className={`font-inter md:text-[14px] text-[12px] font-medium leading-[20px] text-left text-heading ${
                    active === "country" ? "text-secondaryText underline " : ""
                  }  font-bold `}
                  onClick={() => setNotifyTo("country")}
                >
                  Markaz
                </Link>
              )}
            {["country", "province"].includes(localStorage.getItem("@type")) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <Link
                  to={"?active=province"}
                  role="tab"
                  className={`font-inter md:text-[14px] text-[12px] font-medium leading-[20px] text-left text-heading ${
                    active === "province" ? "text-secondaryText underline " : ""
                  } font-bold `}
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
                  className={`font-inter md:text-[14px] text-[12px] font-medium leading-[20px] text-left text-heading ${
                    active === "division" ? "text-secondaryText underline" : ""
                  } font-bold `}
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
                  className={`font-inter md:text-[14px] text-[12px] font-medium leading-[20px] text-left text-heading ${
                    active === "maqam" ? "text-secondaryText underline" : ""
                  } font-bold `}
                  onClick={() => setNotifyTo("maqam")}
                >
                  Maqam
                </Link>
              )}
            {["country", "maqam", "ilaqa", "province"].includes(
              localStorage.getItem("@type")
            ) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) &&
              ilaqas?.length > 0 && (
                <Link
                  to={"?active=ilaqa"}
                  role="tab"
                  className={`font-inter md:text-[14px] text-[12px] font-medium leading-[20px] text-left text-heading ${
                    active === "ilaqa" ? "text-secondaryText underline" : ""
                  } font-bold `}
                  onClick={() => setNotifyTo("ilaqa")}
                >
                  Zone
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
                  className={`font-inter md:text-[14px] text-[12px] font-medium leading-[20px] text-left text-heading ${
                    active === "halqa" ? "text-secondaryText underline" : ""
                  } font-bold `}
                  onClick={() => setNotifyTo("halqa")}
                >
                  Halqa
                </Link>
              )}
          </div>
          <div></div>
        </div>

        <div className="relative overflow-y-scroll gap-3 w-full items-center  justify-center h-[calc(100vh-65.6px-84px-78px)]">
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
              <UnitReport />
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
