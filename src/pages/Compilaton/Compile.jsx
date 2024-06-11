import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../../components";
import {
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
  const provinces = useContext(ProvinceContext);

  const [areaType, setAreaType] = useState("");
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [checked, setChecked] = useState("");
  const [self, setSelf] = useState(false);
  const [startYear, setStartYear] = useState("2022");
  const [startMonth, setStartMonth] = useState("");
  const [endYear, setEndYear] = useState("2022");
  const [endMonth, setEndMonth] = useState("");
  const { dispatch } = useToastState();
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
    setStartYear("2022");
    setEndYear("2022");
  };
  const handleCheckboxChange = (event) => {
    clearDates();
    setChecked(event.target.id);
  };
  console.log(areaId);
  const getReports = async () => {
    const startDate =
      startMonth === "" ? startYear : startYear + "-" + startMonth;
    const endDate = endMonth === "" ? endYear : endYear + "-" + endMonth;
    console.log(areaId);

    try {
      const req = await instance.get(
        `/compilation/${areaId}?startDate=${startDate}&endDate=${endDate}&areaType=${areaType}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        }
      );

      if (req) {
        console.log(req);
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
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
  console.log(areaType, areaId);
  return (
    <GeneralLayout title={me?.userAreaId?.name.toUpperCase()}>
      <div className="relative flex flex-col gap-3 items-start p-5 justify-start h-[calc(100vh-65.6px-64px)]">
        <h3 className="w-full font-bold text-left text-xl hidden lg:block xl:block">
          Reports Compilation
        </h3>
        <div className="flex items-center my-4">
          <input
            id="self-checkbox"
            type="checkbox"
            checked={self}
            onChange={handleSelf}
            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="self-checkbox"
            className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
          >
            {`Compile ${me?.userAreaId?.name}`}
          </label>
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-4">
          {!self && (
            <>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="select">Select Area Type:</label>
                <select
                  value="" // Ensure the first option is selected initially
                  onChange={(e) => setAreaType(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>
                    Select Area
                  </option>
                  
                  {["country"].includes(localStorage.getItem("@type")) && (
                    <option value="province">Province</option>
                  )}
                  {["country", "province"].includes(
                    localStorage.getItem("@type")
                  ) && <option value="maqam">Maqam</option>}
                  {["country", "province"].includes(
                    localStorage.getItem("@type")
                  ) && <option value="division">Division</option>}
                  {["country", "province", "maqam"].includes(
                    localStorage.getItem("@type")
                  ) && <option value="ilaqa">Ilaqa</option>}
                  <option value="halqa">Halqa</option>
                </select>
              </div>

              {areaType && (
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="select">Select Area:</label>
                  <select
                    onChange={(e) => setAreaId(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    {areas?.map((i) => (
                      <option key={i?._id} value={i?._id}>
                        {i?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col justify-between w-full gap-4 mt-4">
          <div className="flex items-center w-full justify-evenly gap-4">
            <div className="flex items-center">
              <input
                id="month-checkbox"
                type="checkbox"
                checked={checked === "month-checkbox"}
                onChange={handleCheckboxChange}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="month-checkbox"
                className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                By month
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="year-checkbox"
                type="checkbox"
                checked={checked === "year-checkbox"}
                onChange={handleCheckboxChange}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="year-checkbox"
                className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                By year
              </label>
            </div>
          </div>
          {checked === "month-checkbox" && (
            <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-12 ">
              <div className="flex flex-row gap-4 items-center">
                <label>Start Date:</label>
                <select
                  className="select select-bordered"
                  onChange={(e) => setStartMonth(e.target.value)}
                  value={startMonth}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option value={month.value} key={index}>
                      {month.title}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered"
                  onChange={(e) => setStartYear(e.target.value)}
                  value={startYear}
                >
                  <option disabled value="">
                    Year
                  </option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={2022 + index}>
                      {2022 + index}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <label>End Date:</label>
                <select
                  className="select select-bordered"
                  onChange={(e) => setEndMonth(e.target.value)}
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
                  className="select select-bordered"
                  onChange={(e) => setEndYear(e.target.value)}
                  value={endYear}
                >
                  <option disabled value="">
                    Year
                  </option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={2022 + index}>
                      {2022 + index}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}{" "}
          {checked === "year-checkbox" && (
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <label>Start Year:</label>
                <select
                  className="select select-bordered"
                  onChange={(e) => setStartYear(e.target.value)}
                  value={startYear}
                >
                  <option disabled value="">
                    Year
                  </option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={2022 + index}>
                      {2022 + index}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <label>End Year:</label>
                <select
                  className="select select-bordered"
                  onChange={(e) => setEndYear(e.target.value)}
                  value={endYear}
                >
                  <option disabled value="">
                    Year
                  </option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={2022 + index}>
                      {2022 + index}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        <button className="btn " onClick={getReports}>
          <span className="hidden lg:block xl:block">Compile</span>
        </button>
      </div>
    </GeneralLayout>
  );
};
