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
  const navigate = useNavigate();
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const me = useContext(MeContext);
  const viewReport = async (id) => {
    navigate(`view/${id}`);
  };
  const editReport = (id) => {
    navigate(`edit/${id}`);
  };
  const handlePrint = (id) => {
    window.location.href(`halqa-report/print/${id}`, "blank");
  };

  const handlePrevPageSearch = () => {
    setCurrentPage((prevPage) => Math.max(prevPage, 1));
  };

  const handleNextPageSearch = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData =
    data?.length >= 0
      ? data?.slice(startIndex, startIndex + itemsPerPage)
      : data?.data?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {currentPageData?.length > 0 ? (
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
            {currentPageData.map((p, index) => (
              <tr key={index}>
                <td>
                  <span className="font-medium md:text-sm text-xs leading-[16.94px] text-left font-inter text-heading">
                    {p?.[area + "AreaId"]?.name + " "}
                  </span>
                </td>
                <td>
                  <span className="font-medium md:text-sm text-xs leading-[16.94px] text-left font-inter text-heading">
                    {moment(p?.month).format("MMMM YYYY")}
                  </span>
                </td>
                <td>
                  <span className="font-medium md:text-sm text-xs leading-[16.94px] text-left font-inter text-heading">
                    {moment(p?.updatedAt).fromNow()}
                  </span>
                </td>
                <td className="md:block hidden"></td>
                <td className="md:block hidden"></td>
                <td>
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => viewReport(p?._id)}
                      className="cursor-pointer font-inter md:text-sm text-xs font-medium leading-[16.94px] text-left"
                    >
                      View
                    </span>
                    {me?.userAreaType === "Halqa" && (
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
        <NoSearch />
      )}

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
          onClick={handlePrevPageSearch}
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
          onClick={handleNextPageSearch}
        >
          <IoIosArrowForward
            className={`text-[1.5rem] rounded-full bg-gray-200 ${
              currentPage === totalPages && "text-gray-400"
            }`}
          />
        </button>
      </div>
    </>
  );
};
