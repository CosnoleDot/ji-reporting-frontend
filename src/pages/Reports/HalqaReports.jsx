import React, { useContext, useState } from "react";
import { HalqaReportContext } from "../../context";
import { FaEdit, FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import { NoReports } from "../Reports";
import { Link } from "react-router-dom";

export const HalqaReports = () => {
  const hReports = useContext(HalqaReportContext);
  const [tab, setTab] = useState("maqam");

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
            tab === "tehsil" ? "tab-active" : ""
          }`}
          onClick={() => setTab("tehsil")}
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

      {hReports?.length > 0 ? (
        hReports?.filter((i)=> i.halqaAreaId?.parentType === tab.charAt(0).toUpperCase()+tab.slice(1)) .map((p) => (
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
    </>
  );
};
