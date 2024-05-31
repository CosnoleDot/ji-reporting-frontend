import React, { useState } from 'react';
import moment from 'moment';
import { NoReports } from '../Reports';
import { FaEye, FaPrint } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const SearchPage = ({ data }) => {
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const viewReport = async (id) => {
    navigate(`view/${id}`);
  };
  const editReport = (id) => {
    navigate(`edit/${id}`);
  };
  const handlePrint = (id) => {
    window.open(`halqa-report/print/${id}`, "blank");
  };

  const handlePrevPageSearch = () => {
    setCurrentPage((prevPage) => Math.max(prevPage, 1));
  };

  const handleNextPageSearch = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {data.length > 0 ? (
        currentPageData.map((p) => (
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
          onClick={handlePrevPageSearch}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn"
          onClick={handleNextPageSearch}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};
