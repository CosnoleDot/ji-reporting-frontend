import React, { useContext, useEffect, useState } from "react";
import { HalqaReportContext, HalqaReportTabContext, MeContext, useToastState } from "../../context";
import { FaEdit, FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import { NoReports, months } from "../Reports";
import { FilterDialog } from "./FilterDialog";
import { Link, useNavigate } from "react-router-dom";
import { UIContext } from "../../context/ui";
import instance from "../../api/instrance";

export const HalqaReports = () => {
  
  const [tab, setTab] = useState("maqam");
  const [filterData, setFilterData] = useState([]);
  const { dispatch } = useToastState();
  const [search, showSearch] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2023");
  const [data, setData]=useState([])
  const me = useContext(MeContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [length,setLength] = useState(1);
  const itemsPerPage = 10;
  const getHalqaReportsTab = async (inset, offset, tab) => {
    setLoading(true)
    if(tab){
      try {
        const req = await instance.get(
          `/reports/halqa?inset=${inset}&offset=${offset}&tab=${tab}`,
          { 
            headers: {
              Authorization: `Bearer ${localStorage.getItem("@token")}`,
            },
          }
        );
        if (req) {
         setData(req.data.data.data)
         setLength(req.data.data.length)
        }
      }
      catch (err) {
        console.log(err);
        dispatch({
          type: "ERROR",
          payload: err?.response?.data?.message || err?.message,
        });
      }
      setLoading(false)
    }
  };

  // const searchResults = () => {
  //   if (year !== "" && month !== "") {
  //     let filteredData = { ...hReports };
  //     filteredData = hReports?.filter((i) => {
  //       const [f_year, f_month] = [
  //         i?.month?.split("-")[0],
  //         i?.month?.split("-")[1],
  //       ];
  //       return (
  //         parseInt(year) === parseInt(f_year) &&
  //         parseInt(month) === parseInt(f_month)
  //       );
  //     });
  //     showSearch(false);
  //     setFilterAllData(filteredData);
  //   } else if (year !== "" && month === "") {
  //     let filteredData = { ...hReports };
  //     filteredData = hReports?.filter((i) => {
  //       const f_year = i?.month?.split("-")[0];
  //       return parseInt(year) === parseInt(f_year);
  //     });
  //     showSearch(false);
  //     setFilterAllData(filteredData);
  //   } else if (year === "" && month !== "") {
  //     dispatch({ type: "ERROR", payload: "Enter year with month" });
  //     setFilterAllData(hReports);
  //   } else if (year === "" && month === "") {
  //     dispatch({ type: "ERROR", payload: "Date is required" });
  //     setFilterAllData(hReports);
  //   } else {
  //     setFilterAllData(hReports);
  //   }
  // };
  const toggleSearch = () => {
    showSearch(!search);
  };
  const clearFilters = () => {
    setMonth("");
    setYear("2023");
    setFilterAllData(hReports);
    document.getElementById("autocomplete").value = "";
  };

  const viewReport = async (id) => {
    navigate(`view/${id}`);
  };
  const editReport = (id) => {
    navigate(`edit/${id}`);
  };
  let totalPages =  Math.ceil(length / itemsPerPage);
 

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
      setData([])
      setTab(tab) 
        tabClick(tab);
        getHalqaReportsTab(currentPage  * itemsPerPage, itemsPerPage, tab)
  
    }
  };
 
      const tabClick =(tab)=> {
       setData([])
        setTab(tab) 
        getHalqaReportsTab((currentPage -1) * itemsPerPage, itemsPerPage, tab);
      
      }
    
  return (
    <>
      <div
        role="tablist"
        className="w-full flex justify-between items-center mb-4"
      >
        <Link
          to={"?active=halqa&tab=maqam"}
          role="tab"
          className={`tab flex justify-center items-center w-full ${
            tab === "maqam" ? "tab-active" : ""
          }`}
          onClick={() => tabClick("maqam")}
        >
          Maqam Halqa
        </Link>
        <Link
          to={"?active=halqa&tab=division"}
          role="tab"
          className={`tab flex justify-center items-center w-full ${
            tab === "division" ? "tab-active" : ""
          }`}
          onClick={() =>  tabClick("division")}
        >
          Division Halqa
        </Link>
        <Link
          to={"?active=halqa&tab=ilaqa"}
          role="tab"
          className={`tab flex justify-center items-center w-full ${
            tab === "ilaqa" ? "tab-active" : ""
          }`}
          onClick={() => tabClick("ilaqa")}
        >
          Ilaqa Halqa
        </Link>
      </div>
      <div className="join xs:w-full mb-4">
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
            onClick={() => (!isMobileView ? searchResults() : toggleSearch())}
          >
            Search
          </button>
          {me?.userAreaType !== "Halqa" && (
            <button
              onClick={() => {
                document.getElementById("filter-area-dialog").showModal();
              }}
              className={`btn ${!isMobileView ? "join-item" : "ms-3"}`}
            >
              filter
            </button>
          )}
          <button
            className={`btn ${!isMobileView ? "join-item" : "ms-3"}`}
            onClick={clearFilters}
          >
            Clear
          </button>
          {/* {isMobileView &&
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
            )} */}
        </div>
      </div>
      {data?.length > 0 ? (
        data
          ?.filter((i) =>
            tab === "division"
              ? i.halqaAreaId?.parentType === "Tehsil"
              : i.halqaAreaId?.parentType ===
                tab.charAt(0).toUpperCase() + tab.slice(1)
          )
          .map((p) => (
            <div
              key={p?._id}
              className="card-body flex items-between justify-between w-full p-2 md:p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col"
            >
              <div className="flex w-full flex-col items-start justify-center">
                <span className="text-sm lg:text-lg font-semibold">
                  {p?.halqaAreaId?.name + " "}
                  {moment(p?.month).format("MMMM YYYY")}
                </span>
                <span>Last Modified: {moment(p?.updatedAt).fromNow()}</span>
              </div>
              <div className="flex items-end w-full justify-end gap-3 ">
                <button className="btn" onClick={() => viewReport(p?._id)}>
                  <FaEye />
                </button>

                <button className="btn" onClick={() => editReport(p?._id)}>
                  <FaEdit />
                </button>

                <button className="btn">
                  <FaPrint />
                </button>
              </div>
            </div>
          ))
      ) : (
        <NoReports />
      )}
      <div className="flex justify-between mt-4">
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
        <button className="btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <dialog id="filter-area-dialog" className="modal">
        {/* <FilterDialog setFilterAllData={setFilterAllData} tab={tab} /> */}
      </dialog>
    </>
  );
};
