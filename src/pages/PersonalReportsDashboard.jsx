import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../components";
import { FaEdit, FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import instance from "../api/instrance";
import { useNavigate } from "react-router-dom";
import { NoReports, getDivisionByTehsil, months } from "./Reports";
import { MdCancel } from "react-icons/md";
import { MeContext } from "../context";
import { UIContext } from "../context/ui";
// import { ProvinceContext } from "../context";

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
        `/umeedwar/all/${rukanId}?inset=${inset ? inset : 0}&offset=${
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
  };
  useEffect(() => {
    getAllReports();
  }, [rukanId]);
  const searchResults = async () => {
    setIsSearch(true);
    setToggle(false);
    const findData = `${year}-${
      parseInt(month) > 9 ? month : "0" + month.toString()
    }`;
    const req = await instance.get(`/umeedwar?date=${findData}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      },
    });
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
      <div className="w-full flex flex-col justify-start items-center p-5">
        <div className="w-full overflow-hidden overflow-x-scroll md:justify-center md:items-center flex gap-2 m-2">
          <select
            name="nazim"
            className="select w-full border-gray-200 max-w-xs"
            value={rukanId ? rukanId : "none"}
            onChange={(e) => {
              setRukanId(e.target.value);
            }}
          >
            <option disabled selected value={"none"}>
              Name...
            </option>
            {nazim
              ?.filter((n) => n?.nazimType && n?.nazimType !== "nazim")
              .map((nazim) => (
                <option key={nazim._id} value={nazim._id}>
                  {nazim.name} Of {nazim.userAreaId.name}
                </option>
              ))}
          </select>
          {rukanId && (
            <button className="btn" onClick={getAllReports}>
              Get All
            </button>
          )}
          <button className="btn" onClick={handleClear}>
            Clear
          </button>
          <button className="btn" onClick={() => setToggle(true)}>
            Search
          </button>
          {toggle && (
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
                <div className="w-full flex justify-center items-center gap-2">
                  <button className="btn" onClick={searchResults}>
                    Search
                  </button>
                  <button
                    className="btn"
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
          {me?.nazimType !== "nazim" && (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/personalReport/create")}
            >
              + New Report
            </button>
          )}
        </div>
        <div className="w-full overflow-hidden overflow-y-scroll h-[calc(100vh-64px-64px-54px-76px)] flex flex-col justify-start items-start">
          {filteredData?.length > 0 ? (
            filteredData?.map((obj, index) => (
              <div
                key={index}
                className="card-body flex items-center max-h-[170px]  justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col mt-5"
              >
                <div className="flex w-full flex-col items-start justify-center">
                  <span className="text-lg font-semibold" key={index}>
                    {`${obj?.userId?.name} from ${obj?.areaId?.name}  `}
                    {moment(obj?.month).format("MMMM YYYY")}
                  </span>
                  <span>Last Modified: {moment(obj?.updatedAt).fromNow()}</span>
                </div>
                <div className="flex items-center w-full justify-end gap-3 ">
                  <button className="btn" onClick={() => viewReport(obj?._id)}>
                    <FaEye />
                  </button>
                  {me?._id === obj?.userId?._id && (
                    <button
                      className="btn"
                      onClick={() => editReport(obj?._id)}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button className="btn" onClick={() => printReport(obj?._id)}>
                    <FaPrint />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <NoReports />
          )}
          {!isSearch && (
            <div className="flex w-full justify-between mt-4">
              <button
                className="btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </GeneralLayout>
  );
};
