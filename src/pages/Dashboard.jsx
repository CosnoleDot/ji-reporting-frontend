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

export const Dashboard = () => {
  const [count, setCount] = useState(0);
  const { nazim } = useContext(UIContext);
  const maqams = useContext(MaqamContext);
  const divisions = useContext(DivisionContext);
  const unit = useContext(HalqaContext);
  const districts = useContext(DistrictContext);
  const tehsils = useContext(TehsilContext);
  const maqamReports = useContext(MaqamReportContext);
  const divisionReports = useContext(DivisionReportContext);
  const halqaReports = useContext(HalqaReportContext);
  const provinceReports = useContext(ProvinceReportContext);
  const [userAreaType, setUserAreaType] = useState("All");
  const [areas, setAreas] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [queryDate, setQuerydate] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const getData = async () => {
    try {
      const getUnfilledReports = async (path) => {
        const res = await instance.get(
          `/reports/${path}/data/filled-unfilled`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("@token")}`,
            },
            params: queryDate !== "" ? { queryDate: queryDate } : null,
          }
        );
        return res;
      };
      const province = await getUnfilledReports("province");
      const maqam = await getUnfilledReports("maqam");
      const halqa = await getUnfilledReports("halqa");
      const division = await getUnfilledReports("division");

      const provinceData = province?.data?.data?.allProvinces || [];
      const maqamData = maqam?.data?.data?.allMaqams || [];
      const halqaData = halqa?.data?.data?.allHalqas || [];
      const divisionData = division?.data?.data?.allDivisions || [];
      const getFilteredHalqas = (halqaData) => [
        ...halqaData.filter((h) => {
          if (userAreaType === "Maqam") {
            if (h.parentType === "Maqam" && h?.parentId?._id === selectedId) {
              return true;
            }
            return false;
          }
          if (userAreaType === "Tehsil") {
            if (h.parentType === "Tehsil") {
              const district = h?.parentId?.district;
              const filteredDistricts = districts
                .filter((dis) => dis?.division?._id === selectedId)
                .map((div) => div?._id);
              return filteredDistricts.includes(district);
            }
            return false;
          }
        }),
      ];
      const temp = {
        unfilled: null,
        totalprovince: 1,
        filled: null,
        allData:
          userAreaType === "All"
            ? [...provinceData, ...maqamData, ...halqaData, ...divisionData]
            : getFilteredHalqas(halqaData),
      };
      temp.unfilled =
        userAreaType === "All"
          ? [
              ...province?.data?.data?.unfilled,
              ...maqam?.data?.data?.unfilled,
              ...halqa?.data?.data?.unfilled,
              ...division?.data?.data?.unfilled,
            ]
          : getFilteredHalqas(halqa?.data?.data?.unfilled);
      temp.totalprovince =
        province?.data?.data?.totalprovince +
        maqam?.data?.data?.totalmaqam +
        halqa?.data?.data?.totalhalqa +
        division?.data?.data?.totaldivision;

      const reportFilledBy = temp?.allData?.filter((obj1) => {
        return !temp?.unfilled?.some((obj2) => obj2._id === obj1._id);
      });
      temp.filled = reportFilledBy;
      setData({ ...temp });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const clearFilter = () => {
    setQuerydate("");
    setUserAreaType("All");
    getData();
  };
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
  }, [maqamReports, divisionReports, halqaReports, provinceReports]);
  const getAreas = async () => {
    switch (userAreaType) {
      case "Tehsil":
        setAreas(divisions);
        break;
      case "Maqam":
        setAreas(maqams);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    getAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAreaType]);

  const getAreaType = (area) => {
    if (area?.parentType === "Maqam") {
      return "Maqam Halqa";
    } else if (area?.parentType === "Tehsil") {
      return "Division Halqa";
    } else if (area?.province) {
      return maqams.find((i) => i?._id === area?._id) ? "Maqam" : "Division";
    }
    return "Province";
  };

  return (
    <GeneralLayout title={"Dashboard"} active={"dashboard"}>
      <div className="relative flex flex-col w-full gap-3 items-center p-5 justify-start h-[calc(100vh-65.6px-64px)] overflow-hidden overflow-y-scroll bg-blue-50">
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
                <p className="text-3xl">{maqams?.length}</p>
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
                <p className="text-3xl">{divisions?.length}</p>
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
                <p className="text-3xl">{districts?.length}</p>
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
                <p className="text-3xl">{tehsils?.length}</p>
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
          <div className=" gap-4 px-4 mt-8  sm:px-8 w-full">
            <div className="w-full  gap-2 grid grid-cols-2 sm:grid-cols-2 mb-2">
              <div
                style={{ backgroundColor: toggle ? "" : "#7a7a7a" }}
                onClick={() => setToggle(true)}
                className="flex justify-center items-center h-10 btn bg-[#cacaca] w-full text-center "
              >
                Filled {data?.filled?.length}
              </div>
              <div
                style={{ backgroundColor: toggle === false ? "" : "#7a7a7a" }}
                onClick={() => setToggle(false)}
                className="flex justify-center items-center h-10 btn bg-[#cacaca] w-full text-center "
              >
                Un filled {data?.unfilled?.length}
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <button
                className="btn"
                onClick={() =>
                  document
                    .getElementById("filter_filled_unfilled_modal")
                    .showModal()
                }
              >
                Filter <FaFilter />
              </button>
              <button className="btn" onClick={clearFilter}>
                Clear Filter
              </button>
            </div>
            <div className="overflow-x-auto grid grid-cols-1 gap-4  mt-8 sm:grid-cols-1 sm:px-8 w-full">
              <div className="w-full mb-3 h-[300px] overflow-auto overflow-y-scroll">
                <table className="table mb-7">
                  {/* head */}
                  <thead className="">
                    <tr className="w-full flex">
                      <th className="w-[50%]">Area</th>
                      <th className="w-[50%]">Nazim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toggle ? (
                      data?.filled?.length > 0 ? (
                        data.filled
                          .filter((i) => !i?.disabled)
                          .map((obj, index) => (
                            <tr key={index} className="w-full flex">
                              <td className="w-[50%]">{obj.name}</td>
                              <td className="w-[50%]">
                                {nazim.find(
                                  (i) => i?.userAreaId?._id == obj?._id
                                )?.name || (
                                  <span className="text-red-400 font-semibold">
                                    User Not Registered Yet
                                  </span>
                                )}
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
                          <tr className="w-full flex" key={index}>
                            <td className="w-[50%]">
                              {obj.name} - {`(${getAreaType(obj)})`}
                            </td>
                            <td className="w-[50%]">
                              {nazim.find((i) => i?.userAreaId?._id == obj?._id)
                                ?.name || (
                                <span className="text-red-400 font-semibold">
                                  User Not Registered Yet
                                </span>
                              )}
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
          </div>
        )}
      </div>
      <dialog id="filter_filled_unfilled_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Filter Data</h3>
          <div className="w-full  flex justify-between items-center  flex-wrap">
            <div className="flex flex-col w-full justify-start items-center gap-3">
              <div className=" w-full flex items-center justify-start gap-2 border border-primary p-2 rounded-lg">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="userAreaType"
                      className="radio checked:bg-blue-500"
                      value="Tehsil"
                      checked={userAreaType === "Tehsil"}
                      onChange={(e) => setUserAreaType(e.target.value)}
                    />
                    <span className="label-text">Division</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="userAreaType"
                      className="radio checked:bg-blue-500"
                      value="Maqam"
                      checked={userAreaType === "Maqam"}
                      onChange={(e) => setUserAreaType(e.target.value)}
                    />
                    <span className="label-text">Maqam</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="userAreaType"
                      className="radio checked:bg-blue-500"
                      value="All"
                      checked={userAreaType === "All"}
                      onChange={(e) => setUserAreaType(e.target.value)}
                    />
                    <span className="label-text">All</span>
                  </label>
                </div>
              </div>
              {userAreaType !== "All" && (
                <div className="relative w-full mb-3">
                  <input
                    type="hidden"
                    name="userAreaId"
                    id="userAreaId"
                    className="w-full"
                    autoComplete="off"
                  />
                  <input
                    id="autocomplete"
                    type="text"
                    autoComplete="off"
                    class="input  input-bordered input-primary w-full"
                    placeholder="Select area"
                    onChange={(e) => setSearchArea(e.target.value)}
                    onClick={() => {
                      if (
                        document
                          .getElementById("autocomplete-list")
                          .classList.contains("hidden")
                      ) {
                        document
                          .getElementById("autocomplete-list")
                          .classList.remove("hidden");
                      } else {
                        document
                          .getElementById("autocomplete-list")
                          .classList.add("hidden");
                      }
                    }}
                  />
                  <div
                    id="autocomplete-list"
                    class="absolute hidden z-10 max-h-[100px] overflow-y-scroll bg-white border border-gray-300 w-full mt-1"
                  >
                    {areas
                      .sort((a, b) => a?.name?.localeCompare(b?.name))
                      .filter((item) => {
                        if (searchArea && searchArea !== "") {
                          if (
                            item?.name
                              ?.toString()
                              ?.toLowerCase()
                              ?.includes(searchArea?.toString()?.toLowerCase())
                          ) {
                            return true;
                          }
                          return false;
                        } else {
                          return true;
                        }
                      })
                      .map((area, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            document.getElementById("userAreaId").value =
                              area?._id;
                            setSelectedId(area?._id);
                            document.getElementById("autocomplete").value = `${
                              area?.name
                            }${
                              userAreaType === "Halqa"
                                ? ` - ${area?.parentId?.name} (${area?.parentType})`
                                : ""
                            }`;
                            document
                              .getElementById("autocomplete-list")
                              .classList.add("hidden");
                          }}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                          {area?.name}
                          {userAreaType === "Halqa"
                            ? ` - ${area?.parentId?.name} (${area?.parentType})`
                            : ""}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex justify-end">
              <label
                className="btn rounded-md bg-none  "
                htmlFor="filterUnfilled"
              >
                <FaFilter />
                <input
                  type="month"
                  className="text-primary"
                  id="filterUnfilled"
                  value={queryDate}
                  onChange={(e) => setQuerydate(e.target.value)}
                />
              </label>
            </div>
            <div className="modal-action w-full">
              <form method="dialog" className="w-full">
                <div className=" w-full flex justify-end gap-3 items-center">
                  <button
                    id="close-division-modal"
                    className="btn ms-3 capitalize"
                    onClick={() => {
                      setQuerydate("");
                      setUserAreaType("All");
                    }}
                  >
                    Clear
                  </button>
                  <button
                    disabled={
                      !queryDate ||
                      (queryDate === "" && userAreaType === "All") ||
                      ((userAreaType === "Tehsil" ||
                        userAreaType === "Maqam") &&
                        (!selectedId || selectedId === "")) ||
                      !queryDate ||
                      queryDate === ""
                    }
                    id="close-division-modal"
                    className="btn ms-3 capitalize"
                    onClick={getData}
                  >
                    Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </GeneralLayout>
  );
};
