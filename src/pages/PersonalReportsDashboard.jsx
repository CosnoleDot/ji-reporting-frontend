import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../components";
import { FaEdit, FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import instance from "../api/instrance";
import { useNavigate } from "react-router-dom";
import { DistrictContext, MaqamContext, IlaqaContext } from "../context";
import { getDivisionByTehsil, months } from "./Reports";
import { MdCancel } from "react-icons/md";
// import { ProvinceContext } from "../context";

export const PersonalReportsDashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2023");
  const [isMobileView, setIsMobileView] = useState(false);
  const maqams = useContext(MaqamContext);
  const districts = useContext(DistrictContext);
  const ilaqas = useContext(IlaqaContext);
  const [toggle, setToggle] = useState(false);
  // const provinces = useContext(ProvinceContext);
  let navigate = useNavigate();
  const getAreaType = (area) => {
    if (area?.parentType === "Maqam") {
      const name = maqams.find((i) => i?._id === area?.parentId);
      return `${area?.name} - ${name?.name} (Maqam)`;
    } else if (area?.parentType === "Tehsil") {
      const name = getDivisionByTehsil(area?.parentId, districts);
      return `${area?.name} - ${name} (Division)`;
    } else if (area?.parentType === "Ilaqa") {
      const name = ilaqas?.find(
        (i) => i?._id.toString() === area?.parentId.toString()
      );
      if (name) {
        return `${area?.name} Of Ilaqa ${name?.name} Of Maqam ${name?.maqam?.name}`;
      } else {
        return area?.name;
      }
    } else if (area?.province) {
      return `${area?.name} - ${
        maqams.find((i) => i?._id === area?._id) ? "Maqam" : "Division"
      }`;
    } else if (area?.name === "Pakistan") {
      return `${area?.name} `;
    } else if (area?.country) {
      return `${area?.name} `;
    }
    return "Pakistan";
  };
  const getAllReports = async () => {
    const req = await instance.get(`/umeedwar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      },
    });
    const d = req?.data?.data?.map((obj) => ({
      title:
        `${
          obj?.userId?.name !== undefined && obj?.userId?.name !== "undefined"
            ? obj?.userId?.name
            : ""
        }  ` +
        " " +
        getAreaType(obj?.areaId),
      ...obj,
    }));

    setFilteredData([...d]);
    setData([...d]);
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
  const searchPersonalReports = (e) => {
    setSearch(e.target.value);
    const searchParam = e.target.value.toLowerCase();
    const requiredData = data.filter((item) => {
      return item.title.toLowerCase().includes(searchParam);
    });
    setFilteredData(requiredData);
  };
  useEffect(() => {
    if (window) {
      if (window.innerWidth < 520) {
        setIsMobileView(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const searchResults = () => {
    setToggle(false);
    const findData = `${year}-${
      parseInt(month) > 9 ? month : "0" + month.toString()
    }`;

    const filData = data?.reduce((acc, curr) => {
      Object.keys(curr).forEach((tag) => {
        if (tag === "month") {
          const r = curr["month"].includes(findData);
          if (r) {
            acc?.push(curr);
          }
        }
      });
      return acc;
    }, []);
    setFilteredData(filData);
  };
  return (
    <GeneralLayout title={"PersonalDashboard"} active={"personalReports"}>
      <div className="w-full flex flex-col justify-start items-center mt-5 p-5">
        <div className="w-full overflow-hidden overflow-x-scroll md:justify-center md:items-center flex gap-2  mt-5">
          <div className="flex items-center justify-start md:justify-start gap-2 ">
            <input
              type="search"
              name="Search"
              id="search"
              placeholder="Search by name..."
              className="input input-bordered"
              value={search}
              onChange={searchPersonalReports}
            />
          </div>
          <button className="btn" onClick={() => setFilteredData(data)}>
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
          <button
            className="btn btn-primary"
            onClick={() => navigate("/personalReport/create")}
          >
            + New Report
          </button>
        </div>
        <div className="w-full overflow-hidden overflow-y-scroll h-[calc(100vh-64px-64px-54px-76px)] flex flex-col justify-start items-start">
          {filteredData?.map((obj, index) => (
            <div
              key={index}
              className="card-body flex items-center max-h-[170px]  justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col mt-5"
            >
              <div className="flex w-full flex-col items-start justify-center">
                <span className="text-lg font-semibold" key={index}>
                  {`${obj?.title.split("(")[0]} - `}
                  {moment(obj?.month).format("MMMM YYYY")}
                </span>
                <span>Last Modified: {moment(obj?.updatedAt).fromNow()}</span>
              </div>
              <div className="flex items-center w-full justify-end gap-3 ">
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
      </div>
    </GeneralLayout>
  );
};
