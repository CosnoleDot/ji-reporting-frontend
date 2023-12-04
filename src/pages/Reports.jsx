import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { GeneralLayout, Loader } from "../components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useToastState } from "../context";
import instance from "../api/instrance";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
export const Reports = () => {
  const [reports, setReports] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(localStorage.getItem("@type"));
  useEffect(() => {
    setUserType(localStorage.getItem("@type"));
  }, [localStorage]);
  const [search, showSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [me, setMe] = useState({});
  const { dispatch } = useToastState();
  const [active, setActive] = useState("maqam");
  const params = useLocation();
  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};

      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }

      setActive(queryParams.active);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params]);
  const getMe = async () => {
    const req = await instance.get("/user/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
    });
    if (req) {
      setMe(req.data.data);
    }
    try {
    } catch (err) {
      dispatch({ type: "ERROR", payload: err?.response?.data?.message });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("@token")) getMe();
  }, []);

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
  const fetchReports = async () => {
    setLoading(true);
    try {
      let response;
      if (userType === "province") {
        const m = await instance.get(`reports/maqam`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        const h = await instance.get(`reports/halqa`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        const d = await instance.get(`reports/division`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        setAllReports({
          maqam: m.data.data,
          halqa: h.data.data,
          division: d.data.data,
        });
        console.log({
          maqam: m.data.data,
          halqa: h.data.data,
          division: d.data.data,
        });
      } else {
        response = await instance.get(`reports/${userType}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        setReports(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchReports();
  }, [userType]);

  const searchResults = () => {
    if (year !== null && month !== null) {
      const filteredData = reports.reduce((acc, curr) => {
        const reportYear = parseInt((curr?.month).split("-")[0]);
        const reportMonth = parseInt((curr?.month).split("-")[1]);
        if (reportMonth === parseInt(month) && reportYear === parseInt(year)) {
          acc.push(curr);
        }
        return acc;
      }, []);
      setReports(filteredData);
      showSearch(false);
    } else if (year !== null) {
      const filteredData = reports.filter((curr) => {
        const reportedYear = (curr?.month).split("-")[0];
        return reportedYear === year;
      });
      setReports(filteredData);
      showSearch(false);
    } else if (year === null && month === null) {
      dispatch({ type: "ERROR", payload: "Date is required" });
    } else {
      dispatch({ type: "ERROR", payload: "Enter year with month" });
    }
  };

  useEffect(() => {
    if (window) {
      if (window.innerWidth < 520) {
        setIsMobileView(true);
      }
    }
  }, [window.innerWidth]);
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
          <div className="join xs:w-full gap-3">
            {!isMobileView && (
              <div className="w-full">
                <select
                  className="select select-bordered join-item"
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option disabled selected>
                    Month
                  </option>
                  {months.map((month, index) => (
                    <option value={month?.value} key={index}>
                      {month.title}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered join-item"
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option disabled selected>
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
              <div className="fixed z-40 rounded-lg top-[140px] left-[5px] w-[calc(100%-10px)] bg-white min-h-[200px] border">
                <div className="flex  gap-3">
                  <div className="w-full">
                    <select
                      className="select select-bordered join-item"
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option disabled selected>
                        Month
                      </option>
                      {months.map((month, index) => (
                        <option value={month?.value} key={index}>
                          {month.title}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select select-bordered join-item"
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option disabled selected>
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
                  <button className="btn join-item" onClick={searchResults}>
                    Search
                  </button>
                </div>
              </div>
            )}

            <div className="indicator ">
              {/* <span className='indicator-item badge badge-secondary'>new</span> */}
              <button
                className="btn join-item"
                onClick={() =>
                  !isMobileView ? searchResults() : toggleSearch()
                }
              >
                Search
              </button>
            </div>
          </div>
          {localStorage.getItem("@type") !== "province" && (
            <button className="btn " onClick={handleReport}>
              <FaPlus />
              <span className="hidden lg:block xl:block">New Report</span>
            </button>
          )}
        </div>
        {localStorage.getItem("@type") === "province" && (
          <div
            role="tablist"
            className="w-full flex justify-between items-center"
          >
            <Link
              to={"?active=division"}
              role="tab"
              className={`tab w-full ${
                active === "division" ? "tab-active bg-slate-200" : ""
              }`}
            >
              Division
            </Link>

            <Link
              to={"?active=maqam"}
              role="tab"
              className={`tab w-full ${
                active === "maqam" ? "tab-active bg-slate-200" : ""
              }`}
            >
              Maqam
            </Link>

            <Link
              to={"?active=halqa"}
              role="tab"
              className={`tab w-full ${
                active === "halqa" ? "tab-active bg-slate-200" : ""
              }`}
            >
              Halqa
            </Link>
          </div>
        )}
        <div className="relative overflow-y-scroll gap-3 w-full items-center p-5 justify-center h-[calc(100vh-65.6px-64px-48px)]">
          {userType === "province"
            ? allReports[active]?.map((obj) => (
                <div
                  key={obj?._id}
                  className="card-body flex items-between justify-between w-full p-5 mb-1 bg-slate-200 rounded-xl lg:flex-row md:flex-row sm:flex-col"
                >
                  <div className="flex w-full flex-col items-start justify-center">
                    <span className="text-lg font-semibold">
                      {obj?.[active + "AreaId"]?.name || "UNKNOWN"} - {" "}
                      {moment(obj?.month).format("MMMM YYYY")}
                    </span>
                    <span>
                      Last Modified:
                      {moment(obj?.updatedAt).startOf("day").fromNow()}
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
              ))
            : reports?.map((obj) => (
                <div
                  key={obj?._id}
                  className="card-body flex items-between justify-between w-full p-5 mb-1 bg-slate-200 rounded-xl lg:flex-row md:flex-row sm:flex-col"
                >
                  <div className="flex w-full flex-col items-start justify-center">
                    <span className="text-lg font-semibold">
                      {moment(obj?.month).format("MMMM YYYY")}
                    </span>
                    <span>
                      Last Modified:
                      {moment(obj?.updatedAt).startOf("day").fromNow()}
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
              ))}
        </div>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
