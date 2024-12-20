import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import {
  IfradiKuwat,
  Jamiaat,
  Library,
  MarkaziActivities,
  OtherActivities,
  RozOShabDiary,
  Tanzeem,
  ToseeDawat,
  ZailiActivities,
  Colleges,
} from "../../components/markazReport";
import { GeneralInfo, GeneralLayout, calcultate } from "../../components";
import { CompileReportContext, MeContext, useToastState } from "../../context";
import { UIContext } from "../../context/ui";
import { Baitulmal } from "../../components/maqamReport/Baitulmal";
import { NoReports } from "../Reports";
import { FaPrint } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

export const Markaz = () => {
  // EDIT CODE START

  const [month, setMonth] = useState("");
  const [createData, setCreateData] = useState([]);
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const [view, setView] = useState(true);
  const [obj, setObj] = useState({});
  const location = useLocation();
  const me = useContext(MeContext);
  const navigate = useNavigate();
  const compileReport = useContext(CompileReportContext);
  const [date, setDate] = useState(
    `${compileReport?.startDate} تا  ${compileReport?.endDate}`
  );
  const queryParams = new URLSearchParams(location.search);
  const areaType = queryParams.get("areaType");
  const areaName = queryParams.get("areaName");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const areaId = queryParams.get("areaId");
  const autoFill = () => {
    Object.keys(compileReport).forEach((i) => {
      const baseName = i.split("-")[0];
      if (
        i.endsWith("startSum") ||
        i.endsWith("increaseSum") ||
        i.endsWith("decreaseSum")
      ) {
        const startValue = parseInt(compileReport[`${baseName}-startSum`]) || 0;
        const increaseValue =
          parseInt(compileReport[`${baseName}-increaseSum`]) || 0;
        const decreaseValue =
          parseInt(compileReport[`${baseName}-decreaseSum`]) || 0;
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
      if (i.includes("-monthly")) {
        const newKey = i.replace("-monthly", "-end");
        const newElem = document.getElementById(newKey);
        if (newElem) {
          newElem.value = compileReport[i];
        }
      }
      if (i.split("-")[0] === "studyCircle") {
        const newKey = "studyCircleMentioned-" + i.split("-")[1];
        const newElem = document.getElementById(newKey);
        if (newElem) {
          newElem.value = compileReport[i];
        }
      }
    });
  };

  useEffect(() => {
    autoFill();
  }, [id, month, createData]);

  Object.keys(data).forEach((i) => {
    if (data[i] === null) {
      data[i] = 0;
    }
  });
  const handlePrint = () => {
    window.open(
      `/markaz-report-compile/print?areaId=${areaId}&startDate=${startDate}&endDate=${endDate}&areaName=${areaName}`
    );
    // window.location.href = `/halqa-report-compile/print?areaId${areaId}&startDate=${startDate}&endDate=${endDate}`;
  };
  return (
    <GeneralLayout active={"compileReports"}>
      {Object.keys(compileReport).length > 2 ? (
        <div className="reports overflow-y-scroll">
          <div className="mt-9">
            <button
              type="button"
              className="p-2"
              onClick={() => navigate("/compilation")}
            >
              <RxCross1 />
            </button>
            <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
              {" "}
              رپورٹ تالیف(برائے مرکز)
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
                  >{`مرکز کا نام`}</label>
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

                <div className="flex justify-start items-center gap-4 w-full p-2">
                  <label htmlFor="month" className="block text-sm md:text-lg">
                    برائے عرصہ
                  </label>
                  <span className="underline">{date}</span>
                </div>
              </div>
              <div className="mb-4">
                <Jamiaat view={view} />
              </div>
              <div className="mb-4">
                <Colleges view={view} />
              </div>
              <div className="mb-4">
                <Tanzeem view={view} />
              </div>
              <div className="mb-4">
                <IfradiKuwat view={view} />
              </div>
              <div className="mb-4">
                <MarkaziActivities view={view} />
              </div>
              <div className="mb-4">
                <ZailiActivities view={view} obj={obj} />
              </div>
              <div className="mb-4">
                <OtherActivities view={view} compile={true} />
              </div>
              <div className="mb-4">
                <ToseeDawat />
              </div>
              <div className="mb-4">
                <Library />
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
            <button className="btn" onClick={() => handlePrint()}>
              <FaPrint /> پرنٹ
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
