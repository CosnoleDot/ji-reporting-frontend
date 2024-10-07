import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../../components";
import {
  CompileReportContext,
  DistrictContext,
  DivisionContext,
  HalqaContext,
  IlaqaContext,
  MaqamContext,
  MeContext,
  ProvinceContext,
  TehsilContext,
  useToastState,
} from "../../context";
import instance from "../../api/instrance";
import { Markaz } from "./Markaz";
import { FaEye, FaPrint } from "react-icons/fa";
import { UIContext } from "../../context/ui";
import { useNavigate } from "react-router-dom";
import { MdOutlineSearchOff } from "react-icons/md";

export const Compile = () => {
  const months = [
    {
      title: "January",
      value: "01",
    },
    {
      title: "February",
      value: "02",
    },
    {
      title: "March",
      value: "03",
    },
    {
      title: "April",
      value: "04",
    },
    {
      title: "May",
      value: "05",
    },
    {
      title: "June",
      value: "06",
    },
    {
      title: "July",
      value: "07",
    },
    {
      title: "August",
      value: "08",
    },
    {
      title: "September",
      value: "09",
    },
    {
      title: "October",
      value: "10",
    },
    {
      title: "November",
      value: "11",
    },
    {
      title: "December",
      value: "12",
    },
  ];

  const me = useContext(MeContext);
  const maqams = useContext(MaqamContext);
  const divisions = useContext(DivisionContext);
  const halqas = useContext(HalqaContext);
  const tehsils = useContext(TehsilContext);
  const ilaqas = useContext(IlaqaContext);
  const districts = useContext(DistrictContext);
  const compileReports = useContext(CompileReportContext);
  const provinces = useContext(ProvinceContext);
  const [data, setData] = useState(compileReports);
  const [showReport, setShowReport] = useState(false);
  const [areaType, setAreaType] = useState("");
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [checked, setChecked] = useState("");
  const [self, setSelf] = useState(false);
  const [startYear, setStartYear] = useState("2023");
  const [startMonth, setStartMonth] = useState("");
  const [endYear, setEndYear] = useState("2023");
  const [endMonth, setEndMonth] = useState("");
  const { dispatch } = useToastState();
  const [areaName, setAreaName] = useState("");
  const { getCompileReports } = useContext(UIContext);
  const [sDate, setSDate] = useState();
  const [eDate, setEDate] = useState();
  const navigate = useNavigate();
  const [isMun, setIsMun] = useState(true);
  const ilaqa = ilaqas?.filter((i) => i?.maqam._id === me?.userAreaId?._id);

  useEffect(() => {
    switch (areaType) {
      case "markaz":
        setAreas([{ _id: "1", name: "Pakistan" }]);
        break;
      case "province":
        setAreas(provinces);
        break;
      case "maqam":
        setAreas(maqams);

        break;
      case "division":
        setAreas(divisions);
        break;
      case "ilaqa":
        setAreas(ilaqas);
        break;
      case "halqa":
        setAreas(halqas);
        break;
      default:
        setAreas([]);
        break;
    }
  }, [areaType, provinces, maqams, divisions, ilaqas, halqas]);
  const clearDates = () => {
    setStartMonth("");
    setEndMonth("");
    setStartYear("2024");
    setEndYear("2024");
  };
  const handleCheckboxChange = (event) => {
    clearDates();
    setShowReport(false);
    setChecked(event.target.id);
  };

  const getReports = async () => {
    if (areaId) {
      switch (areaType) {
        case "country":
          setAreaName("Pakistan");
          break;
        case "province":
          let provinceName = provinces.find((i) => i._id === areaId)?.name;
          setAreaName(provinceName?.split(" ").join(""));
          break;
        case "division":
          let divisionName = divisions.find((i) => i._id === areaId)?.name;

          setAreaName(divisionName?.split(" ").join(""));
        case "maqam":
          let maqamName = maqams.find((i) => i._id === areaId)?.name;
          setAreaName(maqamName?.split(" ").join(""));
          break;
        case "ilaqa":
          let ilaqaName = ilaqas.find((i) => i._id === areaId)?.name;
          setAreaName(ilaqaName?.split(" ").join(""));
          break;
        case "halqa":
          let halqaName = halqas.find((i) => i._id === areaId)?.name;
          setAreaName(halqaName?.split(" ").join(""));
          break;
        default:
          break;
      }

      const startDate =
        startMonth === "" ? startYear : `${startYear}-${startMonth}`;
      setSDate(startDate);
      const endDate = endMonth === "" ? endYear : `${endYear}-${endMonth}`;
      setEDate(endDate);

      try {
        if (startDate > endDate) {
          dispatch({
            type: "ERROR",
            payload: "Start date must be less than end date",
          });
        } else {
          await getCompileReports(startDate, endDate, areaType, areaId);

          setShowReport(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    if (showReport) {
      navigate(
        `/compile/view?areaId=${areaId}&areaType=${areaType}&areaName=${areaName}&startDate=${sDate}&endDate=${eDate}`
      );
    }
  }, [areaName, showReport, navigate, areaType]);
  const handleSelf = () => {
    setSelf(!self);
  };
  useEffect(() => {
    if (self === true) {
      setAreaType(localStorage.getItem("@type"));
      setAreaId(me?.userAreaId?._id);
    } else {
      setAreaType("");
      setAreaId("");
    }
  }, [self]);
  useEffect(() => {
    if (localStorage.getItem("@type") === "halqa") {
      setAreaId(me?.userAreaId?._id);
      setAreaType("halqa");
      setAreaName(me?.userAreaId?.name.split(" ").join(""));
    }
  }, [localStorage.getItem("@type")]);
  useEffect(() => {
    if (ilaqa?.length < 1) {
      setIsMun(false);
    }
  }, []);
  const getDivName = (area, type) => {
    if (areaType === "halqa") {
      if (type === "Tehsil") {
        let div = districts?.find((i) => area?.parentId?.district === i._id);
        return `-${div?.division?.name}(Division) - ${div?.division?.province?.name}(Province)`;
      } else if (type === "Ilaqa") {
        let maqam = maqams.find((i) => area?.parentId?.maqam === i?._id);
        return `- ${area?.parentId?.name}(Ilaqa) - ${maqam?.name}(Maqam)`;
      } else if (type === "Maqam") {
        return `- ${area?.parentId?.name}(Maqam)`;
      }
    } else if (areaType === "ilaqa") {
      let maqam = maqams.find((i) => area?.parentId?.maqam === i?._id);
      return `- ${area?.maqam?.name}(Maqam) - ${area?.maqam?.province?.name}(Province)`;
    } else if (areaType === "division") {
      return `- ${area?.province?.name}(Province)`;
    } else if (areaType === "maqam") {
      return `- ${area?.province?.name}(Province)`;
    } else {
      return "Pakistan";
    }
  };
  return (
    <GeneralLayout
      title={me?.userAreaId?.name.toUpperCase()}
      active={"compilation"}
    >
      <div className="relative flex flex-col gap-3 items-start p-5 justify-start h-full md:h-[calc(100vh-565.6px)]">
        <div className="flex w-full py-4 mb-4 border-b border-inputBorder">
          <div className="">
            <h1 class="font-inter text-heading text-[18px] font-medium leading-[28px] text-left">
              Reports Compilation
            </h1>
            <p class="font-inter text-[14px] font-normal leading-[20px] text-left text-secondaryText">
              Get a sneak peek into your data
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 py-2">
          <input
            id="self-checkbox"
            type="checkbox"
            checked={self || localStorage.getItem("@type") === "halqa"}
            onChange={handleSelf}
            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="self-checkbox"
            className="font-inter text-[16px] font-semibold leading-[14.52px] text-left text-primary"
          >
            {`Compile ${me?.userAreaId?.name}`}
          </label>
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-4">
          {!self &&
            localStorage.getItem("@type") !== "halqa" &&
            localStorage.getItem("@type") !== "ilaqa" &&
            localStorage.getItem("@type") !== "division" && (
              <>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    htmlFor="select"
                    className="text-heading font-inter text-[14px] leading-5"
                  >
                    Select Area Type:
                  </label>
                  <select
                    defaultValue={"selected"}
                    value={areaType}
                    // Ensure the first option is selected initially
                    onChange={(e) => setAreaType(e.target.value)}
                    className="w-full text-secondaryText border outline-none border-inputBorder rounded p-2 text-[16px] leading-6 font-inter"
                  >
                    <option
                      value={"selected"}
                      className="text-[16px] hover:bg-primary"
                    >
                      Select Area
                    </option>

                    {["country"].includes(localStorage.getItem("@type")) && (
                      <option
                        value="province"
                        className="text-[16px] hover:bg-primary"
                      >
                        Province
                      </option>
                    )}
                    {["country", "province"].includes(
                      localStorage.getItem("@type")
                    ) && (
                      <option
                        value="maqam"
                        className="text-[16px] hover:bg-primary"
                      >
                        Maqam
                      </option>
                    )}
                    {["country", "province"].includes(
                      localStorage.getItem("@type")
                    ) && (
                      <option
                        value="division"
                        className="text-[16px] hover:bg-primary"
                      >
                        Division
                      </option>
                    )}
                    {["country", "province"].includes(
                      localStorage.getItem("@type")
                    ) && (
                      <option
                        value="ilaqa"
                        className="text-[16px] hover:bg-primary"
                      >
                        Ilaqa
                      </option>
                    )}
                    {localStorage.getItem("@type") === "maqam" && isMun && (
                      <option
                        value="ilaqa"
                        className="text-[16px] hover:bg-primary"
                      >
                        Ilaqa
                      </option>
                    )}
                    <option
                      value="halqa"
                      className="text-[16px] hover:bg-primary"
                    >
                      Halqa
                    </option>
                  </select>
                </div>

                {areaType && areaType !== "selected" && (
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      htmlFor="select"
                      className="text-heading font-inter text-[14px] leading-5"
                    >
                      Select Area:
                    </label>
                    <select
                      onChange={(e) => setAreaId(e.target.value)}
                      className="w-full text-secondaryText border outline-none border-inputBorder rounded p-2 text-[16px] leading-6 font-inter"
                    >
                      <option value={"selected"}>Select Area</option>
                      {areas?.map((i) => (
                        <option
                          key={i?._id}
                          value={i?._id}
                          className="text-[16px]"
                        >
                          {`${i?.name} - ${getDivName(i, i?.parentType)}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}
          <></>
          {(localStorage.getItem("@type") === "ilaqa" ||
            localStorage.getItem("@type") === "division") &&
            !self && (
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="select">Select Halqa:</label>
                <select
                  onChange={(e) => {
                    setAreaId(e.target.value);
                    setAreaType("halqa");
                  }}
                  className="select select-bordered w-full"
                >
                  <option value="" selected>
                    Select halqa
                  </option>
                  {halqas?.map((i) => (
                    <option key={i?._id} value={i?._id}>
                      {i?.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
        </div>
        <div className="flex flex-col justify-between w-full gap-4 mt-4">
          <div className="flex items-center w-full justify-evenly gap-4">
            <div className="flex items-center gap-4">
              <input
                id="month-checkbox"
                type="checkbox"
                checked={checked === "month-checkbox"}
                onChange={handleCheckboxChange}
                className="w-6 h-6 md:w-4 md:h-4 sm:w-4 sm:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="month-checkbox"
                className="font-inter text-[16px] font-semibold leading-[14.52px] text-left text-primary"
              >
                By month
              </label>
            </div>
            <div className="flex items-center gap-4">
              <input
                id="year-checkbox"
                type="checkbox"
                checked={checked === "year-checkbox"}
                onChange={handleCheckboxChange}
                className="w-6 h-6 md:w-4 md:h-4 sm:w-4 sm:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="year-checkbox"
                className="font-inter text-[16px] font-semibold leading-[14.52px] text-left text-primary"
              >
                By year
              </label>
            </div>
          </div>
          {checked === "month-checkbox" && (
            <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-12 ">
              <div className="flex flex-row gap-4 items-center">
                <label className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                  Start Date:
                </label>
                <select
                  className="select select-bordered select-sm"
                  onChange={(e) => setStartMonth(e.target.value)}
                  value={startMonth}
                >
                  <option value="" className="hover:bg-primary">
                    Month
                  </option>
                  {months.map((month, index) => (
                    <option
                      value={month.value}
                      key={index}
                      className="hover:bg-primary"
                    >
                      {month.title}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered select-sm"
                  onChange={(e) => setStartYear(e.target.value)}
                  value={startYear}
                >
                  <option disabled value="">
                    Year
                  </option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={2023 + index}>
                      {2023 + index}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <label className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                  End Date:
                </label>
                <select
                  className="select select-bordered select-sm"
                  onChange={(e) => {
                    setEndMonth(e.target.value);
                    setShowReport(false);
                  }}
                  value={endMonth}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option value={month.value} key={index}>
                      {month.title}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered select-sm"
                  onChange={(e) => setEndYear(e.target.value)}
                  value={endYear}
                >
                  <option disabled value="">
                    Year
                  </option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={2023 + index}>
                      {2023 + index}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}{" "}
          {checked === "year-checkbox" && (
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <label className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                  Start Year:
                </label>
                <select
                  className="select select-bordered select-sm"
                  onChange={(e) => setStartYear(e.target.value)}
                  value={startYear}
                >
                  <option disabled value="">
                    Year
                  </option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={2023 + index}>
                      {2023 + index}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <label className="font-inter text-[12px] font-semibold leading-[14.52px] text-left text-primary">
                  End Year:
                </label>
                <select
                  className="select select-bordered select-sm"
                  onChange={(e) => setEndYear(e.target.value)}
                  value={endYear}
                >
                  <option disabled value="">
                    Year
                  </option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={2023 + index}>
                      {2023 + index}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full justify-center mt-2">
          <button
            onClick={getReports}
            type="button"
            class="text-white bg-primary p-1 rounded "
          >
            Compile
          </button>
        </div>
        <div className="w-full flex justify-end items-end text-white">
          <span>HASSAAN MUJTABA</span>
        </div>
      </div>
    </GeneralLayout>
  );
};
