import React, { useContext, useEffect, useState } from "react";
import { HalqaReportContext, MeContext, useToastState } from "../../context";
import { FaEdit, FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import { NoReports, months } from "../Reports";
import { FilterDialog } from "./FilterDialog";
import { useNavigate } from "react-router-dom";
import { UIContext } from "../../context/ui";
import instance from "../../api/instrance";
import { SearchPage } from "./SearchPage";

export const UnitReport = () => {
  const h = useContext(HalqaReportContext);
  console.log(h);
  const hReports = h?.reports;
  const total = h?.length;
  const [filterAllData, setFilterAllData] = useState(hReports);
  const { dispatch } = useToastState();
  const [search, showSearch] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2023");
  const navigate = useNavigate();
  const me = useContext(MeContext);
  const [isSearch, setIsSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { getHalqaReports } = useContext(UIContext);
  const [isFilter,setIsFilter]=useState(false);
  const itemsPerPage = 10;
  useEffect(() => {
    const uniqueArray = hReports.reduce((acc, current) => {
      const x = acc.find((item) => item?._id === current?._id);
      if (!x) {
        acc.push(current);
      }
      return acc;
    }, []);
    setFilterAllData(uniqueArray);
  }, [hReports]);
  const searchResults = async () => {
    if (year !== "" && month !== "") {
      try {
        setIsSearch(true);
        const req = await instance.get(
          `/reports/halqa?year=${year}&month=${month}`,
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
    setFilterAllData(hReports);
    setIsFilter(false)
    setIsSearch(false);
    document.getElementById("autocomplete").value = "";
  };

  const viewReport = async (id) => {
    navigate(`view/${id}`);
  };
  const editReport = (id) => {
    navigate(`edit/${id}`);
  };
  const handlePrint = (id) => {
    window.open(`halqa-report/print/${id}`, "blank");
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
      if (hReports.length <= itemsPerPage * currentPage) {
        getHalqaReports(inset, offset);
      }
    }
  };

  return (
    <>
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
                setIsSearch(false)
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
      {!isSearch ? (
        <>
          {" "}
          {currentData?.length > 0 ? (
            currentData.map((p, index) => (
              <div
                key={index}
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

                  {me?.userAreaType == "Halqa" && (
                    <button className="btn" onClick={() => editReport(p?._id)}>
                      <FaEdit />
                    </button>
                  )}

                  <button className="btn" onClick={() => handlePrint(p?._id)}>
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
            <button
              className="btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <SearchPage data={searchData} area={"halqa"} />
      )}
      <dialog id="filter-area-dialog" className="modal">
        <FilterDialog setFilterAllData={setFilterAllData} setIsFilter={setIsFilter}/>
      </dialog>
    </>
  );
};
