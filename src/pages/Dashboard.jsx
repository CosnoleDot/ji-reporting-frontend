import { useContext, useRef, useState } from "react";
import { GeneralLayout } from "../components";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
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
  HalqaContext,
  MaqamContext,
  MeContext,
  ProvinceContext,
  TehsilContext,
  IlaqaContext,
  ViewDetails,
} from "../context";
import { UIContext } from "../context/ui";
import { useNavigate } from "react-router-dom";
import instance from "../api/instrance";
import {
  District,
  Division,
  Ilaqas,
  Map,
  Maqams,
  Tehsil,
  Units,
} from "../assets/png";

export const Dashboard = () => {
  const { getHalqas } = useContext(UIContext);
  const { nazim, setLoading, getAreaDetails } = useContext(UIContext);
  const maqams = useContext(MaqamContext);
  const divisions = useContext(DivisionContext);
  const provinces = useContext(ProvinceContext);
  const unit = useContext(HalqaContext);
  const ilaqa = useContext(IlaqaContext);
  const districts = useContext(DistrictContext);
  const tehsils = useContext(TehsilContext);
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
  const getPsersonalReports = async () => {
    setLoading(true);
    if (!queryDate) {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const findData = `${year}-${month}`;
      const req = await instance.get(`/umeedwar?date=${findData}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      });
      setUmeedwarReports(req?.data?.data?.data);
      setLoading(false);
    } else {
      const req = await instance.get(`/umeedwar?date=${queryDate}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      });
      setUmeedwarReports(req?.data?.data?.data);
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    getHalqas();
  }, []);
  useEffect(() => {
    handlePersonalFilledReports();
  }, [umeedwarReports]);
  const getData = async () => {
    setLoading(true);
    setShowData(true);
    // Check if data is already stored in session storage
    const storedData = sessionStorage.getItem("storedData");
    if (queryDate !== "" || !storedData) {
      setLoading(true);
      try {
        const getUnfilledReports = async (path) => {
          setLoading(true);
          const res = await instance.get(
            `/reports/${path}/data/filled-unfilled`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("@token")}`,
              },
              params: queryDate !== "" ? { queryDate: queryDate } : null,
            }
          );
          setLoading(false);
          return res;
        };
        let markaz = [];
        let province, maqam, division, ilaqa, halqa;
        // if (me?.userAreaType === "Country" && userAreaType === "All") {
        //   markaz = await getUnfilledReports("markaz");
        // }

        // province = await getUnfilledReports("province");
        // maqam = await getUnfilledReports("maqam");
        // division = await getUnfilledReports("division");
        // ilaqa = await getUnfilledReports("ilaqa");
        // halqa = await getUnfilledReports("halqa");

        switch (userAreaType) {
          case "All":
            if (me?.userAreaType === "Country" && userAreaType === "All") {
              markaz = await getUnfilledReports("markaz");
              province = await getUnfilledReports("province");
              maqam = await getUnfilledReports("maqam");
              division = await getUnfilledReports("division");
              ilaqa = await getUnfilledReports("ilaqa");
              halqa = await getUnfilledReports("halqa");
            } else if (me?.userAreaType === "Division") {
              division = await getUnfilledReports("division");
              halqa = await getUnfilledReports("halqa");
            } else if (me?.userAreaType === "Maqam") {
              maqam = await getUnfilledReports("maqam");
              ilaqa = await getUnfilledReports("ilaqa");
              halqa = await getUnfilledReports("halqa");
            } else if (me?.userAreaType === "Province") {
              province = await getUnfilledReports("province");
              maqam = await getUnfilledReports("maqam");
              ilaqa = await getUnfilledReports("ilaqa");
              halqa = await getUnfilledReports("halqa");
              division = await getUnfilledReports("division");
            } else if (me?.userAreaType === "Ilaqa") {
              ilaqa = await getUnfilledReports("ilaqa");
              halqa = await getUnfilledReports("halqa");
            }
            break;
          case "Province":
            if (me?.userAreaType === "Country") {
              province = await getUnfilledReports("province");
            }
            break;
          case "Country":
            if (me?.userAreaType === "Country") {
              markaz = await getUnfilledReports("markaz");
            }
            break;
          case "Tehsil":
            if (
              me?.userAreaType === "Province" ||
              me?.userAreaType === "Country"
            ) {
              halqa = await getUnfilledReports("halqa");
            }
            break;
          case "Maqam":
            if (
              me?.userAreaType === "Province" ||
              me?.userAreaType === "Country"
            ) {
              halqa = await getUnfilledReports("halqa");
              ilaqa = await getUnfilledReports("ilaqa");
            }
            break;
          case "Ilaqa":
            if (
              me?.userAreaType === "Province" ||
              me?.userAreaType === "Country" ||
              me?.userAreaType === "Maqam"
            ) {
              halqa = await getUnfilledReports("halqa");
            }
            break;
          default:
            console.log("Invalid user area type");
            return;
        }

        const markazData = markaz?.data?.data?.allCountries || [];
        const provinceData = province?.data?.data?.allProvince || [];
        const maqamData = maqam?.data?.data?.allMaqams || [];
        const divisionData = division?.data?.data?.allDivisions || [];
        const ilaqaData = ilaqa?.data?.data?.allIlaqas || [];
        const halqaData = halqa?.data?.data?.allHalqas || [];
        const getFilteredHalqas = (fData) => [
          ...fData.filter((h) => {
            if (userAreaType === "Maqam") {
              if (
                (h?.parentType === "Ilaqa" ||
                  h?.province ||
                  h?.parentType === "Maqam") &&
                (h?.parentId?.maqam === selectedId ||
                  h?._id === selectedId ||
                  h?.parentId?._id === selectedId ||
                  h?.parentId === selectedId)
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
                  ?.filter((dis) => dis?.division?._id === selectedId)
                  ?.map((div) => div?._id);

                return filteredDistricts.includes(district) || halqas;
              }
              return false;
            }
            if (userAreaType === "Ilaqa") {
              if (
                (h?.parentType === "Ilaqa" || h?.maqam) &&
                (h?.parentId?._id === selectedId || h?._id === selectedId)
              ) {
                return true;
              }
              return false;
            }
            return false;
          }),
        ];
        const tempMaqamData = [...maqamData, ...ilaqaData, ...halqaData];
        const tempIlaqaData = [...ilaqaData, ...halqaData];
        const temp = {
          unfilled: null,
          totalAreas: 1,
          filled: null,
          allData:
            userAreaType === "All"
              ? [
                  ...markazData,
                  ...provinceData,
                  ...maqamData,
                  ...divisionData,
                  ...ilaqaData,
                  ...halqaData,
                ]
              : userAreaType === "Country"
              ? [...markazData]
              : userAreaType === "Province"
              ? [...provinceData]
              : userAreaType === "Maqam"
              ? getFilteredHalqas(tempMaqamData)
              : userAreaType === "Ilaqa"
              ? getFilteredHalqas(tempIlaqaData)
              : getFilteredHalqas(halqaData),
        };
        const temMaqamUnfilled = [
          ...(halqa?.data?.data?.unfilled || []),
          ...(ilaqa?.data?.data?.unfilled || []),
          ...(maqam?.data?.data?.unfilled || []),
        ];
        const temIlaqaUnfilled = [
          ...(halqa?.data?.data?.unfilled || []),
          ...(ilaqa?.data?.data?.unfilled || []),
        ];
        temp.unfilled =
          userAreaType === "All"
            ? [
                ...(markaz?.data?.data?.unfilled || []),
                ...(province?.data?.data?.unfilled || []),
                ...(maqam?.data?.data?.unfilled || []),
                ...(division?.data?.data?.unfilled || []),
                ...(ilaqa?.data?.data?.unfilled || []),
                ...(halqa?.data?.data?.unfilled || []),
              ]
            : userAreaType === "Country"
            ? markaz?.data?.data?.unfilled
            : userAreaType === "Province"
            ? province?.data?.data?.unfilled || []
            : userAreaType === "Maqam"
            ? getFilteredHalqas(temMaqamUnfilled) || []
            : userAreaType === "Ilaqa"
            ? getFilteredHalqas(temIlaqaUnfilled) || []
            : getFilteredHalqas(halqa?.data?.data?.unfilled);
        temp.totalAreas =
          markaz?.data?.data?.totalCountries ||
          0 +
            province?.data?.data?.totalprovince +
            maqam?.data?.data?.totalmaqam +
            division?.data?.data?.totaldivision +
            ilaqa?.data?.data?.totalIlaqa +
            halqa?.data?.data?.totalhalqa;
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
    }
    setLoading(false);
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

  const getAreas = async () => {
    switch (userAreaType) {
      case "Tehsil":
        setAreas(divisions);
        break;
      case "Maqam":
        setAreas(maqams);
        break;
      case "Ilaqa":
        setAreas(ilaqa);
        break;
      case "Province":
        setAreas(provinces);
        break;
      case "Country":
        setAreas([me?.userAreaId]);
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
    // Filter out nazim who are not of type "nazim"
    const validNazim = nazim?.filter(
      (n) => n?.nazimType && n?.nazimType !== "nazim"
    );
    // Get IDs of validNazim
    const validNazimIds = validNazim?.map((n) => n?._id);
    // Get IDs of nazim who have filled personal reports
    const nazimFilledPersonalIds = umeedwarReports?.map(
      (report) => report?.userId?._id
    );
    // Get IDs of unfilled nazim
    const unfilledIds = validNazimIds?.filter(
      (id) => !nazimFilledPersonalIds?.includes(id)
    );
    // Separate filled and unfilled nazim
    const filledNazim = umeedwarReports.filter((n) =>
      nazimFilledPersonalIds.includes(n?.userId?._id)
    );
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
    setLoading(false);
    setUmeedwars(validNazim);
    setPersonalFilled(filledNazim);
    setPersonalUnfilled(unfilledNazim);
  };
  return (
    <GeneralLayout title={"Dashboard"} active={"dashboard"}>
      {
        <div className="  flex flex-col gap-3 items-center p-5 justify-start overflow-y-scroll">
          <div className="flex w-full py-4 mb-4 border-b border-inputBorder">
            <div className="">
              <h1 class="font-inter text-heading text-[18px] font-medium leading-[28px] text-left">
                Dashborad
              </h1>
              <p class="font-inter text-[14px] font-normal leading-[20px] text-left text-secondaryText">
                Get a sneak peek into your data
              </p>
            </div>
          </div>
          <div
            className={`grid md:grid-cols-4 ${
              localStorage.getItem("@type") === "halqa"
                ? "grid-cols-1"
                : "grid-cols-2"
            } gap-2 w-full`}
          >
            {["province", "country", "maqam", "division"].includes(
              localStorage.getItem("@type")
            ) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex border rounded-2xl md:h-[130px] h-[100px] p-2 md:p-4 overflow-hidden shadow bg-cardsBg">
                  <div className="px-4 flex flex-col gap-2  justify-end">
                    <p className="text-[24px] md:text-[32px] font-extrabold font-inter leading-10 text-primary">
                      {nazim?.filter((naz) => naz?.isDeleted == false).length}
                    </p>
                    <h3 class="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                      Active Nazims
                    </h3>
                  </div>
                  <div className="flex flex-row w-full justify-center md:justify-end">
                    <div className="h-full md:max-h-11">
                      <FaUsers className="h-8 w-8 text-[#a834eb]" />
                    </div>
                  </div>
                </div>
              )}

            {["country"].includes(localStorage.getItem("@type")) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex border rounded-2xl md:h-[130px] h-[100px] p-2 md:p-4 overflow-hidden shadow bg-cardsBg">
                  <div className="px-4 flex flex-col gap-2  justify-end">
                    <p className="text-[24px] md:text-[32px] font-extrabold font-inter leading-10 text-primary">
                      {provinces?.filter(
                        (province) => province?.disabled !== true
                      ).length || me?.userAreaId?.activeProvinceCount}
                    </p>
                    <h3 className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                      Active Provinces
                    </h3>
                  </div>
                  <div className="flex flex-row w-full justify-center md:justify-end">
                    <div className="h-full md:max-h-11">
                      <img src={Map} alt="" className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              )}
            {["province", "country"].includes(localStorage.getItem("@type")) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex border rounded-2xl md:h-[130px] h-[100px] p-2 md:p-4 overflow-hidden shadow bg-cardsBg">
                  <div className="px-4 flex flex-col gap-2  justify-end">
                    <p className="text-[24px] md:text-[32px] font-extrabold font-inter leading-10 text-primary">
                      {divisions?.filter(
                        (division) => division?.disabled !== true
                      ).length || me?.userAreaId?.activeDivisionCount}
                    </p>
                    <h3 className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                      Active Divisions
                    </h3>
                  </div>
                  <div className="flex flex-row w-full justify-center md:justify-end">
                    <div className="h-full md:max-h-11">
                      <img src={District} alt="" className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              )}
            {["province", "country", "division"].includes(
              localStorage.getItem("@type")
            ) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex border rounded-2xl md:h-[130px] h-[100px] p-2 md:p-4 overflow-hidden shadow bg-cardsBg">
                  <div className="px-4 flex flex-col gap-2  justify-end">
                    <p className="text-[24px] md:text-[32px] font-extrabold font-inter leading-10 text-primary">
                      {districts?.filter(
                        (district) => district?.disabled !== true
                      ).length || me?.userAreaId?.activeDistrictCount}
                    </p>
                    <h3 className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                      Active Districts
                    </h3>
                  </div>
                  <div className="flex flex-row w-full justify-center md:justify-end">
                    <div className="  w-10 h-10 flex items-center justify-center">
                      <img src={Division} alt="" className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              )}
            {["division", "country", "province"].includes(
              localStorage.getItem("@type")
            ) &&
              me?.userAreaId?.activeTehsilCount &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex border rounded-2xl md:h-[130px] h-[100px] p-2 md:p-4 overflow-hidden shadow bg-cardsBg">
                  <div className="px-4 flex flex-col gap-2  justify-end">
                    <p className="text-[24px] md:text-[32px] font-extrabold font-inter leading-10 text-primary">
                      {tehsils?.filter((tehsil) => tehsil?.disabled !== true)
                        .length || me?.userAreaId?.activeTehsilCount}
                    </p>
                    <h3 className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                      Active Tehsils
                    </h3>
                  </div>
                  <div className="flex flex-row w-full justify-center md:justify-end">
                    <div className=" max-h-11">
                      <img
                        src={Tehsil}
                        className="h-8 w-8"
                        alt="tehsil_image"
                      />
                    </div>
                  </div>
                </div>
              )}
            {["province", "country", "province"].includes(
              localStorage.getItem("@type")
            ) &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex border rounded-2xl md:h-[130px] h-[100px] p-2 md:p-4 overflow-hidden shadow bg-cardsBg">
                  <div className="px-4 flex flex-col gap-2  justify-end">
                    <p className="text-[24px] md:text-[32px] font-extrabold font-inter leading-10 text-primary">
                      {maqams?.filter((maqam) => maqam?.disabled !== true)
                        .length || me?.userAreaId?.activeMaqamCount}
                    </p>
                    <h3 className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                      Active Maqams
                    </h3>
                  </div>
                  <div className="flex flex-row w-full justify-center md:justify-end">
                    <div className=" max-h-11">
                      <img src={Maqams} className="h-8 w-8" alt="maqam_image" />
                    </div>
                  </div>
                </div>
              )}
            {["maqam", "country", "province"].includes(
              localStorage.getItem("@type")
            ) &&
              me?.userAreaId?.activeIlaqaCount &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex border rounded-2xl md:h-[130px] h-[100px] p-2 md:p-4 overflow-hidden shadow bg-cardsBg">
                  <div className="px-4 flex flex-col gap-2  justify-end">
                    <p className="text-[24px] md:text-[32px] font-extrabold font-inter leading-10 text-primary">
                      {ilaqa?.filter((il) => il?.disabled !== true).length ||
                        me?.userAreaId?.activeIlaqaCount}
                    </p>
                    <h3 className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                      Active Ilaqas
                    </h3>
                  </div>
                  <div className="flex flex-row w-full justify-center md:justify-end">
                    <div className=" max-h-11">
                      <img src={Ilaqas} className="h-8 w-8" alt="ilaqa_image" />
                    </div>
                  </div>
                </div>
              )}
            {localStorage.getItem("@type") !== "halqa" &&
              ["nazim", "rukan-nazim", "umeedwaar-nazim"].includes(
                localStorage.getItem("@nazimType")
              ) && (
                <div className="flex border rounded-2xl md:h-[130px] h-[100px] p-2 md:p-4 overflow-hidden shadow bg-cardsBg">
                  <div className="px-4 flex flex-col gap-2  justify-end">
                    <p className="text-[24px] md:text-[32px] font-extrabold font-inter leading-10 text-primary">
                      {unit.length || me?.userAreaId?.activeHalqaCount}
                    </p>
                    <h3 className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                      Active Units
                    </h3>
                  </div>
                  <div className="flex flex-row w-full justify-center md:justify-end">
                    <div className=" max-h-11">
                      <img src={Units} className="h-8 w-8" alt="unit_image" />
                    </div>
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
                className="flex items-center border w-full bg-cardsBg rounded-sm overflow-hidden shadow cursor-pointer"
              >
                <div className="p-4 bg-primary">
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
                onClick={() => {
                  getData();
                  getPsersonalReports();
                }}
                className="bg-primary mt-8 flex items-center justify-center gap-2 p-2 rounded w-full md:w-auto border-none capitalize text-white "
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
                className="bg-primary flex mt-8 justify-center w-full items-center gap-2 p-2 rounded md:w-auto border-none capitalize text-white"
              >
                Close Reports Status
                <FaArrowUp />
              </button>
            )}
          {showData && (
            <div className=" gap-4 mt-4 sm:px-8 w-full flex flex-col ">
              <div>
                <p class="font-inter text-[16px] font-semibold leading-[20px] text-left">
                  Reports of {month}
                </p>
              </div>
              <div className="flex md:flex-row-reverse flex-col-reverse md:gap-0 gap-4 items-center">
                <div className="w-full flex md:justify-end justify-start gap-4 items-center">
                  <button
                    className="bg-primary text-white rounded p-2 flex items-center gap-2"
                    onClick={() => {
                      document
                        .getElementById("filter_filled_unfilled_modal")
                        .showModal();
                    }}
                  >
                    Filter <FaFilter />
                  </button>
                  <button
                    className="bg-primary text-white rounded p-2"
                    onClick={clearFilter}
                  >
                    Clear Filter
                  </button>
                </div>

                {showData && (
                  <div className="w-full flex justify-between items-center flex-wrap bg-cardsBg p-2">
                    <div
                      style={{
                        color: toggle === "pFilled" ? "#71717A" : "#09090B",
                        backgroundColor: toggle === "pFilled" ? "white" : "",
                      }}
                      onClick={() => {
                        setToggle("pFilled");
                        setUserAreaType("personal");
                        setShow(false);
                      }}
                      className={`font-inter md:text-[14px] ${
                        toggle === "pFilled" ? "bg-white p-1 rounded-sm" : ""
                      } p-1 text-[12px] font-medium leading-[20px] text-left cursor-pointer`}
                    >
                      Personal Filled {personalFilled?.length}
                    </div>
                    <div
                      style={{
                        color: toggle === "pUnFilled" ? "#71717A" : "#09090B",
                      }}
                      onClick={() => {
                        setToggle("pUnFilled");
                        setUserAreaType("personal");
                        setShow(false);
                      }}
                      className={`font-inter md:text-[14px] ${
                        toggle === "pUnFilled" ? "bg-white p-1 rounded-sm" : ""
                      } p-1 text-[12px] font-medium leading-[20px] text-left cursor-pointer`}
                    >
                      Personal Unfilled {personalUnfilled?.length}
                    </div>

                    <div
                      style={{
                        color: toggle === "filled" ? "#71717A" : "#09090B",
                      }}
                      onClick={() => {
                        setShow(true);
                        setToggle("filled");
                      }}
                      className={`font-inter md:text-[14px] ${
                        toggle === "filled" ? "bg-white p-1 rounded-sm" : ""
                      } p-1 text-[12px] font-medium leading-[20px] text-left cursor-pointer`}
                    >
                      Filled {data?.filled?.length}
                    </div>
                    <div
                      style={{
                        color: toggle === "unFilled" ? "#71717A" : "#09090B",
                      }}
                      onClick={() => {
                        setShow(true);
                        setToggle("unFilled");
                      }}
                      className={`font-inter md:text-[14px] ${
                        toggle === "unFilled" ? "bg-white p-1 rounded-sm" : ""
                      } p-1 text-[12px] font-medium leading-[20px] text-left cursor-pointer`}
                    >
                      Unfilled {data?.unfilled?.length}
                    </div>
                  </div>
                )}
              </div>
              <hr />
              {showData && (
                <div className="overflow-x-auto grid grid-cols-1 gap-4 mt-3 sm:grid-cols-1 sm:px-4 w-full transition ease-in-out duration-300">
                  <div>
                    {show && (
                      <table className="table mb-7 " ref={tableRef}>
                        {/* head */}
                        <thead className="">
                          <tr className="w-full flex justify-between ">
                            <th className="text-start">Area</th>
                            <th className="text-center">Nazim</th>
                            <th className="md:block hidden"></th>
                            <th className="md:block hidden"></th>
                            <th className="md:block hidden"></th>
                            <th className="text-left mr-2">Action</th>
                          </tr>
                        </thead>
                        <div className="w-full mb-3 md:h-[350px] h-[320px] overflow-auto overflow-y-scroll">
                          <tbody
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {toggle === "filled" ? (
                              data?.filled?.length > 0 ? (
                                data?.filled
                                  ?.filter((i) => !i?.disabled)
                                  ?.map((obj, index) => (
                                    <tr key={index} className={`w-full flex`}>
                                      <td className=" ">
                                        <p
                                          className="font-inter text-[14px] font-medium leading-[16.94px] text-left"
                                          style={{
                                            textTransform: "capitalize",
                                            fontSize: "smaller",
                                          }}
                                        >
                                          {obj.name
                                            ?.split("")
                                            .slice(0, 20)
                                            .join("")}
                                        </p>
                                      </td>
                                      <td className="font-inter w-[50%] text-[14px] font-medium leading-[16.94px] text-end">
                                        {nazim.find(
                                          (i) => i?.userAreaId?._id === obj?._id
                                        )?.name || (
                                          <span
                                            style={{
                                              textTransform: "capitalize",
                                              fontSize: "smaller",
                                            }}
                                            className="text-start text-destructive font-medium text-[14px] leading-4"
                                          >
                                            User Not Registered Yet
                                          </span>
                                        )}
                                      </td>
                                      <td className="w-[50%] md:block hidden"></td>
                                      <td className="w-[50%] md:block hidden"></td>
                                      <td className="w-[50%] md:block hidden"></td>
                                      <td className="">
                                        <div
                                          onClick={() => {
                                            getAreaDetails(obj);
                                          }}
                                        >
                                          <FaEye className="cursor-pointer text-2xl p-0 m-0" />
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
                                ?.filter((i) => !i?.disabled)
                                ?.map((obj, index) => (
                                  <tr
                                    className={`w-full flex items-center`}
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
                                      {nazim
                                        .find(
                                          (i) => i?.userAreaId?._id === obj?._id
                                        )
                                        ?.name?.split("")
                                        .slice(0, 20)
                                        .join("") || (
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
                                    <td className="w-[50%] md:block hidden"></td>
                                    <td className="w-[50%] md:block hidden"></td>
                                    <td className="w-[50%] md:block hidden"></td>

                                    <td className="">
                                      <div
                                        onClick={() => {
                                          getAreaDetails(obj);
                                        }}
                                      >
                                        <span class="cursor-pointer font-inter text-[14px] font-medium leading-[16.94px] text-left">
                                          <FaEye className="cursor-pointer text-2xl p-0 m-0" />
                                        </span>
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
                        </div>
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
                        <div className="w-full mb-3 h-[300px] overflow-auto overflow-y-scroll">
                          <tbody
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {toggle === "pFilled" ? (
                              personalFilled?.length > 0 ? (
                                personalFilled
                                  ?.filter((i) => !i?.disabled)
                                  ?.map((obj, index) => (
                                    <tr
                                      key={index}
                                      className={`w-full flex items-center ${
                                        index % 2 === 0 && "bg-[#B2D5FF]"
                                      }`}
                                    >
                                      <td className="w-[50%]">
                                        {obj.userId?.name
                                          ?.split("")
                                          .slice(0, 20)
                                          .join("")}
                                      </td>
                                      <td className="w-[50%]">
                                        {obj?.areaId?.name}
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
                                ?.filter((i) => !i?.disabled)
                                ?.map((obj, index) => (
                                  <tr
                                    className={`w-full flex  items-center ${
                                      index % 2 === 0 && "bg-[#B2D5FF]"
                                    }`}
                                    key={index}
                                  >
                                    <td className="w-[50%]">
                                      {obj.name
                                        ?.split("")
                                        .slice(0, 20)
                                        .join("")}
                                    </td>
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
                        </div>
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
          <h3 class="font-inter text-[16px] font-bold leading-[20px] text-left">
            Filter Data
          </h3>
          <div className="w-full  flex justify-between items-center  flex-wrap mt-2">
            <div className="flex flex-col w-full justify-start items-center gap-3 mb-3">
              <div className=" w-full flex items-center justify-start gap-2 border flex-wrap border-inputBorder p-2 rounded-lg">
                {show && (
                  <>
                    {me?.userAreaType === "Country" && (
                      <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                          <input
                            type="radio"
                            name="userAreaType"
                            className="radio checked:bg-blue-500"
                            value="Country"
                            checked={userAreaType === "Country"}
                            onChange={(e) => setUserAreaType(e.target.value)}
                          />
                          <span class="font-inter text-[14px] font-medium leading-[20px] text-left">
                            Markaz
                          </span>
                        </label>
                      </div>
                    )}
                    {me?.userAreaType === "Country" && (
                      <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                          <input
                            type="radio"
                            name="userAreaType"
                            className="radio checked:bg-blue-500"
                            value="Province"
                            checked={userAreaType === "Province"}
                            onChange={(e) => setUserAreaType(e.target.value)}
                          />
                          <span class="font-inter text-[14px] font-medium leading-[20px] text-left">
                            Province
                          </span>
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
                            value="Tehsil"
                            checked={userAreaType === "Tehsil"}
                            onChange={(e) => setUserAreaType(e.target.value)}
                          />
                          <span class="font-inter text-[14px] font-medium leading-[20px] text-left">
                            Division
                          </span>
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
                          <span class="font-inter text-[14px] font-medium leading-[20px] text-left">
                            Maqam
                          </span>
                        </label>
                      </div>
                    )}
                    {(me?.userAreaType === "Province" ||
                      me?.userAreaType === "Country" ||
                      me?.userAreaType === "Maqam") && (
                      <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                          <input
                            type="radio"
                            name="userAreaType"
                            className="radio checked:bg-blue-500"
                            value="Ilaqa"
                            checked={userAreaType === "Ilaqa"}
                            onChange={(e) => setUserAreaType(e.target.value)}
                          />
                          <span class="font-inter text-[14px] font-medium leading-[20px] text-left">
                            Ilaqa
                          </span>
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
                        <span class="font-inter text-[14px] font-medium leading-[20px] text-left">
                          All
                        </span>
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
                      <span class="font-inter text-[14px] font-medium leading-[20px] text-left">
                        personal
                      </span>
                    </label>
                  </div>
                )}
              </div>
              {userAreaType !== "All" &&
                userAreaType !== "personal" &&
                userAreaType !== "Province" && (
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
                        ?.sort((a, b) => a?.name?.localeCompare(b?.name))
                        ?.filter((item) => {
                          if (searchArea && searchArea !== "") {
                            if (
                              item?.name
                                ?.toString()
                                ?.toLowerCase()
                                ?.includes(
                                  searchArea?.toString()?.toLowerCase()
                                )
                            ) {
                              return true;
                            }
                            return false;
                          } else {
                            return true;
                          }
                        })
                        ?.map((area, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              document.getElementById("userAreaId").value =
                                area?._id;
                              setSelectedId(area?._id);
                              document.getElementById(
                                "autocomplete"
                              ).value = `${area?.name}${
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
                              : userAreaType === "Ilaqa"
                              ? `- ${area?.maqam?.name}`
                              : ""}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>
            <div className="w-full flex justify-end">
              <label
                className="btn rounded-md bg-primary  "
                htmlFor="filterUnfilled"
              >
                <FaFilter className="text-primary" />
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
                    className="text-white font-inter font-normal text-[14px] p-2 rounded leading-6 bg-primary ms-3 capitalize"
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
                    className="text-white font-inter font-normal text-[14px] p-2 rounded leading-6 bg-primary ms-3 capitalize"
                    onClick={() => {
                      userAreaType !== "personal"
                        ? getData()
                        : getPsersonalReports();
                    }}
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
                    : areaDetails?.province
                    ? areaDetails?.province?.name
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
