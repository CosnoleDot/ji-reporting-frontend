import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { GeneralLayout, Loader } from "../components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import instance from "../api/instrance";
import moment from "moment/moment";

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
  const navigate = useNavigate();
  const userType = localStorage.getItem("@type");
  const [loading, setLoading] = useState(false);

  const handleReport = () => {
    navigate(`/reports/create`);
  };

  const viewReport = async (id) => {
    navigate(`view/${id}`);
  };
  const editReport = (id) => {
    navigate(`edit/${id}`);
  };
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`reports/${userType}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        setReports(response?.data?.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
      setLoading(false);
    };

    fetchReports();
  }, [userType]);

  return (
    <GeneralLayout active={"reports"}>
      <div className="relative flex flex-col gap-3 items-center p-5 justify-center h-[calc(100vh-65.6px-64px)]">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-bold text-xl hidden lg:block xl:block">
            Reports
          </h3>
          <div className="join">
            <select className="select select-bordered join-item">
              <option disabled selected>
                Month
              </option>
              {months.map((month, index) => (
                <option value={month.value} key={index}>
                  {month.title}
                </option>
              ))}
            </select>
            <select className="select select-bordered join-item">
              <option disabled selected>
                Year
              </option>
              {Array(10)
                .fill(1)
                .map((_, index) => (
                  <option key={index}>{2023 + index}</option>
                ))}
            </select>
            <div className="indicator">
              {/* <span className='indicator-item badge badge-secondary'>new</span> */}
              <button className="btn join-item">Search</button>
            </div>
          </div>
          {localStorage.getItem("@type") !== "province" && (
            <button className="btn" onClick={handleReport}>
              <FaPlus />
              <span className="hidden lg:block xl:block">New Report</span>
            </button>
          )}
        </div>
        <div className="relative overflow-y-scroll gap-3 w-full items-center p-5 justify-center h-[calc(100vh-65.6px-64px-48px)]">
          {reports?.map((obj) => (
            <div
              key={obj?._id}
              className="card-body flex items-center justify-between w-full p-5 mb-1 bg-slate-200 rounded-xl flex-row"
            >
              <div className="flex flex-col items-start justify-center">
                <span className="text-lg font-semibold">
                  {moment(obj?.month).format("MMMM Do YYYY , hh:mm:ss a")}
                </span>
                <span>
                  Last Modified:
                  {moment(obj?.updatedAt).startOf("day").fromNow()}
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button className="btn" onClick={() => viewReport(obj?._id)}>
                  <FaEye />
                </button>
                <button className="btn" onClick={() => editReport(obj?._id)}>
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
