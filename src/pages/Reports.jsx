import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { GeneralLayout } from "../components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  DistrictContext,
  DivisionContext,
  DivisionReportContext,
  HalqaContext,
  HalqaReportContext,
  MaqamContext,
  MaqamReportContext,
  MeContext,
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

const NoReports = () => (
  <div className="card-body flex flex-col items-center justify-center w-full p-5 mb-1 rounded-xl">
    <FaRegFileExcel className="text-gray-300 w-40 h-40" />
    <span className="text-gray-300 font-bold text-3xl">No Reports Found!</span>
  </div>
);

export const months = [
  {
    title: "January",
    title: "January",
    value: 1,
  },
  {
    title: "February",
    title: "February",
    value: 2,
  },
  {
    title: "March",
    title: "March",
    value: 3,
  },
  {
    title: "April",
    title: "April",
    value: 4,
  },
  {
    title: "May",
    title: "May",
    value: 5,
  },
  {
    title: "June",
    title: "June",
    value: 6,
  },
  {
    title: "July",
    title: "July",
    value: 7,
  },
  {
    title: "August",
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
export const Reports = () => {
  const [reports, setReports] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(localStorage.getItem("@type"));
  const [search, showSearch] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2023");
  const [filterData, setFilterData] = useState([]);
  const me = useContext(MeContext);
  const { dispatch } = useToastState();
  const [tab, setTab] = useState(
    ["province", "maqam"].includes(localStorage.getItem("@type"))
      ? "maqam"
      : "maqam"
  );
  const [id, setId] = useState(null);
  const { active, setActive } = useContext(UIContext);
  const [filterAllData, setFilterAllData] = useState({});

  // const [showNotification, setShowNotification] = useState(false);
  const [notifyTo, setNotifyTo] = useState("halqa");
  const maqamReports = useContext(MaqamReportContext);
  const divisionReports = useContext(DivisionReportContext);
  const halqaReports = useContext(HalqaReportContext);
  const provinceReports = useContext(ProvinceReportContext);
  const user = useContext(MeContext);
  const [areas, setAreas] = useState([]);
  const [searchArea, setSearchArea] = useState("");
  const maqams = useContext(MaqamContext);
  const divisions = useContext(DivisionContext);
  const districts = useContext(DistrictContext);
  const tehsils = useContext(TehsilContext);
  const halqas = useContext(HalqaContext);
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

  const toggleSearch = () => {
    showSearch(!search);
  };
  const handleReport = () => {
    navigate(`/reports/create`);
  };

  const viewReport = async (id) => {
    navigate(`view/${id}`);
  };
  const editReport = (id) => {
    navigate(`edit/${id}`);
  };
  const getAreas = async () => {
    switch (active) {
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
  const getAreaWithType = () => {
    switch (userAreaType) {
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
        setAllReports({
          maqam: id ? m.filter((i) => i?.maqamAreaId?._id === id) : m,
          halqa: id ? h.filter((i) => i?.halqaAreaId?._id === id) : h,
          division: id ? d.filter((i) => i?.divisionAreaId?._id === id) : d,
          province: id ? p.filter((i) => i?.provinceAreaId?._id === id) : p,
        });
        setFilterAllData({
          maqam: id ? m.filter((i) => i?.maqamAreaId?._id === id) : m,
          halqa: id ? h.filter((i) => i?.halqaAreaId?._id === id) : h,
          division: id ? d.filter((i) => i?.divisionAreaId?._id === id) : d,
          province: id ? p.filter((i) => i?.provinceAreaId?._id === id) : p,
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
          });
        }
      } else {
        switch (userType) {
          case "province":
            response = provinceReports;
            break;
          case "maqam":
            response = maqamReports;
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

  const searchResults = () => {
    if (userType !== "halqa") {
      if (year !== "" && month !== "") {
        const filteredData = { ...allReports };
        filteredData[active] = allReports[active]?.filter((i) => {
          const [f_year, f_month] = [
            i?.month?.split("-")[0],
            i?.month?.split("-")[1],
          ];
          return (
            parseInt(year) === parseInt(f_year) &&
            parseInt(month) === parseInt(f_month)
          );
        });
        showSearch(false);
        setFilterAllData(filteredData);
      } else if (year !== "" && month === "") {
        const filteredData = { ...allReports };
        filteredData[active] = allReports[active]?.filter((i) => {
          const f_year = i?.month?.split("-")[0];
          return parseInt(year) === parseInt(f_year);
        });
        showSearch(false);
        setFilterAllData(filteredData);
      } else if (year === "" && month !== "") {
        dispatch({ type: "ERROR", payload: "Enter year with month" });
        setFilterAllData(allReports);
      } else if (year === "" && month === "") {
        dispatch({ type: "ERROR", payload: "Date is required" });
        setFilterAllData(allReports);
      } else {
        setFilterAllData(allReports);
      }
    } else {
      if (year !== "" && month !== "") {
        const filteredData = reports?.reduce((acc, curr) => {
          const reportYear = parseInt((curr?.month).split("-")[0]);
          const reportMonth = parseInt((curr?.month).spit("-")[1]);
          if (
            reportMonth === parseInt(month) &&
            reportYear === parseInt(year)
          ) {
            acc.push(curr);
          }
          return acc;
        }, []);
        showSearch(false);
        setFilterData(filteredData);
      } else if (year !== "" && month === "") {
        const filteredData = reports?.filter((curr) => {
          const reportedYear = (curr?.month).split("-")[0];
          return parseInt(reportedYear) === parseInt(year);
        });
        showSearch(false);
        setFilterData(filteredData);
      } else if (year === "" && month !== "") {
        dispatch({ type: "ERROR", payload: "Enter year with month" });
        setFilterData(reports);
      } else if (year === "" && month === "") {
        dispatch({ type: "ERROR", payload: "Date is required" });
        setFilterData(reports);
      } else {
        setFilterData(reports);
      }
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
  useEffect(() => {
    getAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  useEffect(() => {
    getAreaWithType();
  }, [userAreaType, tab]);
  return (
    <GeneralLayout
      title={me?.userAreaId?.name.toUpperCase()}
      active={"reports"}
    >
      <div className="relative flex flex-col gap-3 items-center p-5 justify-center h-[calc(100vh-65.6px-64px)]">
        <div className="flex w-full items-center justify-between xs:flex-col">
          <h3 className="font-bold text-xl hidden lg:block xl:block">
            Reports
          </h3>
          <dialog id="filter-area-dialog" className="modal">
            <div className="modal-box h-[300px]">
              <form method="dialog" className="mb-3">
                <button
                  id="filter-area-dialog-close-btn"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => {
                    if (
                      !document
                        .getElementById("autocomplete-list")
                        .classList.contains("hidden")
                    ) {
                      document
                        .getElementById("autocomplete-list")
                        .classList.add("hidden");
                    }
                  }}
                >
                  ✕
                </button>
              </form>
              <div className="relative">
                <span className="px-1 py-2 block font-semibold w-[50%]">
                  Select Area:
                </span>
                {active === "halqa" && (
                  <div className="flex items-center gap-3 justify-start border border-primary p-2 rounded-lg mb-3">
                    {tab !== "maqam" && (
                      <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                          <input
                            type="radio"
                            name="userAreaType"
                            className="radio checked:bg-blue-500"
                            value="division"
                            onChange={(e) => setUserAreaType(e.target.value)}
                          />
                          <span className="label-text">Division</span>
                        </label>
                      </div>
                    )}
                    {tab !== "division" && (
                      <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                          <input
                            type="radio"
                            name="userAreaType"
                            className="radio checked:bg-blue-500"
                            value="maqam"
                            onChange={(e) => setUserAreaType(e.target.value)}
                          />
                          <span className="label-text">Maqam</span>
                        </label>
                      </div>
                    )}
                    <div className="form-control">
                      <label className="label cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="userAreaType"
                          className="radio checked:bg-blue-500"
                          value="halqa"
                          onChange={(e) => setUserAreaType(e.target.value)}
                          defaultChecked
                        />
                        <span className="label-text">Halqa</span>
                      </label>
                    </div>
                  </div>
                )}
                <input type="hidden" name="userAreaId" id="userAreaId" />
                <input
                  id="autocomplete"
                  autoComplete="off"
                  type="text"
                  class="input input-bordered input-primary w-full"
                  placeholder={`Select ${
                    active === "halqa" ? userAreaType : active
                  }`}
                  onChange={(e) => setSearchArea(e.target.value)}
                  onClick={() => {
                    if (
                      document
                        .getElementById("autocomplete-list")
                        .classList.contains("hidden")
                    ) {
                      document
                        .getElementById("autocomplete-list")
                        .classList.remove("hidden");
                    } else {
                      document
                        .getElementById("autocomplete-list")
                        .classList.add("hidden");
                    }
                  }}
                />
                <div
                  id="autocomplete-list"
                  class="absolute z-10 hidden max-h-[100px] overflow-y-scroll bg-white border border-gray-300 w-full mt-1"
                >
                  {areas
                    .sort((a, b) => a?.name?.localeCompare(b?.name))
                    .filter((item) => {
                      if (searchArea && searchArea !== "") {
                        if (
                          item?.name
                            ?.toString()
                            ?.toLowerCase()
                            ?.includes(searchArea?.toString()?.toLowerCase())
                        ) {
                          return true;
                        }
                        return false;
                      } else {
                        return true;
                      }
                    })
                    .map((area, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          document.getElementById("userAreaId").value =
                            area?._id;
                          setSelectedId(area?._id);
                          document.getElementById("autocomplete").value = `${
                            area?.name
                          }${
                            userAreaType === "Halqa"
                              ? ` - ${area?.parentId?.name} (${area?.parentType})`
                              : ""
                          }`;
                          document
                            .getElementById("autocomplete-list")
                            .classList.add("hidden");
                          if (
                            !document
                              .getElementById("autocomplete-list")
                              .classList.contains("hidden")
                          ) {
                            document
                              .getElementById("autocomplete-list")
                              .classList.add("hidden");
                          }
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {area?.name}
                        {userAreaType === "Halqa"
                          ? ` - ${area?.parentId?.name} (${area?.parentType})`
                          : ""}
                      </div>
                    ))}
                </div>
                <input
                  type="month"
                  name="month"
                  className="w-full mt-5 mb-5 input input-bordered input-primary"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
                <div className="w-full flex justify-end items-end">
                  <button
                    className="btn"
                    onClick={() => {
                      document
                        .getElementById("filter-area-dialog-close-btn")
                        .click();
                      fetchReports();
                    }}
                  >
                    ok
                  </button>
                </div>
              </div>
            </div>
          </dialog>

          <div className="join xs:w-full">
            {!isMobileView && (
              <div className="w-full">
                <select
                  className="select select-bordered join-item"
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                >
                  <option value={""}>Month</option>
                  {months.map((month, index) => (
                    <option value={month?.value} key={index}>
                      {month.title}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered join-item"
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                >
                  <option disabled value={""}>
                    Year
                  </option>
                  {Array(10)
                    .fill(1)
                    .map((_, index) => (
                      <option key={index} value={2023 + index}>
                        {2023 + index}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {search && (
              <div className="fixed p-3 z-40 rounded-lg top-[140px] left-[5px] w-[calc(100%-10px)] overflow-hidden bg-white min-h-[100px] border">
                <div className="flex flex-col gap-3">
                  <div className="w-full flex flex-col">
                    <select
                      className="select select-bordered w-full rounded-none rounded-tl-lg rounded-tr-lg"
                      onChange={(e) => setMonth(e.target.value)}
                      value={month}
                    >
                      <option value={""}>Month</option>
                      {months.map((month, index) => (
                        <option value={month?.value} key={index}>
                          {month.title}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select select-bordered w-full rounded-none rounded-bl-lg rounded-br-lg"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value={""} disabled>
                        Year
                      </option>
                      {Array(10)
                        .fill(1)
                        .map((_, index) => (
                          <option key={index} value={2023 + index}>
                            {2023 + index}
                          </option>
                        ))}
                    </select>
                  </div>
                  <button className="btn" onClick={searchResults}>
                    Search
                  </button>
                </div>
              </div>
            )}

            <div className="indicator ">
              {/* <span className='indicator-item badge badge-secondary'>new</span> */}
              <button
                className={`btn ${!isMobileView ? "join-item" : ""}`}
                onClick={() =>
                  !isMobileView ? searchResults() : toggleSearch()
                }
              >
                Search
              </button>
              <button
                onClick={() =>
                  document.getElementById("filter-area-dialog").showModal()
                }
                className={`btn ${!isMobileView ? "join-item" : "ms-3"}`}
              >
                filter
              </button>
              <button
                className={`btn ${!isMobileView ? "join-item" : "ms-3"}`}
                onClick={clearFilters}
              >
                Clear
              </button>
              {isMobileView &&
                active !== "province" &&
                !(
                  active === "maqam" &&
                  localStorage.getItem("@type") === "maqam"
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
        {/* localStorage.getItem('@type') === 'province' && ( */}
        <div
          role="tablist"
          className="w-full flex justify-between items-center"
        >
          {["province"].includes(localStorage.getItem("@type")) && (
            <Link
              to={"?active=province"}
              role="tab"
              className={`tab w-full ${
                active === "province" ? "tab-active bg-slate-200" : ""
              }`}
              onClick={() => setNotifyTo("province")}
            >
              Province
            </Link>
          )}
          {["province", "division"].includes(localStorage.getItem("@type")) && (
            <Link
              to={"?active=division"}
              role="tab"
              className={`tab w-full ${
                active === "division" ? "tab-active" : ""
              }`}
              onClick={() => setNotifyTo("division")}
            >
              Division
            </Link>
          )}
          {["province", "maqam"].includes(localStorage.getItem("@type")) && (
            <Link
              to={"?active=maqam"}
              role="tab"
              className={`tab w-full ${active === "maqam" ? "tab-active" : ""}`}
              onClick={() => setNotifyTo("maqam")}
            >
              Maqam
            </Link>
          )}

          {["province", "maqam", "division"].includes(
            localStorage.getItem("@type")
          ) && (
            <Link
              to={"?active=halqa"}
              role="tab"
              className={`tab w-full ${active === "halqa" ? "tab-active" : ""}`}
              onClick={() => setNotifyTo("halqa")}
            >
              Halqa
            </Link>
          )}
        </div>
        {/* )} */}
        {active === "halqa" && localStorage.getItem("@type") === "province" && (
          <div
            role="tablist"
            className="w-full flex justify-between items-center"
          >
            <Link
              to={"?active=halqa&tab=maqam"}
              role="tab"
              className={`tab w-full ${tab === "maqam" ? "tab-active" : ""}`}
            >
              Maqam Halqa
            </Link>
            <Link
              to={"?active=halqa&tab=division"}
              role="tab"
              className={`tab w-full ${tab === "division" ? "tab-active" : ""}`}
            >
              Division Halqa
            </Link>
          </div>
        )}
        <div className="relative overflow-y-scroll gap-3 w-full items-center p-5 justify-center h-[calc(100vh-65.6px-64px-48px)]">
          {userType !== "halqa" ? (
            filterAllData[active]?.length < 1 ? (
              <NoReports />
            ) : active === "halqa" &&
              tab === "division" &&
              filterAllData[active]?.filter(
                (obj) => obj?.halqaAreaId?.parentType === "Tehsil"
              ).length < 1 ? (
              <NoReports />
            ) : active === "halqa" &&
              tab === "maqam" &&
              filterAllData[active]?.filter(
                (obj) => obj?.halqaAreaId?.parentType === "Maqam"
              ).length < 1 ? (
              <NoReports />
            ) : (
              filterAllData[active]?.map((obj) =>
                active === "halqa" && tab === "division" ? (
                  obj?.halqaAreaId?.parentType === "Tehsil" && (
                    <div
                      key={obj?._id}
                      className="card-body flex items-between justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col"
                    >
                      <div className="flex w-full flex-col items-start justify-center">
                        <span className="text-lg font-semibold">
                          {obj?.[active + "AreaId"]?.name || "UNKNOWN"}
                          {" - "}
                          {obj?.[active + "AreaId"]?.parentId?.name ||
                            "UNKNOWN"}
                          {" - "}
                          {moment(obj?.month).format("MMMM YYYY")}
                        </span>
                        <span>
                          Last Modified: {moment(obj?.updatedAt).fromNow()}
                        </span>
                      </div>
                      <div className="flex items-end w-full justify-end gap-3 ">
                        <button
                          className="btn"
                          onClick={() => viewReport(obj?._id)}
                        >
                          <FaEye />
                        </button>
                      </div>
                    </div>
                  )
                ) : active === "halqa" && tab === "maqam" ? (
                  obj?.halqaAreaId?.parentType === "Maqam" && (
                    <div
                      key={obj?._id}
                      className="card-body flex items-between justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col"
                    >
                      <div className="flex w-full flex-col items-start justify-center">
                        <span className="text-lg font-semibold">
                          {obj?.[active + "AreaId"]?.name || "UNKNOWN"}
                          {" - "}
                          {obj?.[active + "AreaId"]?.parentId?.name ||
                            "UNKNOWN"}
                          {" - "}
                          {moment(obj?.month).format("MMMM YYYY")}
                        </span>
                        <span>
                          Last Modified: {moment(obj?.updatedAt).fromNow()}
                        </span>
                      </div>
                      <div className="flex items-end w-full justify-end gap-3 ">
                        <button
                          className="btn"
                          onClick={() => viewReport(obj?._id)}
                        >
                          <FaEye />
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  <div
                    key={obj?._id}
                    className="card-body flex items-between justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col"
                  >
                    <div className="flex w-full flex-col items-start justify-center">
                      <span className="text-lg font-semibold">
                        {obj?.[active + "AreaId"]?.name || "UNKNOWN"}
                        {" - "}
                        {obj?.[active + "AreaId"]?.province?.name || "UNKNOWN"}
                        {" - "}
                        {moment(obj?.month).format("MMMM YYYY")}
                      </span>
                      <span>
                        Last Modified: {moment(obj?.updatedAt).fromNow()}
                      </span>
                    </div>
                    <div className="flex items-end w-full justify-end gap-3 ">
                      <button
                        className="btn"
                        onClick={() => viewReport(obj?._id)}
                      >
                        <FaEye />
                      </button>

                      {active === localStorage.getItem("@type") && (
                        <button
                          className="btn"
                          onClick={() => editReport(obj?._id)}
                        >
                          <FaEdit />
                        </button>
                      )}
                    </div>
                  </div>
                )
              )
            )
          ) : filterData?.length < 1 ? (
            <NoReports />
          ) : (
            filterData
              .sort((a, b) => a.createdAt - b.createdAt)
              ?.map((obj) => (
                <div
                  key={obj?._id}
                  className="card-body flex items-between justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col"
                >
                  <div className="flex w-full flex-col items-start justify-center">
                    <span className="text-lg font-semibold">
                      {moment(obj?.month).format("MMMM YYYY")}
                    </span>
                    <span>
                      Last Modified: {moment(obj?.updatedAt).fromNow()}
                    </span>
                  </div>
                  <div className="flex items-end w-full justify-end gap-3 ">
                    <button
                      className="btn"
                      onClick={() => viewReport(obj?._id)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn"
                      onClick={() => editReport(obj?._id)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </GeneralLayout>
  );
};
