import { FaEdit, FaEye, FaPlus, FaPrint } from "react-icons/fa";
import { GeneralLayout } from "../components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
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
  MarkazReportContext,
  MeContext,
  ProvinceContext,
  ProvinceReportContext,
  TehsilContext,
  useToastState,
} from "../context";
import instance from "../api/instrance";
import moment from "moment/moment";
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

export const Reports = ({ maqam }) => {
  const [reports, setReports] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(localStorage.getItem("@type"));
  const [search, showSearch] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2024");
  const [filterData, setFilterData] = useState([]);
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
  const { active, setActive } = useContext(UIContext);
  const [filterAllData, setFilterAllData] = useState({});

  // const [showNotification, setShowNotification] = useState(false);
  const [notifyTo, setNotifyTo] = useState("halqa");
  const maqamReports = useContext(MaqamReportContext);
  const markazReports = useContext(MarkazReportContext);
  const ilaqaReports = useContext(IlaqaReportContext);
  const divisionReports = useContext(DivisionReportContext);
  const halqaReports = useContext(HalqaReportContext);
  const provinceReports = useContext(ProvinceReportContext);
  const [areas, setAreas] = useState([]);
  const [searchArea, setSearchArea] = useState("");
  const maqams = useContext(MaqamContext);
  const divisions = useContext(DivisionContext);
  const districts = useContext(DistrictContext);
  const provinces = useContext(ProvinceContext);
  const tehsils = useContext(TehsilContext);
  const halqas = useContext(HalqaContext);
  const ilaqas = useContext(IlaqaContext);
  const [userAreaType, setUserAreaType] = useState("halqa");
  const [selectedId, setSelectedId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
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
  const handlePrint = (id) => {
    window.open(`${active}-report/print/${id}`, "blank");
  };
  const toggleSearch = () => {
    showSearch(!search);
  };
  const handleReport = () => {
    navigate(`/reports/create`);
  };

  const getAreas = async () => {
    switch (active) {
      case "province":
        setAreas(provinces);
        break;
      case "division":
        setAreas(divisions);
        break;
      case "maqam":
        setAreas(maqams);
        break;
      case "halqa":
        if (halqas?.length > 0) {
          setAreas(
            halqas.filter((i) => {
              if (tab === "maqam") {
                return i?.parentType === "Maqam";
              } else if (tab === "division") {
                return i?.parentType === "Tehsil";
              }
              return true;
            })
          );
        } else {
          setAreas(halqas);
        }

        break;
      default:
        setAreas(provinces);
        break;
    }
  };

  const getAreaWithType = () => {
    switch (userAreaType) {
      case "province":
        setAreas(provinces);
        break;
      case "division":
        setAreas(divisions);
        break;
      case "maqam":
        setAreas(maqams);
        break;
      case "halqa":
        setAreas(
          halqas.filter((i) => {
            if (tab === "maqam") {
              return i?.parentType === "Maqam";
            } else if (tab === "division") {
              return i?.parentType === "Tehsil";
            }
            return true;
          })
        );
        break;
      default:
        break;
    }
  };
  const fetchReports = async () => {
    try {
      let response;
      if (userType !== "halqa") {
        const m = maqamReports;
        const h = halqaReports;
        const d = divisionReports;
        const p = provinceReports;
        const i = ilaqaReports;
        const c = markazReports;
        setAllReports({
          maqam: id ? m.filter((i) => i?.maqamAreaId?._id === id) : m,
          ilaqa: id ? m.filter((i) => i?.ilaqaAreaId?._id === id) : i,
          halqa: id ? h.filter((i) => i?.halqaAreaId?._id === id) : h,
          division: id ? d.filter((i) => i?.divisionAreaId?._id === id) : d,
          province: id ? p.filter((i) => i?.provinceAreaId?._id === id) : p,
          country: id ? p.filter((i) => i?.countryAreaId?._id === id) : c,
        });
        setFilterAllData({
          maqam: id ? m.filter((i) => i?.maqamAreaId?._id === id) : m,
          ilaqa: id ? m.filter((i) => i?.ilaqaAreaId?._id === id) : i,
          halqa: id ? h.filter((i) => i?.halqaAreaId?._id === id) : h,
          division: id ? d.filter((i) => i?.divisionAreaId?._id === id) : d,
          province: id ? p.filter((i) => i?.provinceAreaId?._id === id) : p,
          country: id ? p.filter((i) => i?.countryAreaId?._id === id) : c,
        });

        // SELECT WITH ID & DATE

        if (selectedId && selectedMonth) {
          setAllReports({
            maqam: selectedId
              ? m.filter(
                  (i) =>
                    i?.maqamAreaId?._id === selectedId &&
                    i?.month?.split("-").slice(0, 2).join("-") === selectedMonth
                )
              : m,
            halqa: selectedId
              ? h.filter((i) => {
                  if (userAreaType === "maqam") {
                    return (
                      i?.halqaAreaId?.parentId?._id === selectedId &&
                      i?.month?.split("-").slice(0, 2).join("-") ===
                        selectedMonth
                    );
                  } else if (userAreaType === "division") {
                    const district = i?.halqaAreaId?.parentId?.district;
                    const filteredDistricts = districts
                      .filter((dis) => dis?.division?._id === selectedId)
                      .map((div) => div?._id);
                    return (
                      filteredDistricts.includes(district) &&
                      i?.month?.split("-").slice(0, 2).join("-") ===
                        selectedMonth
                    );
                  }
                  return (
                    i?.halqaAreaId?._id === selectedId &&
                    i?.month?.split("-").slice(0, 2).join("-") === selectedMonth
                  );
                })
              : h,
            division: selectedId
              ? d.filter(
                  (i) =>
                    i?.divisionAreaId?._id === selectedId &&
                    i?.month?.split("-").slice(0, 2).join("-") === selectedMonth
                )
              : d,
            province: selectedId
              ? p.filter(
                  (i) =>
                    i?.provinceAreaId?._id === selectedId &&
                    i?.month?.split("-").slice(0, 2).join("-") === selectedMonth
                )
              : p,
            country: selectedId
              ? c.filter(
                  (i) =>
                    i?.countryAreaId?._id === selectedId &&
                    i?.month?.split("-").slice(0, 2).join("-") === selectedMonth
                )
              : c,
          });
          setFilterAllData({
            maqam: selectedId
              ? m.filter(
                  (i) =>
                    i?.maqamAreaId?._id === selectedId &&
                    i?.month?.split("-").slice(0, 2).join("-") === selectedMonth
                )
              : m,
            halqa: selectedId
              ? h.filter((i) => {
                  if (userAreaType === "maqam") {
                    return (
                      i?.halqaAreaId?.parentId?._id === selectedId &&
                      i?.month?.split("-").slice(0, 2).join("-") ===
                        selectedMonth
                    );
                  } else if (userAreaType === "division") {
                    const district = i?.halqaAreaId?.parentId?.district;
                    const filteredDistricts = districts
                      .filter((dis) => dis?.division?._id === selectedId)
                      .map((div) => div?._id);
                    return (
                      filteredDistricts.includes(district) &&
                      i?.month?.split("-").slice(0, 2).join("-") ===
                        selectedMonth
                    );
                  }
                  return (
                    i?.halqaAreaId?._id === selectedId &&
                    i?.month?.split("-").slice(0, 2).join("-") === selectedMonth
                  );
                })
              : h,
            division: selectedId
              ? d.filter(
                  (i) =>
                    i?.divisionAreaId?._id === selectedId &&
                    i?.month?.split("-").slice(0, 2).join("-") === selectedMonth
                )
              : d,
            province: selectedId
              ? p.filter(
                  (i) =>
                    i?.provinceAreaId?._id === selectedId &&
                    i?.month?.split("-").slice(0, 2).join("-") === selectedMonth
                )
              : p,
            country: selectedId
              ? c.filter(
                  (i) =>
                    i?.countryAreaId?._id === selectedId &&
                    i?.month?.split("-").slice(0, 2).join("-") === selectedMonth
                )
              : c,
          });
        }

        // SELECT WITHOUT DATE

        if (selectedId && (!selectedMonth || selectedMonth === "")) {
          setAllReports({
            maqam: selectedId
              ? m.filter((i) => i?.maqamAreaId?._id === selectedId)
              : m,
            halqa: selectedId
              ? h.filter((i) => {
                  if (userAreaType === "maqam") {
                    return i?.halqaAreaId?.parentId?._id === selectedId;
                  } else if (userAreaType === "division") {
                    const district = i?.halqaAreaId?.parentId?.district;
                    const filteredDistricts = districts
                      .filter((dis) => dis?.division?._id === selectedId)
                      .map((div) => div?._id);
                    return filteredDistricts.includes(district);
                  }
                  return i?.halqaAreaId?._id === selectedId;
                })
              : h,
            division: selectedId
              ? d.filter((i) => i?.divisionAreaId?._id === selectedId)
              : d,
            province: selectedId
              ? p.filter((i) => i?.provinceAreaId?._id === selectedId)
              : p,
            country: selectedId
              ? c.filter((i) => i?.countryAreaId?._id === selectedId)
              : c,
          });
          setFilterAllData({
            maqam: selectedId
              ? m.filter((i) => i?.maqamAreaId?._id === selectedId)
              : m,
            halqa: selectedId
              ? h.filter((i) => {
                  return userAreaType === "maqam"
                    ? i?.halqaAreaId?.parentId?._id === selectedId
                    : i?.halqaAreaId?._id === selectedId;
                })
              : h,
            division: selectedId
              ? d.filter((i) => i?.divisionAreaId?._id === selectedId)
              : d,
            province: selectedId
              ? p.filter((i) => i?.provinceAreaId?._id === selectedId)
              : p,
            country: selectedId
              ? c.filter((i) => i?.countryAreaId?._id === selectedId)
              : c,
          });
        }
      } else {
        switch (userType) {
          case "country":
            response = markazReports;
            break;
          case "province":
            response = provinceReports;
            break;
          case "maqam":
            response = maqamReports;
            break;
          case "ilaqa":
            response = ilaqaReports;
            break;
          case "division":
            response = divisionReports;
            break;
          case "halqa":
            response = halqaReports;
            break;
          default:
            break;
        }
        const data = response;
        setReports(data);
        setFilterData(data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };
  const clearFilters = () => {
    setMonth("");
    setYear("2023");
    setFilterAllData(allReports);
    setFilterData(reports);
    setSelectedId(null);
    setSelectedMonth("");
    document.getElementById("autocomplete").value = "";
  };
  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, id, active, tab, selectedId, selectedMonth]);
  // const searchResults = () => {
  //   if (userType !== "halqa") {
  //     if (year !== "" && month !== "") {
  //       const filteredData = { ...allReports };
  //       filteredData[active] = allReports[active]?.filter((i) => {
  //         const [f_year, f_month] = [
  //           i?.month?.split("-")[0],
  //           i?.month?.split("-")[1],
  //         ];
  //         return (
  //           parseInt(year) === parseInt(f_year) &&
  //           parseInt(month) === parseInt(f_month)
  //         );
  //       });
  //       showSearch(false);
  //       setFilterAllData(filteredData);
  //     } else if (year !== "" && month === "") {
  //       const filteredData = { ...allReports };
  //       filteredData[active] = allReports[active]?.filter((i) => {
  //         const f_year = i?.month?.split("-")[0];
  //         return parseInt(year) === parseInt(f_year);
  //       });
  //       showSearch(false);
  //       setFilterAllData(filteredData);
  //     } else if (year === "" && month !== "") {
  //       dispatch({ type: "ERROR", payload: "Enter year with month" });
  //       setFilterAllData(allReports);
  //     } else if (year === "" && month === "") {
  //       dispatch({ type: "ERROR", payload: "Date is required" });
  //       setFilterAllData(allReports);
  //     } else {
  //       setFilterAllData(allReports);
  //     }
  //   } else {
  //     if (year !== "" && month !== "") {
  //       const filteredData = reports?.reduce((acc, curr) => {
  //         const reportYear = parseInt((curr?.month).split("-")[0]);
  //         const reportMonth = parseInt((curr?.month).split("-")[1]);
  //         if (
  //           reportMonth === parseInt(month) &&
  //           reportYear === parseInt(year)
  //         ) {
  //           acc.push(curr);
  //         }
  //         return acc;
  //       }, []);
  //       showSearch(false);
  //       setFilterData(filteredData);
  //     } else if (year !== "" && month === "") {
  //       const filteredData = reports?.filter((curr) => {
  //         const reportedYear = (curr?.month).split("-")[0];
  //         return parseInt(reportedYear) === parseInt(year);
  //       });
  //       showSearch(false);
  //       setFilterData(filteredData);
  //     } else if (year === "" && month !== "") {
  //       dispatch({ type: "ERROR", payload: "Enter year with month" });
  //       setFilterData(reports);
  //     } else if (year === "" && month === "") {
  //       dispatch({ type: "ERROR", payload: "Date is required" });
  //       setFilterData(reports);
  //     } else {
  //       setFilterData(reports);
  //     }
  //   }
  // };
  useEffect(() => {
    if (window) {
      if (window.innerWidth < 520) {
        setIsMobileView(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);
  useEffect(() => {
    setUserType(localStorage.getItem("@type"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);
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
  // To get Divisions
  const getAreaType = (area) => {
    if (area?.parentType === "Maqam") {
      const name = maqams.find((i) => i?._id === area?.parentId?._id);
      return `${name?.name}(Maqam)`;
    } else if (area?.parentType === "Tehsil") {
      const name = getDivisionByTehsil(area?.parentId, districts);
      return `${name}(Division)`;
    } else if (area?.province) {
      return maqams.find((i) => i?._id === area?._id) ? "Maqam" : "Division";
    }
    return "Province";
  };
  useEffect(() => {
    getAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, provinces, maqams, divisions, halqas, tehsils, districts]);
  useEffect(() => {
    if (active === "halqa") getAreaWithType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAreaType]);
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
              active !== "province" &&
              !(
                active === "maqam" && localStorage.getItem("@type") === "maqam"
              ) &&
              !(
                active === "division" &&
                localStorage.getItem("@type") === "division"
              ) &&
              localStorage.getItem("@type") !== "halqa" && (
                <button
                  onClick={sendNotification}
                  className={`btn ${!isMobileView ? "join-item" : "ms-3"}`}
                >
                  <AiFillBell />
                </button>
              )}
          </div>
        </div>
        {/* )} */}

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
