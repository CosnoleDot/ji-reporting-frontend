import { useContext, useEffect, useRef, useState } from "react";
import {
  GeneralLayout,
  IfradiKuwat,
  Library,
  OtherActivities,
  RozOShabDiary,
  ToseeDawat,
  Activity,
} from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { CompileReportContext } from "../../context";
import { Baitulmal } from "../../components/halqa/Baitulmal";
import { NoReports } from "../Reports";
import { FaPrint } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
export const HalqaCompile = () => {
  const [id, setId] = useState(null);
  const [view, setView] = useState(true);
  const [data, setData] = useState({});
  const location = useLocation();
  let navigate = useNavigate();
  const compileReport = useContext(CompileReportContext);
  const [date, setDate] = useState(
    `${compileReport?.startDate} تا  ${compileReport?.endDate}`
  );
  const queryParams = new URLSearchParams(location.search);
  const areaName = queryParams.get("areaName");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const areaId = queryParams.get("areaId");

  const autoFill = () => {
    Object.keys(compileReport).forEach((i) => {
      const baseName = i.split("-")[0];
      if (
        i.endsWith("start") ||
        i.endsWith("increase") ||
        i.endsWith("decrease")
      ) {
        const startValue = parseInt(compileReport[`${baseName}-start`]) || 0;
        const increaseValue =
          parseInt(compileReport[`${baseName}-increase`]) || 0;
        const decreaseValue =
          parseInt(compileReport[`${baseName}-decrease`]) || 0;
        compileReport[`${baseName}-end`] =
          startValue + increaseValue - decreaseValue;
        const endField = document.getElementById(`${baseName}-end`);
        if (endField) {
          endField.value = compileReport[`${baseName}-end`];
        }
      }
      const elem = document.getElementById(i);
      if (elem) {
        elem.value = compileReport[i];
      }
    });
  };

  useEffect(() => {
    autoFill();
  }, [id, compileReport]);

  Object.keys(data).forEach((i) => {
    if (data[i] === null) {
      data[i] = 0;
    }
  });
  const handlePrint = () => {
    window.open(
      `/halqa-report-compile/print?areaId=${areaId}&startDate=${startDate}&endDate=${endDate}&areaName=${areaName}`
    );
    // window.location.href = `/halqa-report-compile/print?areaId${areaId}&startDate=${startDate}&endDate=${endDate}`;
  };

  return (
    <GeneralLayout active={"compileReports"}>
      {Object.keys(compileReport).length > 2 ? (
        <div className="reports  overflow-y-scroll">
          <div className="mt-9">
            <button
              type="button"
              className="p-2"
              onClick={() => navigate("/compilation")}
            >
              <RxCross1 />
            </button>
            <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
              رپورٹ تالیف(برائے حلقہ)
            </h2>
          </div>
          <form
            className="flex flex-col justify-center items-center p-4 font-notoUrdu mb-5"
            dir="rtl"
            id="markaz-form"
          >
            <div className="w-full">
              <div className="grid w-full grid-cols-1 lg:grid-cols-2">
                <div className="flex justify-start items-center gap-2 w-full p-2">
                  <label
                    htmlFor="halqa_name"
                    className="block text-sm md:text-lg"
                  >{`حلقہ کا نام`}</label>
                  <input
                    required
                    className="border-b-2 border-dashed"
                    type="text"
                    name="name"
                    id="name"
                    value={areaName}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex justify-start items-center gap-4 w-full p-2">
                <label htmlFor="month" className="block text-sm md:text-lg">
                  برائے عرصہ
                </label>
                <span className="underline">{date}</span>
              </div>
              <div className="mb-4">
                <IfradiKuwat view={view} />
              </div>
              <div className="mb-4">
                <Activity view={view} compile={true} />
              </div>
              <div className="mb-4">
                <OtherActivities view={view} compile={true} />
              </div>
              <div className="mb-4">
                <ToseeDawat view={view} compile={true} />
              </div>
              <div className="mb-4">
                <Library view={view} compile={true} />
              </div>
              <div className="mb-4">
                <Baitulmal view={view} />
              </div>
              <div className="mb-4">
                <RozOShabDiary view={view} />
              </div>
            </div>
          </form>
          <div className="flex w-ful justify-center">
            <button className="btn bg-primary" onClick={() => handlePrint()}>
              <FaPrint /> Print
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex w-full justify-start">
            <button
              type="button"
              className="p-2"
              onClick={() => navigate("/compilation")}
            >
              <RxCross1 />
            </button>
          </div>
          <div>
            <NoReports />
          </div>
        </div>
      )}
    </GeneralLayout>
  );
};
