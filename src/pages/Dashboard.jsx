import { useContext, useRef, useState } from "react";
import { GeneralLayout } from "../components";
import { useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { FaFilter, FaLocationArrow, FaPlus } from "react-icons/fa";
import {
  DistrictContext,
  DivisionContext,
  DivisionReportContext,
  HalqaContext,
  HalqaReportContext,
  MaqamContext,
  MaqamReportContext,
  ProvinceReportContext,
  TehsilContext,
} from "../context";
import { UIContext } from "../context/ui";
import { useNavigate } from "react-router-dom";
import instance from "../api/instrance";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

export const Dashboard = () => {
  const [count, setCount] = useState(0);
  const { nazim } = useContext(UIContext);
  const maqam = useContext(MaqamContext);
  const division = useContext(DivisionContext);
  const unit = useContext(HalqaContext);
  const district = useContext(DistrictContext);
  const tehsil = useContext(TehsilContext);
  const maqamReports = useContext(MaqamReportContext);
  const divisionReports = useContext(DivisionReportContext);
  const halqaReports = useContext(HalqaReportContext);
  const provinceReports = useContext(ProvinceReportContext);
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [queryDate, setQuerydate] = useState("");
  const getData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      };

      const config = {
        headers,
      };

      if (queryDate !== "") {
        config.params = {
          queryDate: queryDate,
        };
      }
      const province = await instance.get(
        `/reports/province/data/filled-unfilled`,
        config
      );
      const maqam = await instance.get(
        `/reports/maqam/data/filled-unfilled`,
        config
      );
      const halqa = await instance.get(
        `/reports/halqa/data/filled-unfilled`,
        config
      );
      const division = await instance.get(
        `/reports/division/data/filled-unfilled`,
        config
      );
      const provinceData = province?.data?.data?.allProvinces || [];
      const maqamData = maqam?.data?.data?.allMaqams || [];
      const halqaData = halqa?.data?.data?.allHalqas || [];
      const divisionData = division?.data?.data?.allDivisions || [];
      const temp = {
        unfilled: null,
        totalprovince: 1,
        filled: null,
        allData: [...provinceData, ...maqamData, ...halqaData, ...divisionData],
      };
      temp.unfilled = [
        ...province?.data?.data?.unfilled,
        ...maqam?.data?.data?.unfilled,
        ...halqa?.data?.data?.unfilled,
        ...division?.data?.data?.unfilled,
      ];
      temp.totalprovince =
        province?.data?.data?.totalprovince +
        maqam?.data?.data?.totalmaqam +
        halqa?.data?.data?.totalhalqa +
        division?.data?.data?.totaldivision;

      const filled = data?.allData?.filter((obj1) => {
        return !data?.unfilled?.some((obj2) => obj2._id === obj1._id);
      });

      temp.filled = filled;
      setData({ ...temp });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    try {
      setCount(
        maqamReports?.length +
          divisionReports?.length +
          halqaReports?.length +
          provinceReports?.length
      );
    } catch (err) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maqamReports, divisionReports, halqaReports]);

  return (
    <GeneralLayout title={"Dashboard"} active={"dashboard"}>
      <div className="relative flex flex-col w-full gap-3 items-center p-5 justify-center h-[calc(100vh-65.6px-64px)] overflow-hidden overflow-y-scroll bg-blue-50">
        <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8 w-full">
          {["province"].includes(localStorage.getItem("@type")) && (
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div className="p-4 bg-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </div>
              <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">Total Nazims</h3>
                <p className="text-3xl">{nazim.length}</p>
              </div>
            </div>
          )}
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                ></path>
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Reports</h3>
              <p className="text-3xl">
                {/* {loading ? (
                  <span className='loading loading-bars loading-md'></span>
                ) : (
                  count
                )} */}
                {count}
              </p>
            </div>
          </div>
          {["province"].includes(localStorage.getItem("@type")) && (
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div className="p-4 bg-indigo-400">
                <CiLocationOn className="w-12 h-12 text-white" />
              </div>
              <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">Total Maqams</h3>
                <p className="text-3xl">{maqam?.length}</p>
              </div>
            </div>
          )}
          {["province"].includes(localStorage.getItem("@type")) && (
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div className="p-4 bg-red-400">
                <FaLocationDot className="h-12 w-12 text-white" />
              </div>
              <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">Total Divisions</h3>
                <p className="text-3xl">{division?.length}</p>
              </div>
            </div>
          )}
          {["division"].includes(localStorage.getItem("@type")) && (
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div className="p-4 bg-red-400">
                <FaLocationDot className="h-12 w-12 text-white" />
              </div>
              <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">Total Districts</h3>
                <p className="text-3xl">{district?.length}</p>
              </div>
            </div>
          )}
          {["division"].includes(localStorage.getItem("@type")) && (
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div className="p-4 bg-indigo-400">
                <CiLocationOn className="h-12 w-12 text-white" />
              </div>
              <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">Total Tehsils</h3>
                <p className="text-3xl">{tehsil?.length}</p>
              </div>
            </div>
          )}
          {localStorage.getItem("@type") !== "halqa" && (
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
              <div className="p-4 bg-red-400">
                <FaLocationArrow className="w-12 h-12 text-white" />
              </div>
              <div className="px-4 text-gray-700">
                <h3 className="text-sm tracking-wider">Total Units</h3>
                <p className="text-3xl">{unit?.length}</p>
              </div>
            </div>
          )}
          {localStorage.getItem("@type") === "halqa" && (
            <div
              onClick={() => navigate("/reports/create")}
              className="flex items-center bg-white border rounded-sm overflow-hidden shadow cursor-pointer"
            >
              <div className="p-4 bg-red-400">
                <FaPlus className="w-12 h-12 text-white" />
              </div>
              <div className="px-4 text-gray-700">
                {/* <h3 className='text-sm tracking-wider'>Create New Report</h3> */}
                <p className="text-2xl">Create New Report</p>
              </div>
            </div>
          )}
        </div>
        {localStorage.getItem("@type") !== "halqa" && (
          <div className="w-full">
            <div className="w-full flex gap-2 ">
              <div
                style={{ backgroundColor: toggle ? "" : "#7a7a7a" }}
                onClick={() => setToggle(true)}
                className="flex justify-center items-center h-10 btn bg-[#cacaca] w-[50%] text-center "
              >
                Filled {data?.filled?.length}
              </div>
              <div
                style={{ backgroundColor: toggle === false ? "" : "#7a7a7a" }}
                onClick={() => setToggle(false)}
                className="flex justify-center items-center h-10 btn bg-[#cacaca] w-[50%] text-center "
              >
                Un filled {data?.unfilled?.length}
              </div>
            </div>
            <div className="overflow-x-auto grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-1 sm:px-8 w-full">
              <div className="w-full  flex justify-end items-end ">
                <button className="btn border-none " onClick={getData}>
                  Filter
                </button>
                <label
                  className="btn rounded-md bg-none  "
                  htmlFor="filterUnfilled"
                >
                  <FaFilter />
                  <input
                    type="month"
                    className="text-primary"
                    id="filterUnfilled"
                    onChange={(e) => setQuerydate(e.target.value)}
                  />
                </label>
              </div>
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Nazim</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {toggle ? (
                    data?.filled?.length > 0 ? (
                      data.filled
                        .filter((i) => !i?.disabled)
                        .map((obj, index) => (
                          <tr key={index}>
                            <td>{obj.name}</td>
                            <td>
                              {nazim.find((i) => i?.userAreaId?._id == obj?._id)
                                ?.name || "UNKNOWN"}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="2">No one has filled report yet </td>
                      </tr>
                    )
                  ) : data?.unfilled?.length > 0 ? (
                    data.unfilled
                      .filter((i) => !i?.disabled)
                      .map((obj, index) => (
                        <tr key={index}>
                          <td>{obj.name}</td>
                          <td>
                            {nazim.find((i) => i?.userAreaId?._id == obj?._id)
                              ?.name || "UNKNOWN"}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="2">All have filled reports</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </GeneralLayout>
  );
};
