import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../components";
import { FaEdit, FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import instance from "../api/instrance";
import { Link, useNavigate } from "react-router-dom";
import { NoReports, getDivisionByTehsil, months } from "./Reports";
import { MdCancel } from "react-icons/md";
import { MeContext } from "../context";
import { UIContext } from "../context/ui";
// import { ProvinceContext } from "../context";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const PersonalReportsDashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2023");
  const [isMobileView, setIsMobileView] = useState(false);
  const [toggle, setToggle] = useState(false);
  const itemsPerPage = 10;
  const [isSearch, setIsSearch] = useState(false);
  const { setLoading } = useContext(UIContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const me = useContext(MeContext);
  const { nazim } = useContext(UIContext);
  const [rukanId, setRukanId] = useState(null);
  // const provinces = useContext(ProvinceContext);
  let navigate = useNavigate();
  const getAllReports = async (inset, offset) => {
    setLoading(true);

    let req;
    if (rukanId) {
      req = await instance.get(
        `/umeedwar/${rukanId}?inset=${inset ? inset : 0}&offset=${
          offset ? offset : 10
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        }
      );
    } else {
      req = await instance.get(
        `/umeedwar?inset=${inset ? inset : 0}&offset=${offset ? offset : 10}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        }
      );
    }

    setFilteredData(req?.data?.data?.data);
    setTotal(req?.data?.data?.length);
    setData(req?.data?.data?.data);
    setLoading(false);
  };
  useEffect(() => {
    getAllReports();
  }, []);
  const viewReport = async (id) => {
    navigate(`view/${id}`);
  };
  const editReport = (id) => {
    navigate(`edit/${id}`);
  };
  const printReport = (id) => {
    window.open(`personalReport/print/${id}`, "blank");
  };
  useEffect(() => {
    if (window) {
      if (window.innerWidth < 520) {
        setIsMobileView(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const handleClear = () => {
    setIsSearch(false);
    setRukanId(null);
    getAllReports(0, 10);
  };

  const searchResults = async () => {
    setIsSearch(true);
    setToggle(false);
    setLoading(true);
    const findData = `${year}-${
      parseInt(month) > 9 ? month : "0" + month.toString()
    }`;
    const req = await instance.get(`/umeedwar?date=${findData}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      },
    });
    setLoading(false);
    setFilteredData(req?.data?.data?.data);
  };
  let totalPages = Math.ceil(total / itemsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      const inset = (currentPage - 2) * itemsPerPage;
      const offset = itemsPerPage;
      setFilteredData([]);
      setData([]);
      getAllReports(inset, offset);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      const inset = currentPage * itemsPerPage;
      const offset = itemsPerPage;
      setFilteredData([]);
      setData([]);
      getAllReports(inset, offset);
    }
  };

  return (
    <GeneralLayout title={"Personal Dashboard"} active={"personalReports"}>
      <div className="w-full flex flex-col justify-start p-2 md:p-5">
        <div className="w-full overflow-hidden overflow-x-scroll md:justify-center md:items-center flex md:flex-row flex-col gap-4 md:gap-2 m-2">
          <div className="w-full flex gap-4">
            {!toggle ? (
              <>
                {localStorage.getItem("@nazimType") !== "umeedwar" &&
                  localStorage.getItem("@nazimType") !== "rukan" && (
                    <button
                      className="font-inter w-full md:text-[14px] text-[10px] bg-primary flex justify-center text-white p-2 rounded font-medium leading-[20px] text-left"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  )}
                {localStorage.getItem("@nazimType") !== "umeedwar" &&
                  localStorage.getItem("@nazimType") !== "rukan" && (
                    <button
                      className="font-inter w-full md:text-[14px] text-[10px] bg-primary flex justify-center text-white p-2 rounded font-medium leading-[20px] text-left"
                      onClick={() => setToggle(true)}
                    >
                      Search
                    </button>
                  )}
              </>
            ) : (
              <div className=" p-3 z-40 rounded-lg w-full overflow-hidden bg-white border border-inputBorder">
                <div className="flex gap-3">
                  <div className="w-full flex">
                    <select
                      className="select select-bordered select-sm w-full rounded-none rounded-tl-lg rounded-tr-lg"
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
                      className="select select-bordered select-sm w-full rounded-none rounded-bl-lg rounded-br-lg"
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
                  <div className="w-full flex justify-center items-center gap-2">
                    <button
                      className="font-inter w-full md:text-[14px] text-[10px] bg-primary flex justify-center text-white p-2 rounded font-medium leading-[20px] text-left"
                      onClick={searchResults}
                    >
                      Search
                    </button>
                    <button
                      className="font-inter w-full md:text-[14px] text-[10px] bg-primary flex items-center justify-center text-white p-2 rounded font-medium leading-[20px] text-left"
                      onClick={() => {
                        setMonth("");
                        setYear("2023");
                        setToggle(false);
                      }}
                    >
                      <MdCancel />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {me?.nazimType !== "nazim" && !toggle && (
              <button
                className="font-inter w-full md:text-[14px] text-[10px] bg-primary flex justify-center text-white p-2 rounded font-medium leading-[20px] text-left"
                onClick={() => navigate("/personalReport/create")}
              >
                + New Report
              </button>
            )}
          </div>
        </div>
        <div className="w-full overflow-x-scroll h-[calc(100vh-64px-54px)] flex flex-col justify-start items-start">
          {filteredData?.length > 0 ? (
            <table className="table mb-7">
              {/* head */}
              <thead className="">
                <tr className="w-full flex justify-between ">
                  <th className="text-start">Area</th>
                  <th className="text-start">Name</th>
                  <th className="text-center">Last Modified</th>
                  <th className="md:block hidden"></th>
                  <th className="md:block hidden"></th>
                  <th className="text-left mr-2">Action</th>
                </tr>
              </thead>
              <tbody
                className="w-full mb-3 h-[300px] overflow-auto overflow-y-scroll"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {filteredData?.map((obj, index) => (
                  <tr key={index} className={`w-full flex`}>
                    <td className="w-full">
                      <p
                        className="font-inter text-[14px] font-medium leading-[16.94px] text-left"
                        style={{
                          textTransform: "capitalize",
                          fontSize: "smaller",
                        }}
                      >
                        {obj?.areaId?.name}
                      </p>
                    </td>
                    <td className="w-full">
                      <span
                        style={{
                          textTransform: "capitalize",
                          fontSize: "smaller",
                        }}
                        className="text-center text-destructive font-medium text-[14px] leading-4"
                      >
                        {obj?.userId?.name?.split("").length > 20
                          ? obj?.userId?.name?.split("").slice(0, 20).join("")
                          : obj?.userId?.name}
                      </span>
                    </td>
                    <td className="w-full text-[14px]">
                      {moment(obj?.updatedAt).fromNow()}
                    </td>
                    <td className="w-[50%] md:block hidden"></td>
                    <td className="w-[50%] md:block hidden"></td>
                    <td className="w-full">
                      <div className="flex items-center justify-end gap-2">
                        <span
                          className="cursor-pointer font-inter md:text-sm text-xs font-medium leading-[16.94px] text-left"
                          onClick={() => viewReport(obj?._id)}
                        >
                          View
                        </span>
                        {me?._id === obj?.userId?._id && (
                          <span
                            className="cursor-pointer font-inter md:text-sm text-xs font-medium leading-[16.94px] text-left text-green"
                            onClick={() => editReport(obj?._id)}
                          >
                            Edit
                          </span>
                        )}
                        <Link
                          className="cursor-pointer font-inter md:text-sm text-xs font-medium leading-[16.94px] text-left text-blue"
                          to={`/personalReport/print/${obj?._id}`}
                        >
                          Print
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoReports />
          )}

          {!isSearch && (
            <div className="flex w-full gap-4 px-4 justify-end items-center mt-4">
              <select
                readOnly
                disabled
                name="items_per_page"
                id="items"
                className="select select-sm max-w-xs bg-gray-200 rounded-full"
              >
                <option value="" disabled selected>
                  rows per page 10
                </option>
              </select>

              {/* Previous Button */}
              <button
                className="rounded-full border-none w-7 h-7"
                disabled={currentPage === 1}
                onClick={handlePrevPage}
              >
                <IoIosArrowBack
                  className={`text-[1.5rem] rounded-full bg-gray-200 ${
                    currentPage === 1 && "text-gray-400"
                  }`}
                />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center">
                <span
                  className={`rounded-full text-bold text-sm ${
                    currentPage === 1 && "border-2 border-gray-500"
                  } mx-1 bg-white w-7 h-7 flex justify-center items-center`}
                >
                  1
                </span>

                {totalPages > 1 && (
                  <button
                    className={`rounded-full text-bold text-sm ${
                      currentPage === 2 && "border-2 border-gray-500"
                    } mx-1 bg-white w-7 h-7 flex justify-center items-center`}
                  >
                    2
                  </button>
                )}
                {totalPages > 3 && <span>...</span>}
                {totalPages && currentPage > 2 && currentPage < totalPages && (
                  <span
                    className={`rounded-full text-bold text-sm ${
                      currentPage !== totalPages && "border-2 border-gray-500"
                    } mx-1 bg-white w-7 h-7 flex justify-center items-center`}
                  >
                    {currentPage}
                  </span>
                )}
                {totalPages && totalPages > 2 && (
                  <span
                    className={`rounded-full text-bold text-sm ${
                      currentPage === totalPages && "border-2 border-gray-500"
                    } mx-1 bg-white w-7 h-7 flex justify-center items-center`}
                  >
                    {totalPages}
                  </span>
                )}
              </div>

              {/* Next Button */}
              <button
                className="rounded-full border-none w-7 h-7"
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              >
                <IoIosArrowForward
                  className={`text-[1.5rem] rounded-full bg-gray-200 ${
                    currentPage === totalPages && "text-gray-400"
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </GeneralLayout>
  );
};
