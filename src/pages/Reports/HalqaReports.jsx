import React, { useContext, useEffect, useState } from "react";
import { HalqaReportContext, MeContext, ProvinceReportContext, useToastState } from "../../context";
import { FaEdit, FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import { NoReports, months } from "../Reports";
import { FilterDialog } from "./FilterDialog";
import { Link } from "react-router-dom";

export const HalqaReports = () => {
  const hReports = useContext(HalqaReportContext);
  const [tab, setTab] = useState("maqam");
  const [filterData, setFilterData] = useState([]);
  const [filterAllData, setFilterAllData] = useState(hReports);
  const { dispatch } = useToastState();
  const [search, showSearch] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2023");
  const me = useContext(MeContext);
  const searchResults = () => {
    if (year !== "" && month !== "") {
      let filteredData = { ...hReports };
      filteredData = hReports?.filter((i) => {
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
      let filteredData = { ...hReports };
      filteredData = hReports?.filter((i) => {
        const f_year = i?.month?.split("-")[0];
        return parseInt(year) === parseInt(f_year);
      });
      showSearch(false);
      setFilterAllData(filteredData);
    } else if (year === "" && month !== "") {
      dispatch({ type: "ERROR", payload: "Enter year with month" });
      setFilterAllData(hReports);
    } else if (year === "" && month === "") {
      dispatch({ type: "ERROR", payload: "Date is required" });
      setFilterAllData(hReports);
    } else {
      setFilterAllData(hReports);
    }
  };
  const toggleSearch = () => {
    showSearch(!search);
  };
  const clearFilters = () => {
    setMonth("");
    setYear("2023");
    setFilterAllData(hReports);
    document.getElementById("autocomplete").value = "";
  };
  return (
    <>
     
      
      <div role="tablist" className="w-full flex justify-between items-center mb-4">
        <Link
          to={"?active=halqa&tab=maqam"}
          role="tab"
          className={`tab flex justify-center items-center w-full ${
            tab === "maqam" ? "tab-active" : ""
          }`}
          onClick={() => setTab("maqam")}
        >
          Maqam Halqa
        </Link>
        <Link
          to={"?active=halqa&tab=division"}
          role="tab"
          className={`tab flex justify-center items-center w-full ${
            tab === "division" ? "tab-active" : ""
          }`}
          onClick={() => setTab("division")}
        >
          Division Halqa
        </Link>
        <Link
          to={"?active=halqa&tab=ilaqa"}
          role="tab"
          className={`tab flex justify-center items-center w-full ${
            tab === "ilaqa" ? "tab-active" : ""
          }`}
          onClick={() => setTab("ilaqa")}
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
      {filterAllData?.length > 0 ? (
        filterAllData?.filter((i)=> i.halqaAreaId?.parentType === tab.charAt(0).toUpperCase()+tab.slice(1)) .map((p) => (
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
              <button className="btn">
                <FaEye />
              </button>

              <button className="btn">
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
      <dialog id="filter-area-dialog" className="modal">
        <FilterDialog setFilterAllData={setFilterAllData} tab={tab}/>
      </dialog>
    </>
  );
};