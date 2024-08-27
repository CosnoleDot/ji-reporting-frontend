import React, { useContext, useEffect, useState } from "react";
import {
  IlaqaContext,
  MaqamReportContext,
  MeContext,
  useToastState,
} from "../../context";
import { FaEdit, FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import { NoReports, months } from "../Reports";
import { FilterDialog } from "./FilterDialog";
import { useNavigate } from "react-router-dom";
import { UIContext } from "../../context/ui";
import { SearchPage } from "./SearchPage";
import instance from "../../api/instrance";

export const MaqamReports = () => {
  const { filterMuntakhib } = useContext(UIContext);
  const m = useContext(MaqamReportContext);
  const ilaqas = useContext(IlaqaContext);
  const mReports = m?.reports;
  const total = m?.length;
  const [filterAllData, setFilterAllData] = useState([]);
  const { dispatch } = useToastState();
  const [search, showSearch] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2023");
  const me = useContext(MeContext);
  const [isSearch, setIsSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { getMaqamReports } = useContext(UIContext);
  const [disable, setDisable] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const navigate = useNavigate();
  const itemsPerPage = 10;
  useEffect(() => {
    const uniqueArray = mReports?.reduce((acc, current) => {
      const x = acc.find((item) => item?._id === current?._id);
      if (!x) {
        acc.push(current);
      }
      return acc;
    }, []);
    setFilterAllData(uniqueArray);
  }, [mReports]);
  const searchResults = async () => {
    showSearch(false);
    if (year !== "" && month !== "") {
      try {
        setIsSearch(true);
        const req = await instance.get(
          `/reports/maqam?year=${year}&month=${month}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("@token")}`,
            },
          }
        );

        if (req) {
          setSearchData([]);
          setSearchData(req.data.data.data);
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: "ERROR",
          payload: err?.response?.data?.message || err?.message,
        });
      }
    }
  };
  const toggleSearch = () => {
    showSearch(!search);
  };
  const clearFilters = () => {
    setMonth("");
    setYear("2023");
    setFilterAllData(mReports);
    setIsFilter(false);
    setIsSearch(false);
    document.getElementById("autocomplete").value = "";
  };

  const viewReport = async (id, areaId) => {
    filterMuntakhib(areaId);
    navigate(`view/${id}`);
  };
  const editReport = (id) => {
    navigate(`edit/${id}`);
  };
  const handlePrint = (id) => {
    window.open(`maqam-report/print/${id}`, "blank");
  };

  let totalPages = Math.ceil(total / itemsPerPage);

  const currentData = filterAllData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      const inset = currentPage * itemsPerPage;
      const offset = itemsPerPage;
      if (filterAllData?.length <= total) {
        getMaqamReports(inset, offset);
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
  return (
    <>
      <div className="md:join xs:w-full mb-4 flex justify-between items-center">
        {!isMobileView && (
          <div className="w-full flex">
            <select
              className="select select-bordered select-sm  join-item"
              onChange={(e) => setMonth(e.target.value)}
              value={month}
            >
              <option value={""}>Month</option>
              {months?.map((month, index) => (
                <option value={month?.value} key={index}>
                  {month.title}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered select-sm  join-item"
              onChange={(e) => setYear(e.target.value)}
              value={year}
            >
              <option disabled value={""}>
                Year
              </option>
              {Array(10)
                .fill(1)
                ?.map((_, index) => (
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
                {isMobileView && (
                  <div className="w-full flex justify-end items-center ">
                    <button
                      className="btn-square"
                      onClick={() => showSearch(false)}
                    >
                      ✕
                    </button>
                  </div>
                )}
                <select
                  className="select select-bordered select-sm w-full rounded-none rounded-tl-lg rounded-tr-lg"
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                >
                  <option value={""}>Month</option>
                  {months?.map((month, index) => (
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
                    ?.fill(1)
                    ?.map((_, index) => (
                      <option key={index} value={2023 + index}>
                        {2023 + index}
                      </option>
                    ))}
                </select>
              </div>
              <button
                className="font-inter px-2 text-[14px] bg-primary flex justify-center text-white p-[6px] mb-1 rounded font-medium leading-[20px] text-left"
                onClick={searchResults}
              >
                Search
              </button>
            </div>
          </div>
        )}

        <div className="indicator flex items-center justify-end w-full">
          <button
            className={`font-inter px-2 text-[14px] bg-primary flex justify-center text-white p-[6px] mb-1 rounded font-medium leading-[20px] text-left ${
              !isMobileView ? "join-item" : ""
            }`}
            onClick={() => (!isMobileView ? searchResults() : toggleSearch())}
          >
            Search
          </button>
          {me?.userAreaType !== "Halqa" && (
            <button
              onClick={() => {
                document.getElementById("filter-area-dialog").showModal();
                setIsSearch(false);
              }}
              className={`font-inter text-[14px] bg-primary flex justify-center text-white p-[6px] mb-1 rounded font-medium leading-[20px] text-left ${
                !isMobileView ? "join-item" : "ms-3"
              }`}
            >
              filter
            </button>
          )}
          <button
            className={`font-inter text-[14px] bg-primary flex justify-center text-white p-[6px] mb-1 rounded font-medium leading-[20px] text-left ${
              !isMobileView ? "join-item" : "ms-3"
            }`}
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>
      </div>
      {!isSearch ? (
        <>
          {currentData?.length > 0 ? (
            <table className="table mb-7 w-full">
              {/* Head */}
              <thead>
                <tr>
                  <th className="text-left">Report</th>
                  <th className="text-left">Last modified</th>
                  <th className="text-left">Month</th>
                  <th className="md:block hidden"></th>
                  <th className="md:block hidden"></th>
                  <th className="text-left">Action</th>
                </tr>
              </thead>
              {/* Body */}
              <tbody>
                {currentData.map((p, index) => (
                  <tr key={index}>
                    <td>
                      <span className="font-medium md:text-sm text-xs leading-[16.94px] text-left font-inter text-heading">
                        {p?.maqamAreaId?.name}
                      </span>
                    </td>
                    <td>
                      <span className="font-medium md:text-sm text-xs leading-[16.94px] text-left font-inter text-heading">
                        {moment(p?.updatedAt).fromNow()}
                      </span>
                    </td>
                    <td>
                      <span className="font-medium md:text-sm text-xs leading-[16.94px] text-left font-inter text-heading">
                        {moment(p?.month).format("MMMM YYYY")}
                      </span>
                    </td>
                    <td className="md:block hidden"></td>
                    <td className="md:block hidden"></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          onClick={() => navigate(`/reports/view/${p._id}`)}
                          className="cursor-pointer font-inter md:text-sm text-xs font-medium leading-[16.94px] text-left"
                        >
                          View
                        </span>
                        {me?.userAreaType === "Maqam" && (
                          <span
                            onClick={() => navigate(`/reports/edit/${p._id}`)}
                            className="cursor-pointer font-inter md:text-sm text-xs font-medium leading-[16.94px] text-left text-green"
                          >
                            Edit
                          </span>
                        )}
                        <span
                          onClick={() => handlePrint(p?._id)}
                          className="cursor-pointer font-inter md:text-sm text-xs font-medium leading-[16.94px] text-left text-blue"
                        >
                          Print
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoReports />
          )}
          {!isFilter && (
            <div className="flex justify-between mt-4">
              <button
                className={`font-inter text-[14px] ${
                  currentPage === 1 ? "bg-slate-500" : "bg-primary"
                }  flex justify-center text-white p-2 rounded font-medium leading-[20px] text-left cursor-pointer`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="cursor-pointer text-primary font-inter md:text-sm text-xs font-medium leading-[16.94px] text-left">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`font-inter text-[14px] ${
                  currentPage === totalPages ? "bg-slate-500" : "bg-primary"
                }  flex justify-center text-white p-2 rounded font-medium leading-[20px] text-left cursor-pointer`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <SearchPage data={searchData} area={"maqam"} />
      )}
      <dialog id="filter-area-dialog" className="modal">
        <FilterDialog
          setFilterAllData={setFilterAllData}
          setIsFilter={setIsFilter}
        />
      </dialog>
    </>
  );
};
