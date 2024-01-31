import React, { useEffect, useState } from "react";
import { GeneralLayout } from "../components";
import { FaEdit, FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import instance from "../api/instrance";
import { useNavigate } from "react-router-dom";
// import { ProvinceContext } from "../context";

export const PersonalReportsDashboard = () => {
  const [data, setData] = useState([]);
  // const provinces = useContext(ProvinceContext);
  let navigate = useNavigate();

  const getAllReports = async () => {
    const req = await instance.get(`/umeedwar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      },
    });
    setData(req?.data?.data);
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
    window.open(`print/${id}`, "blank");
  };

  // useEffect(() => {
  //   console.log(temp, "temp");
  // }, [temp]);

  return (
    <GeneralLayout title={"PersonalDashboard"} active={"personalReports"}>
      <div className="w-full flex flex-col justify-start items-center mt-5 p-5">
        <div className="w-full flex justify-end items-center mt-5">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/personalReport/create")}
          >
            + New Report
          </button>
        </div>
        {data?.map((obj, index) => (
          <div
            key={index}
            className="card-body flex items-between justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col mt-5"
          >
            <div className="flex w-full flex-col items-start justify-center">
              <span className="text-lg font-semibold" key={index}>
                {/* {obj?.name || "UNKNOWN"}
                {" - "}
                {provinces
                  .filter((f) => f._id === obj.areaId)
                  .map((m) => m?.name)}
                {" - "} */}
                {moment(obj?.month).format("MMMM YYYY")}
              </span>
              <span>Last Modified: {moment(obj?.updatedAt).fromNow()}</span>
            </div>
            <div className="flex items-end w-full justify-end gap-3 ">
              <button className="btn" onClick={() => viewReport(obj?._id)}>
                <FaEye />
              </button>
              <button className="btn" onClick={() => editReport(obj?._id)}>
                <FaEdit />
              </button>
              <button className="btn" onClick={() => printReport(obj?._id)}>
                <FaPrint />
              </button>
            </div>
          </div>
        ))}
      </div>
    </GeneralLayout>
  );
};
