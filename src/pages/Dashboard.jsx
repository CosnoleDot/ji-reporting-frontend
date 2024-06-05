import { useContext, useRef, useState } from "react";
import { GeneralLayout } from "../components";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import {
  FaArrowDown,
  FaArrowUp,
  FaFilter,
  FaLocationArrow,
  FaPlus,
} from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { useEffect } from "react";
import {
  DistrictContext,
  DivisionContext,
  DivisionReportContext,
  HalqaContext,
  HalqaReportContext,
  MaqamContext,
  MaqamReportContext,
  MeContext,
  ProvinceContext,
  ProvinceReportContext,
  TehsilContext,
  IlaqaContext,
  ViewDetails,
} from "../context";
import { UIContext } from "../context/ui";
import { useNavigate } from "react-router-dom";
import instance from "../api/instrance";

export const Dashboard = () => {
  const [count, setCount] = useState(0);
  const { getHalqas } = useContext(UIContext);
  const { nazim, setLoading, getAreaDetails } = useContext(UIContext);
  const maqams = useContext(MaqamContext);
  const divisions = useContext(DivisionContext);
  const provinces = useContext(ProvinceContext);
  const unit = useContext(HalqaContext);
  const ilaqa = useContext(IlaqaContext);
  const districts = useContext(DistrictContext);
  const tehsils = useContext(TehsilContext);
  const maqamReports = useContext(MaqamReportContext);
  const divisionReports = useContext(DivisionReportContext);
  const halqaReports = useContext(HalqaReportContext);
  const provinceReports = useContext(ProvinceReportContext);
  const areaDetails = useContext(ViewDetails);
  const me = useContext(MeContext);
  const [userAreaType, setUserAreaType] = useState("All");
  const [areas, setAreas] = useState([]);
  const [toggle, setToggle] = useState("unFilled");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [queryDate, setQuerydate] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [umeedwarReports, setUmeedwarReports] = useState([]);
  const [umeedwars, setUmeedwars] = useState([]);
  const [personalUnfilled, setPersonalUnfilled] = useState([]);
  const [personalFilled, setPersonalFilled] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [show, setShow] = useState(true);
  const [showData, setShowData] = useState(false);
  const [month, setMonth] = useState();
  let date;
  const tableRef = useRef();
  useEffect(() => {
    if (queryDate) {
      date = new Date(queryDate);
      setMonth(date.toLocaleString("default", { month: "long" }));
    } else {
      date = new Date();
      setMonth(date.toLocaleString("default", { month: "long" }));
    }
  }, [queryDate]);
  const getAllReports = async () => {
    const req = await instance.get(`/umeedwar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      },
    });
    setUmeedwarReports(req?.data?.data?.data);
  };
  useEffect(() => {
    getAllReports();
    getHalqas();
  }, []);
  const getData = async () => {
    setShowData(true);
    setLoading(true);
    // Check if data is already stored in session storage
    if (userAreaType === "personal" && queryDate !== "") {
      handlePersonalFilledReports();
    } else {
      const storedData = sessionStorage.getItem("storedData");
      if (queryDate !== "" || !storedData) {
        setLoading(true);
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
          const ilaqa = await getUnfilledReports("ilaqa");
          const provinceData = province?.data?.data?.allProvince || [];
          const maqamData = maqam?.data?.data?.allMaqams || [];
          const halqaData = halqa?.data?.data?.allHalqas || [];
          const divisionData = division?.data?.data?.allDivisions || [];
          const ilaqaData = ilaqa?.data?.data?.allIlaqas || [];
          const getFilteredHalqas = (halqaData) => [
            ...halqaData.filter((h) => {
              if (userAreaType === "Maqam") {
                if (
                  (h?.parentType === "Maqam" || h.parentType === "Ilaqa") &&
                  (h?.parentId?._id === selectedId ||
                    h.parentId?.maqam === selectedId)
                ) {
                  return true;
                }
                return false;
              }
              if (userAreaType === "Tehsil") {
                if (h.parentType === "Tehsil" || h.parentType === "Division") {
                  const district = h?.parentId?.district;
                  const halqas = h?.parentId?.division === selectedId;
                  const filteredDistricts = districts
                    .filter((dis) => dis?.division?._id === selectedId)
                    .map((div) => div?._id);

                  return filteredDistricts.includes(district) || halqas;
                }
                return false;
              }
              return false;
            }),
          ];
          const temp = {
            unfilled: null,
            totalAreas: 1,
            filled: null,
            allData:
              userAreaType === "All"
                ? [
                    ...provinceData,
                    ...maqamData,
                    ...halqaData,
                    ...divisionData,
                    ...ilaqaData,
                  ]
                : getFilteredHalqas(halqaData),
          };
          temp.unfilled =
            userAreaType === "All"
              ? [
                  ...province?.data?.data?.unfilled,
                  ...maqam?.data?.data?.unfilled,
                  ...halqa?.data?.data?.unfilled,
                  ...division?.data?.data?.unfilled,
                  ...ilaqa?.data?.data?.unfilled,
                ]
              : getFilteredHalqas(halqa?.data?.data?.unfilled);
          temp.totalAreas =
            province?.data?.data?.totalprovince +
            maqam?.data?.data?.totalmaqam +
            halqa?.data?.data?.totalhalqa +
            division?.data?.data?.totaldivision +
            ilaqa?.data?.data?.totalIlaqa;
          const reportFilledBy = temp?.allData?.filter((obj1) => {
            return !temp?.unfilled?.some((obj2) => obj2._id === obj1._id);
          });
          temp.filled = reportFilledBy;
          // Save data to session storage
          const storedData = sessionStorage.getItem("storedData");
          if (!storedData) {
            sessionStorage.setItem("storedData", JSON.stringify(temp));
          }
          setData({ ...temp });
          setLoading(false);
          // saving the initial data so that on clear filter can set it back
          if (!initialData?.data) {
            setInitialData({ ...initialData, data: temp });
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      } else {
        setData(JSON.parse(storedData));
        window.scroll({
          top: document.body.offsetHeight,
          left: 0,
          bottom: 0,
          behavior: "smooth",
        });
      }
      setLoading(false);
      window.scroll({
        top: document.body.offsetHeight,
        left: 0,
        bottom: 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const storedData = sessionStorage.getItem("storedData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const clearFilter = () => {
    // setting back the data from initial state back to the respective sates
    setQuerydate("");
    setUserAreaType("All");
    const storedData = sessionStorage.getItem("storedData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    setPersonalFilled(initialData?.personalF);
    setPersonalUnfilled(initialData?.personalU);
    setUmeedwars(initialData?.validNazim);
  };

  // FETCH PERSONAL REPORTS

  const getPsersonalReports = async () => {
    const req = await instance.get(`/umeedwar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      },
    });
    setCount(req?.data?.data.length);
  };
  useEffect(() => {
    try {
      if (
        localStorage.getItem("@nazimType") !== "rukan" &&
        localStorage.getItem("@nazimType") !== "umeedwar"
      ) {
        setCount(
          maqamReports?.length +
            divisionReports?.length +
            halqaReports?.length +
            provinceReports?.length
        );
      } else {
        getPsersonalReports();
      }
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

  // filter PERSONAL REPORTS

  const handlePersonalFilledReports = () => {
    // Set currentMonth based on queryDate or default to current month
    let currentMonth =
      queryDate && queryDate !== "" ? new Date(queryDate) : new Date();

    // Set firstDayOfCurrentMonth to the 1st of the current month
    const firstDayOfCurrentMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 0,
      1
    );

    // Set lastDayOfCurrentMonth to the last day of the current month
    const lastDayOfCurrentMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    // Filter out reports within the current month
    const requiredUmeedwarReports = umeedwarReports?.filter((report) => {
      const reportDate = new Date(report?.month);
      return (
        reportDate >= firstDayOfCurrentMonth &&
        reportDate <= lastDayOfCurrentMonth
      );
    });
    // Filter out nazim who are not of type "nazim"
    const validNazim = nazim.filter(
      (n) => n?.nazimType && n?.nazimType !== "nazim"
    );
    // Get IDs of validNazim
    const validNazimIds = validNazim.map((n) => n?._id);
    // Get IDs of nazim who have filled personal reports
    const nazimFilledPersonalIds = requiredUmeedwarReports.map(
      (report) => report?.userId
    );
    const array = nazimFilledPersonalIds?.map((user) => user?._id);
    // Get IDs of unfilled nazim
    const unfilledIds = validNazimIds?.filter((id) => !array?.includes(id));
    // Separate filled and unfilled nazim
    const filledNazim = nazim.filter((n) => array.includes(n?._id));
    const unfilledNazim = nazim.filter((n) => unfilledIds.includes(n?._id));
    // saving the initial data so that on clear filter can set it back
    if (!initialData || !initialData.nazim || initialData.nazim.length === 0) {
      setInitialData((prevData) => ({
        ...prevData,
        nazim: nazim,
        personalF: filledNazim,
        personalU: unfilledNazim,
      }));
    }
    // Set the state variables
    setLoading(false);
    setUmeedwars(validNazim);
    setPersonalFilled(filledNazim);
    setPersonalUnfilled(unfilledNazim);
  };
  useEffect(() => {
    handlePersonalFilledReports();
    // eslint-disable-next-line
  }, [umeedwarReports, nazim]);
  return (
    <GeneralLayout title={"Dashboard"} active={"dashboard"}>
      {
        <div className="relative flex flex-col w-full gap-3 items-center p-5 justify-start h-[calc(100vh-65.6px-64px)] overflow-hidden overflow-y-scroll bg-blue-50">
          <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-4 sm:px-8 w-full">
            {["province", "country", "maqam", "division"].includes(
              localStorage.getItem("@type")
            ) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
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
                    <p className="text-3xl">
                      {nazim?.filter((naz) => naz?.isDeleted == false).length}
                    </p>
                  </div>
                </div>
              )}

            {["country"].includes(localStorage.getItem("@type")) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-4 bg-gray-400">
                    <CiLocationOn className="w-12 h-12 text-white" />
                  </div>
                  <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Provinces</h3>
                    <p className="text-3xl">
                      {
                        provinces?.filter(
                          (province) => province?.disabled !== true
                        ).length
                      }
                    </p>
                  </div>
                </div>
              )}
            {["maqam", "country", "province"].includes(
              localStorage.getItem("@type")
            ) &&
              ilaqa?.length > 0 &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-4 bg-slate-600">
                    <CiLocationOn className="w-12 h-12 text-white" />
                  </div>
                  <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Ilaqas</h3>
                    <p className="text-3xl">
                      {ilaqa?.filter((il) => il?.disabled !== true).length}
                    </p>
                  </div>
                </div>
              )}
            {["province", "country"].includes(localStorage.getItem("@type")) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-4 bg-indigo-400">
                    <CiLocationOn className="w-12 h-12 text-white" />
                  </div>
                  <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Maqams</h3>
                    <p className="text-3xl">
                      {
                        maqams?.filter((maqam) => maqam?.disabled !== true)
                          .length
                      }
                    </p>
                  </div>
                </div>
              )}
            {["province", "country"].includes(localStorage.getItem("@type")) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-4 bg-red-400">
                    <FaLocationDot className="h-12 w-12 text-white" />
                  </div>
                  <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Divisions</h3>
                    <p className="text-3xl">
                      {
                        divisions?.filter(
                          (division) => division?.disabled !== true
                        ).length
                      }
                    </p>
                  </div>
                </div>
              )}
            {["division"].includes(localStorage.getItem("@type")) &&
              districts?.lentgth > 0 &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-4 bg-red-400">
                    <FaLocationDot className="h-12 w-12 text-white" />
                  </div>
                  <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Districts</h3>
                    <p className="text-3xl">
                      {
                        districts?.filter(
                          (district) => district?.disabled !== true
                        ).length
                      }
                    </p>
                  </div>
                </div>
              )}
            {["division"].includes(localStorage.getItem("@type")) &&
              tehsils?.length > 0 &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-4 bg-indigo-400">
                    <CiLocationOn className="h-12 w-12 text-white" />
                  </div>
                  <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Tehsils</h3>
                    <p className="text-3xl">
                      {
                        tehsils?.filter((tehsil) => tehsil?.disabled !== true)
                          .length
                      }
                    </p>
                  </div>
                </div>
              )}
            {localStorage.getItem("@type") !== "halqa" &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                  <div className="p-4 bg-red-400">
                    <FaLocationArrow className="w-12 h-12 text-white" />
                  </div>
                  <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Units</h3>
                    <p className="text-3xl">{unit.length}</p>
                  </div>
                </div>
              )}
            {localStorage.getItem("@type") === "halqa" && (
              <div
                onClick={() =>
                  me?.nazimType === "rukan" || me?.nazimType === "umeedwar"
                    ? navigate("/personalReport/create")
                    : navigate("/reports/create")
                }
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
          {localStorage.getItem("@type") !== "halqa" &&
            !showData &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) && (
              <button
                onClick={getData}
                className="btn btn-neutral w-full md:w-auto border-none capitalize"
              >
                See Reports Status
                <FaArrowDown />
              </button>
            )}
          {localStorage.getItem("@type") !== "halqa" &&
            showData &&
            ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
              localStorage.getItem("@nazimType")
            ) && (
              <button
                onClick={() => setShowData(false)}
                className="btn btn-neutral w-full md:w-auto border-none capitalize"
              >
                Close Reports Status
                <FaArrowUp />
              </button>
            )}
          {showData && (
            <div className=" gap-4 mt-4 sm:px-8 w-full flex flex-col ">
              <div className="w-full flex justify-end items-center">
                <button
                  className="btn"
                  onClick={() => {
                    document
                      .getElementById("filter_filled_unfilled_modal")
                      .showModal();
                  }}
                >
                  Filter <FaFilter />
                </button>
                <button className="btn" onClick={clearFilter}>
                  Clear Filter
                </button>
              </div>

              {showData && (
                <div className="w-full flex justify-between items-center flex-wrap">
                  <div
                    style={{
                      color: toggle === "pFilled" ? "" : "#3B82F6",
                    }}
                    onClick={() => {
                      setToggle("pFilled");
                      setUserAreaType("personal");
                      setShow(false);
                    }}
                    className="capitalize items-center text-start underline w-[50%] md:w-auto font-semibold cursor-pointer pb-1"
                  >
                    Personal Filled {personalFilled?.length}
                  </div>
                  <div
                    style={{
                      color: toggle === "pUnFilled" ? "" : "#3B82F6",
                    }}
                    onClick={() => {
                      setToggle("pUnFilled");
                      setUserAreaType("personal");
                      setShow(false);
                    }}
                    className="capitalize items-center text-start underline w-[50%] md:w-auto font-semibold cursor-pointer pb-1"
                  >
                    Personal Unfilled {personalUnfilled?.length}
                  </div>

                  <div
                    style={{
                      color: toggle === "filled" ? "" : "#3B82F6",
                    }}
                    onClick={() => {
                      setShow(true);
                      setToggle("filled");
                    }}
                    className="capitalize items-center text-start underline w-[50%] md:w-auto font-semibold cursor-pointer pb-1"
                  >
                    Filled {data?.filled?.length}
                  </div>
                  <div
                    style={{
                      color: toggle === "unFilled" ? "" : "#3B82F6",
                    }}
                    onClick={() => {
                      setShow(true);
                      setToggle("unFilled");
                    }}
                    className="capitalize items-center text-start underline w-[50%] md:w-auto font-semibold cursor-pointer pb-1"
                  >
                    Unfilled {data?.unfilled?.length}
                  </div>
                </div>
              )}
              <hr />
              {showData && (
                <div className="overflow-x-auto grid grid-cols-1 gap-4 mt-3 sm:grid-cols-1 sm:px-4 w-full transition ease-in-out duration-300">
                  <div className="w-full mb-3 h-[300px] overflow-auto overflow-y-scroll">
                    <p className="text-slate-500 ">Reports of {month}</p>
                    {show && (
                      <table className="table mb-7" ref={tableRef}>
                        {/* head */}
                        <thead className="">
                          <tr className="w-full flex justify-between">
                            <th className="text-start">Area</th>
                            <th className="text-center">Nazim</th>
                            <th className="text-right">View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {toggle === "filled" ? (
                            data?.filled?.length > 0 ? (
                              data?.filled
                                ?.filter((i) => !i?.disabled)
                                ?.map((obj, index) => (
                                  <tr
                                    key={index}
                                    className={`w-full flex  ${
                                      index % 2 === 0 && "bg-[#B2D5FF]"
                                    }`}
                                  >
                                    <td className="w-[50%] ">
                                      <p
                                        className="text-xs w-full"
                                        style={{
                                          textTransform: "capitalize",
                                          fontSize: "smaller",
                                        }}
                                      >
                                        {obj.name}
                                      </p>
                                    </td>
                                    <td className="w-[50%]">
                                      {nazim.find(
                                        (i) => i?.userAreaId?._id === obj?._id
                                      )?.name || (
                                        <span
                                          style={{
                                            textTransform: "capitalize",
                                            fontSize: "smaller",
                                          }}
                                          className="text-start text-error"
                                        >
                                          User Not Registered Yet
                                        </span>
                                      )}
                                    </td>
                                    <td className="">
                                      <div
                                        onClick={() => {
                                          getAreaDetails(obj);
                                        }}
                                      >
                                        <FcViewDetails className="cursor-pointer text-2xl p-0 m-0" />
                                      </div>
                                    </td>
                                  </tr>
                                ))
                            ) : (
                              <tr>
                                <td colSpan="2">
                                  No one has filled report yet
                                </td>
                              </tr>
                            )
                          ) : data?.unfilled?.length > 0 ? (
                            data?.unfilled
                              .filter((i) => !i?.disabled)
                              .map((obj, index) => (
                                <tr
                                  className={`w-full flex items-center ${
                                    index % 2 === 0 && "bg-[#B2D5FF]"
                                  }`}
                                  key={obj?._id}
                                >
                                  <td className="w-[50%] ">
                                    <p
                                      className="text-xs w-full"
                                      style={{
                                        textTransform: "capitalize",
                                        fontSize: "smaller",
                                      }}
                                    >
                                      {obj.name}
                                      {obj?.parentType
                                        ? "-" + obj?.parentType
                                        : ""}
                                    </p>
                                  </td>
                                  <td className="w-[50%]">
                                    {nazim.find(
                                      (i) => i?.userAreaId?._id === obj?._id
                                    )?.name || (
                                      <span
                                        style={{
                                          textTransform: "capitalize",
                                          fontSize: "smaller",
                                        }}
                                        className="text-start text-error"
                                      >
                                        User Not Registered
                                      </span>
                                    )}
                                  </td>
                                  <td className="">
                                    <div
                                      onClick={() => {
                                        getAreaDetails(obj);
                                      }}
                                    >
                                      <FcViewDetails className="cursor-pointer text-2xl" />
                                    </div>
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
                    )}
                    {!show && (
                      <table className="table mb-7 ">
                        {/* head */}
                        <thead className="">
                          <tr className="w-full flex">
                            <th className="w-[50%]">Name</th>
                            <th className="w-[50%]">Area</th>
                          </tr>
                        </thead>
                        <tbody>
                          {toggle === "pFilled" ? (
                            personalFilled?.length > 0 ? (
                              personalFilled
                                .filter((i) => !i?.disabled)
                                .map((obj, index) => (
                                  <tr
                                    key={index}
                                    className={`w-full flex items-center ${
                                      index % 2 === 0 && "bg-[#B2D5FF]"
                                    }`}
                                  >
                                    <td className="w-[50%]">{obj.name}</td>
                                    <td className="w-[50%]">
                                      {obj?.userAreaId?.name}
                                    </td>
                                  </tr>
                                ))
                            ) : (
                              <tr>
                                <td colSpan="2">
                                  No one has filled personal report yet
                                </td>
                              </tr>
                            )
                          ) : personalUnfilled?.length > 0 ? (
                            personalUnfilled
                              .filter((i) => !i?.disabled)
                              .map((obj, index) => (
                                <tr
                                  className={`w-full flex  items-center ${
                                    index % 2 === 0 && "bg-[#B2D5FF]"
                                  }`}
                                  key={index}
                                >
                                  <td className="w-[50%]">{obj.name}</td>
                                  {obj?.userAreaId?.name}
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td colSpan="2">
                                All have filled their personal Reports
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      }
      <dialog id="filter_filled_unfilled_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Filter Data</h3>
          <div className="w-full  flex justify-between items-center  flex-wrap">
            <div className="flex flex-col w-full justify-start items-center gap-3 mb-3">
              <div className=" w-full flex items-center justify-start gap-2 border border-primary p-2 rounded-lg">
                {show && (
                  <>
                    {(me?.userAreaType === "Province" ||
                      me?.userAreaType === "Country") && (
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
                    )}
                    {(me?.userAreaType === "Province" ||
                      me?.userAreaType === "Country") && (
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
                    )}

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
                  </>
                )}
                {!show && (
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="userAreaType"
                        className="radio checked:bg-blue-500"
                        value="personal"
                        checked={userAreaType === "personal"}
                        onChange={(e) => setUserAreaType(e.target.value)}
                      />
                      <span className="label-text">personal</span>
                    </label>
                  </div>
                )}
              </div>
              {userAreaType !== "All" && userAreaType !== "personal" && (
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
                    type="search"
                    autoComplete="off"
                    className="input  input-bordered input-primary w-full  mb-3"
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
                    className="absolute hidden z-10 max-h-[100px] overflow-y-scroll bg-white border border-gray-300 w-full mt-1"
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
      <dialog id="area_details" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Details of the area</h3>
          <div className="w-full  flex flex-col justify-between items-start text-left gap-4  flex-wrap">
            <div className="w-full flex justify-start items-center gap-5">
              <h5>Name:</h5>
              <h4 className="text-gray-400 font-bold">{areaDetails?.name}</h4>
              <h4 className="text-grstart underline w-[50%] md:w-auto font-semibold">
                {areaDetails?.parentType === "Ilaqa" ||
                areaDetails?.parentType === "Tehsil" ||
                areaDetails?.parentType === "Division" ||
                areaDetails?.parentType === "Maqam"
                  ? "(Halqa)"
                  : !areaDetails?.parentId && areaDetails?.maqam
                  ? "(Ilaqa)"
                  : areaDetails?.country
                  ? "(Province)"
                  : `(${areaDetails?.areaType})`}
              </h4>
            </div>
            <div className="w-full flex justify-start items-center gap-5">
              {areaDetails?.parentType
                ? areaDetails?.parentType + ":"
                : areaDetails?.maqam
                ? "Maqam"
                : ""}
              <h4 className="text-gray-400 font-bold">
                {areaDetails?.parentType === "Ilaqa"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.parentType === "Maqam"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.parentType === "Tehsil"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.parentType === "Division"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.maqam
                  ? areaDetails?.maqam?.name
                  : ""}
              </h4>
            </div>

            {areaDetails?.parentType === "Tehsil" &&
              !areaDetails?.parentType === "Division" && (
                <>
                  <div className="w-full flex justify-start items-center gap-5">
                    <h5> District:</h5>
                    <h4 className="text-gray-400 font-bold">
                      {areaDetails?.parentId?.district
                        ? areaDetails?.parentId?.district?.name
                        : "Not a District aera"}
                    </h4>
                  </div>
                  <div className="w-full flex justify-start items-center gap-5">
                    <h5>Division:</h5>
                    <h4 className="text-gray-400 font-bold">
                      {areaDetails?.parentId?.district
                        ? areaDetails?.parentId?.district?.division?.name
                        : areaDetails?.division?.name}
                    </h4>
                  </div>
                </>
              )}
            {areaDetails?.parentType === "Ilaqa" && (
              <div className="w-full flex justify-start items-center gap-5">
                <h5>Maqam:</h5>
                <h4 className="text-gray-400 font-bold">
                  {areaDetails?.parentType === "Ilaqa"
                    ? areaDetails?.parentId?.maqam?.name
                    : ""}
                </h4>
              </div>
            )}
            {!areaDetails?.country && (
              <div className="w-full flex justify-start items-center gap-5">
                <h4>Province:</h4>
                <h4 className="text-gray-400 font-bold">
                  {areaDetails?.parentType === "Ilaqa"
                    ? areaDetails?.parentId?.maqam?.province?.name
                    : areaDetails?.parentType === "Maqam"
                    ? areaDetails?.parentId?.province?.name
                    : areaDetails?.parentType === "Tehsil"
                    ? areaDetails?.parentId?.district?.division?.province?.name
                    : areaDetails?.parentType === "Division"
                    ? areaDetails?.parentId?.province?.name
                    : areaDetails?.maqam
                    ? areaDetails?.maqam?.province?.name
                    : ""}
                </h4>
              </div>
            )}
            <div className="w-full flex justify-start items-center gap-5">
              <h5>Country:</h5>
              <h4 className="text-gray-400 font-bold">Pakistan</h4>
            </div>
          </div>
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              <div className=" w-full flex justify-end gap-3 items-center">
                <button
                  id="close-details-modal"
                  className="btn ms-3 capitalize"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </GeneralLayout>
  );
};
