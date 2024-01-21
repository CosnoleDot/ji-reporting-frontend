import { useContext, useState } from "react";
import { GeneralLayout } from "../components";
import {
  DistrictContext,
  DivisionContext,
  HalqaContext,
  MaqamContext,
  MeContext,
  useToastState,
} from "../context";
import instance from "../api/instrance";
import { useEffect } from "react";
import { ReportChart } from "../components/ReportChart";
import { FaTimes, FaChevronCircleRight, FaTimesCircle } from "react-icons/fa";
import { months } from "./Reports";

const Dates = ({
  durationMonths,
  setDurationMonths,
  showDates,
  durationType,
  durationYears,
  setDurationYears,
  getData,
}) => {
  const [year, setYear] = useState(2023);
  return (
    <div className="fixed top-0 left-0 z-1 w-full h-screen bg-white">
      <div className="flex z-50 w-full p-3 items-center border-b justify-between">
        <h1 className="text-xl font-bold">Dates</h1>
        <div className="flex justify-end items-center gap-3">
          <button
            className="btn"
            onClick={() => {
              showDates(false);
              getData();
            }}
          >
            Generate
          </button>
          <button className="btn" onClick={() => showDates(false)}>
            <FaTimes />
          </button>
        </div>
      </div>
      {durationType === "month" && (
        <div className="flex items-start justify-start w-full h-[calc(100vh-72.8px-64px)]">
          <div className="w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll">
            <input
              type="number"
              id="yearInput"
              name="yearInput"
              placeholder="YYYY"
              min="1900"
              max="2100"
              step="1"
              className="input-bordered input w-full"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            {months.map((i, index) => (
              <div
                key={index}
                className="flex p-3 hover:bg-slate-200 items-center justify-between"
                onClick={() =>
                  setDurationMonths([
                    ...durationMonths,
                    { month: i?.title, year, value: i?.value },
                  ])
                }
              >
                <span>
                  {i?.title}, {year}
                </span>
                <FaChevronCircleRight />
              </div>
            ))}
          </div>
          <div className="w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll">
            {durationMonths.map((i, index) => (
              <div
                key={index}
                onClick={() =>
                  setDurationMonths([
                    ...durationMonths.slice(0, index),
                    ...durationMonths.slice(index + 1, durationMonths.length),
                  ])
                }
                className="flex p-3 hover:bg-slate-200 items-center justify-between"
              >
                <span>
                  {i?.month}, {i?.year}
                </span>
                <FaTimesCircle />
              </div>
            ))}
          </div>
        </div>
      )}
      {durationType === "year" && (
        <div className="flex items-start justify-start w-full h-[calc(100vh-72.8px-64px)]">
          <div className="w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll">
            {Array(10)
              .fill(1)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex p-3 hover:bg-slate-200 items-center justify-between"
                  onClick={() =>
                    setDurationYears([...durationYears, 2023 + index])
                  }
                >
                  <span>{2023 + index}</span>
                  <FaChevronCircleRight />
                </div>
              ))}
          </div>
          <div className="w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll">
            {durationYears.map((i, index) => (
              <div
                key={index}
                onClick={() =>
                  setDurationYears([
                    ...durationYears.slice(0, index),
                    ...durationYears.slice(index + 1, durationYears.length),
                  ])
                }
                className="flex p-3 hover:bg-slate-200 items-center justify-between"
              >
                <span>{i}</span>
                <FaTimesCircle />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Comparision = () => {
  const [durationMonths, setDurationMonths] = useState([]);
  const me = useContext(MeContext);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [durationType, setDurationType] = useState("");
  const [reportType, setReportType] = useState("");
  const [dates, showDates] = useState(false);
  const [areaId, setAreaId] = useState("");
  const [response, setResponse] = useState(null);
  const [durationYears, setDurationYears] = useState([]);
  const maqams = useContext(MaqamContext);
  const divisions = useContext(DivisionContext);
  const halqas = useContext(HalqaContext);
  const districts = useContext(DistrictContext);

  const [areas, setAreas] = useState({
    maqam: [],
    division: [],
    halqa: [],
    district: [],
  });

  useEffect(() => {
    setAreas({
      ...areas,
      maqam: maqams,
      division: divisions,
      halqa: halqas,
      district: districts,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maqams, divisions, halqas, districts]);

  const { dispatch } = useToastState();
  const transformedArray = durationMonths.map((item) => {
    return {
      month: item.value,
      year: item.year,
    };
  });

  const data =
    durationType === "month"
      ? {
          duration: transformedArray,
          duration_type: durationType,
          areaId,
        }
      : { duration: durationYears, duration_type: durationType, areaId };
  const getData = async () => {
    setResponse(null);
    try {
      const res = await instance.post(
        `compare/${
          reportType === "self" ? localStorage.getItem("@type") : reportType
        }/${selectedProperty}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setResponse(res?.data?.data);
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error?.response?.data?.message });
    }
  };
  return (
    <GeneralLayout title={"Comparison"} active={"comparison"}>
      <div className="relative flex flex-col gap-3 h-[calc(100vh-66px-64px)] w-full p-3">
        <div className="flex items-center justify-start lg:justify-center xl:justify-center gap-3 border-b border-t py-3 overflow-hidden overflow-x-scroll inlineQ">
          <select
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value);
              if (e.target.value === "self") {
                setAreaId(me.userAreaId._id);
              }
            }}
            className="select select-bordered"
          >
            <option value="" disabled>
              Report Type
            </option>
            <option value="halqa">Halqa</option>
            {localStorage.getItem("@type") === "province" && (
              <>
                <option value="maqam">Maqam</option>
                <option value="division">Division</option>
              </>
            )}
            {/* <option value='self'>Self Compare</option> */}
          </select>
          {reportType !== "self" && (
            <select
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className="select select-bordered"
            >
              <option value="" disabled>
                Area {reportType}
              </option>
              {areas[reportType]?.map((i, index) => (
                <option key={index} value={i?._id}>
                  {i?.name}
                </option>
              ))}
            </select>
          )}
          <select
            defaultValue={""}
            className="select select-bordered"
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="" disabled>
              Property
            </option>
            <option value={"activity"}>Activity</option>
            <option value={"ifradi-kuwat"}>Ifradi Kuwat</option>
            <option value={"library"}>Library</option>
            <option value={"other-activity"}>Other Activity</option>
            <option value={"tosee-dawat"}>Tosee Dawat</option>
            <option value={"roz-shab-bedari"}>Shab Bedari</option>
            <option value={"paigham-digest"}>Paigham Digest</option>
            {["maqam", "division"].includes(reportType) && (
              <>
                <option value={"tanzeem"}>Tanzeem</option>
                <option value={"mentioned-activities"}>Zaili Activities</option>
              </>
            )}
          </select>
          <select
            value={durationType}
            onChange={(e) => setDurationType(e.target.value)}
            className="select select-bordered"
          >
            <option value="" disabled>
              Duration Type
            </option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <button
            onClick={() => {
              if (
                durationType !== "" &&
                reportType !== "" &&
                areaId !== "" &&
                selectedProperty !== ""
              )
                showDates(true);
            }}
            className="btn"
          >
            Dates
          </button>
        </div>
        <div className="relative flex flex-col gap-3 h-[calc(100vh-66px-64px-73.6px)] w-full p-3 overflow-scroll">
          {response ? (
            <ReportChart res={response} type={selectedProperty} />
          ) : (
            <div className="flex justify-center items-center top-[50%] relative left-[0%]">
              <p className="text-2xl text-[#7a7a7a]">No Reports Data</p>
            </div>
          )}
        </div>
      </div>
      {dates && durationType !== "" && (
        <Dates
          durationMonths={durationMonths}
          setDurationMonths={setDurationMonths}
          durationType={durationType}
          showDates={showDates}
          durationYears={durationYears}
          setDurationYears={setDurationYears}
          getData={getData}
        />
      )}
    </GeneralLayout>
  );
};
