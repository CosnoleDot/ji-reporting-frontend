import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { LuSearchX } from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MeContext } from "../../context";

const NoSearch = () => (
  <div className="card-body flex flex-col items-center justify-center w-full p-2 md:p-5 mb-1 rounded-xl">
    <LuSearchX className="text-gray-300 w-40 h-40" />
    <span className="text-gray-300 font-bold text-3xl">Not Found!</span>
  </div>
);

export const SearchPage = ({ data, area }) => {
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  const navigate = useNavigate();
  const me = useContext(MeContext);

  // Watch for changes in 'data' prop and update currentPageData
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when data changes
  }, [data]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const newPageData =
      data?.length >= 0
        ? data?.slice(startIndex, startIndex + itemsPerPage)
        : data?.data?.slice(startIndex, startIndex + itemsPerPage);
    setCurrentPageData(newPageData);
  }, [data, currentPage]);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const viewReport = (id) => {
    navigate(`view/${id}`);
  };

  const handlePrint = (id) => {
    window.location.href = `halqa-report/print/${id}`;
  };

  const handlePrevPageSearch = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPageSearch = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      {currentPageData?.length > 0 ? (
        <table className="table mb-7 w-full">
          <thead>
            <tr>
              <th className="text-left">Report</th>
              <th className="text-left">Last modified</th>
              <th className="text-left">Month</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((p, index) => (
              <tr key={index}>
                <td>
                  <span className="font-medium text-sm">
                    {p?.[area + "AreaId"]?.name}
                  </span>
                </td>
                <td>
                  <span className="font-medium text-sm">
                    {moment(p?.month).format("MMMM YYYY")}
                  </span>
                </td>
                <td>
                  <span className="font-medium text-sm">
                    {moment(p?.updatedAt).fromNow()}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => viewReport(p?._id)}
                      className="cursor-pointer text-blue"
                    >
                      View
                    </span>
                    {me?.userAreaType === "Halqa" && (
                      <span
                        onClick={() => navigate(`/reports/edit/${p._id}`)}
                        className="cursor-pointer text-green"
                      >
                        Edit
                      </span>
                    )}
                    <span
                      onClick={() => handlePrint(p?._id)}
                      className="cursor-pointer text-blue"
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
        <NoSearch />
      )}

      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          className="rounded-full border-none w-7 h-7"
          disabled={currentPage === 1}
          onClick={handlePrevPageSearch}
        >
          <IoIosArrowBack
            className={`text-[1.5rem] rounded-full ${
              currentPage === 1 ? "text-gray-400" : "bg-gray-200"
            }`}
          />
        </button>

        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="rounded-full border-none w-7 h-7"
          disabled={currentPage === totalPages}
          onClick={handleNextPageSearch}
        >
          <IoIosArrowForward
            className={`text-[1.5rem] rounded-full ${
              currentPage === totalPages ? "text-gray-400" : "bg-gray-200"
            }`}
          />
        </button>
      </div>
    </>
  );
};
