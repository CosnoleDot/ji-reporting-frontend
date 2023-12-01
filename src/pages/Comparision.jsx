import { useEffect, useState } from "react";

import { FaChevronCircleRight, FaTimesCircle } from "react-icons/fa";
import { GeneralLayout, Loader } from "../components";
import { months } from "./Reports";
import { async } from "q";
import instance from "../api/instrance";
import { ReportChart } from "../components/ReportChart";

export const Comparision = () => {
  const [year, setYear] = useState(2023);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [durationType, setDurationType] = useState("");
  const [isGenerate, setIsGenerate] = useState(false);
  const [reportType, setReportType] = useState("");
  const [halqas, setHalqas] = useState("");
  const [response, setResponse] = useState();
  const [showList, setShowList] = useState(
    response != undefined ? false : true
  );
  const [loading, setLoading] = useState(true);
  const [provData, setProvData] = useState();

  const type = localStorage.getItem("@type");
  let duration = [];
  for (let i = 0; i < selectedMonths?.length; i++) {
    duration.push(selectedMonths[i]?.input);
  }
  const data = JSON.stringify({
    duration: duration,
    duration_type: durationType,
  });
  const getHalqas = async () => {
    setLoading(true);
    try {
      const res = await instance.get("locations/filter", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      });
      setHalqas(res?.data?.data);
    } catch (error) {}
    setLoading(false);
  };
  const getProvData = async () => {
    if (reportType === "maqam") {
      setLoading(true);
      try {
        const res = await instance.get("locations/maqam");
        setProvData(res?.data?.data);
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
    } else if (reportType === "division") {
      setLoading(true);
      try {
        const res = await instance.get("locations/division");
        setProvData(res?.data?.data);
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
    } else if (reportType == "halqa") {
      setLoading(true);
      try {
        const res = await instance.get("locations/halqa");
        setProvData(res?.data?.data);
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
    }
  };
  const getData = () => {
    setLoading(true);
    try {
      instance
        .post(`compare/${reportType}/${selectedProperty}`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => setResponse(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getHalqas();
  }, []);
  useEffect(() => {
    getProvData();
  }, [reportType]);
  return (
    <GeneralLayout>
      <div className="relative flex flex-col gap-3  h-[calc(100vh-65.6px-64px)]">
        <div className="flex flex-col w-full  justify-between">
          <div className="flex  justify-between">
            <h3 className="font-bold text-xl">Compare Reports</h3>
          </div>
          <div className="join flex">
            <div>
              <select
                className="select select-bordered join-item max-w-[120px]"
                onChange={(e) => setReportType(e.target.value)}
              >
                <option disabled selected>
                  Report Type
                </option>

                <option value={"halqa"}>Halqa</option>
                {type === "province" && (
                  <>
                    <option value={"maqam"}>Maqam</option>
                    <option value={"division"}>Division</option>
                  </>
                )}
              </select>
            </div>
            {reportType !== "" && (
              <div>
                <select className="select select-bordered join-item max-w-[120px]">
                  <option disabled selected>
                    {`${
                      reportType.charAt(0).toUpperCase() + reportType.slice(1)
                    }'s`}
                  </option>
                  {type !== "province"
                    ? halqas?.map((i) => (
                        <option value={"halqa"}>{i?.name}</option>
                      ))
                    : provData?.map((i) => (
                        <option value={reportType}>{i.name}</option>
                      ))}
                </select>
              </div>
            )}
            <select
              className="select select-bordered join-item max-w-[120px]"
              onChange={(e) => setSelectedProperty(e.target.value)}
            >
              <option disabled selected>
                Property
              </option>
              <option value={"activity"}>Activity</option>
              <option value={"ifradi-kuwat"}>Ifradi Kuwat</option>
              <option value={"library"}>Library</option>
              <option value={"other-activity"}>Other Activity</option>
            </select>
            <select
              className="select select-bordered join-item max-w-[120px]"
              value={durationType}
              onChange={(e) => setDurationType(e.target.value)}
              onClick={() => setShowList(true)}
            >
              <option value={""}>Duration Type</option>
              <option value={"month"}>Month</option>
              <option value={"year"}>Year</option>
            </select>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn rounded-none rounded-tr-lg rounded-br-lg"
              >
                Dates
              </div>
              <button
                className="btn"
                onClick={() => {
                  getData();
                  setShowList(false);
                }}
              >
                Generate
              </button>
            </div>
            {showList == true && (
              <>
                {durationType === "year" ? (
                  <ul className="fixed mt-[50px] dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ">
                    {Array(10)
                      .fill(1)
                      .map((_, index) => (
                        <li className="form-control">
                          <label className="label cursor-pointer">
                            <span className="label-text">{2023 + index}</span>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </li>
                      ))}
                  </ul>
                ) : (
                  durationType === "month" && (
                    <div className="fixed mt-[50px] z-[1]  p-2 shadow bg-base-100 rounded-box flex">
                      <ul className="z-[1] menu p-2 shadow bg-base-100 rounded-box w-full overflow-y-scroll">
                        <li className="form-control">
                          <input
                            type="number"
                            name="year"
                            placeholder="Year ****"
                            className="border"
                            onChange={(e) => setYear(e.target.value)}
                          />
                        </li>
                        {months.map((_, index) => (
                          <li key={index} className="form-control">
                            <label
                              onClick={() =>
                                setSelectedMonths([
                                  ...selectedMonths,
                                  {
                                    value: _?.value,
                                    title: _?.title,
                                    input: { year, month: _?.value },
                                  },
                                ])
                              }
                              className="label cursor-pointer"
                            >
                              <span className="label-text">
                                {_?.title}, {year}
                              </span>
                              <FaChevronCircleRight />
                            </label>
                          </li>
                        ))}
                      </ul>
                      {selectedMonths.length > 0 && (
                        <ul className="z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                          {selectedMonths.map((_, index) => (
                            <li key={index} className="form-control">
                              <label
                                onClick={() =>
                                  setSelectedMonths([
                                    ...selectedMonths.slice(0, index),
                                    ...selectedMonths.slice(
                                      index + 1,
                                      selectedMonths.length
                                    ),
                                  ])
                                }
                                className="label cursor-pointer"
                              >
                                <span className="label-text">
                                  {_?.title}, {_?.input?.year}
                                </span>
                                <FaTimesCircle />
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                )}
              </>
            )}
            {/* <div className='indicator'> */}
            {/* <span className='indicator-item badge badge-secondary'>new</span> */}
            {/* <button className='btn join-item'>Next</button>
            </div> */}
          </div>
        </div>
        <div className="relative overflow-y-scroll gap-3 w-full items-center p-5 justify-center h-[calc(100vh-65.6px-64px-48px)]">
          {response != undefined ? (
            <ReportChart res={response} type={selectedProperty} />
          ) : (
            <></>
          )}
        </div>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
