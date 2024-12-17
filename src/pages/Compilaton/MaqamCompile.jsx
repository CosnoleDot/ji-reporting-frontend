import { GeneralLayout, calcultate } from "../../components";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";

import { Jamiaat } from "../../components/maqamReport/Jamiaat";
import { Colleges } from "../../components/maqamReport/Colleges";
import { Tanzeem } from "../../components/maqamReport/Tanzeem";
import { IfradiKuwat } from "../../components/maqamReport/IfradiKuwat";
import { MarkaziActivities } from "../../components/maqamReport/MarkaziActivities";
import { ZailiActivities } from "../../components/maqamReport/ZailiActivities";
import { OtherActivities } from "../../components/maqamReport/OtherActivities";
import { ToseeDawat } from "../../components/maqamReport/ToseeDawat";
import { Library } from "../../components/maqamReport/Library";
import { PaighamDigest } from "../../components/maqamReport/PaighamDigest";
import { Baitulmal } from "../../components/maqamReport/Baitulmal";
import { RozOShabDiary } from "../../components/maqamReport/RozOShabDiary";
import { reverseDataFormat } from "../../utils";
import { CompileReportContext, MeContext, useToastState } from "../../context";
import { UIContext } from "../../context/ui";
import { NoReports } from "../Reports";
import { FaPrint } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

export const MaqamCompile = () => {
  // EDIT CODE START
  const [id, setId] = useState(null);
  const [view, setView] = useState(true);
  const location = useLocation();
  const me = useContext(MeContext);
  const report = useContext(CompileReportContext);
  const [compileReport, setCompileReport] = useState(report?.b);
  const [date, setDate] = useState(
    `${compileReport?.startDate} تا  ${compileReport?.endDate}`
  );
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const areaType = queryParams.get("areaType");
  const areaName = queryParams.get("areaName");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const areaId = queryParams.get("areaId");
  const autoFill = () => {
    Object.keys(compileReport)?.forEach((i) => {
      const baseName = i.split("-")[0];
      console.log(i);
      if (
        i.endsWith("start") ||
        i.endsWith("increase") ||
        i.endsWith("decrease")
      ) {
        console.log(i);
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
      if (i === "commonStudentMeetingsSum") {
        const newKey = "commonStudentMeetings";
        const newElem = document.getElementById(newKey);
        if (newElem) {
          newElem.value = compileReport[i];
        }
      }
      if (i === "commonLiteratureDistributionSum") {
        const newKey = "commonLiteratureDistribution";
        const newElem = document.getElementById(newKey);
        if (newElem) {
          newElem.value = compileReport[i];
        }
      }
      if (i === "literatureSum") {
        const newKey = "litrature";
        const newElem = document.getElementById(newKey);
        if (newElem) {
          newElem.value = compileReport[i];
        }
      }
    });
  };

  useEffect(() => {
    if (!id) {
      autoFill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePrint = () => {
    window.open(
      `/maqam-report-compile/print?areaId=${areaId}&startDate=${startDate}&endDate=${endDate}&areaName=${areaName}`
    );
  };
  return (
    <GeneralLayout active={"compileReports"}>
      {compileReport && Object.keys(compileReport)?.length > 2 ? (
        <div className="reports  overflow-y-scroll">
          <div>
            <button
              type="button"
              className="p-2"
              onClick={() => navigate("/compilation")}
            >
              <RxCross1 />
            </button>
            <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
              {" "}
              رپورٹ تالیف(برائے مقام)
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
                  >{`مقام کا نام`}</label>
                  <input
                    required
                    className="border-b-2 border-dashed"
                    type="text"
                    name="name"
                    id="name"
                    value={queryParams.get("areaName")}
                    readOnly
                  />
                </div>

                <div className="flex justify-start items-center gap-4 w-full p-2">
                  <label htmlFor="month" className="block text-sm md:text-lg">
                    برائے عرصہ
                  </label>
                  <span className="underline">{`${startDate} - ${endDate}`}</span>
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
                <ZailiActivities view={view} />
              </div>
              <div className="mb-4">
                <OtherActivities view={view} />
              </div>
              <div className="mb-4">
                <ToseeDawat />
              </div>
              <div className="mb-4">
                <Library />
              </div>
              <div className="mb-4">
                <PaighamDigest view={view} />
              </div>
              <div className="mb-4">
                <Baitulmal view={view} />
              </div>
              <div className="mb-4">
                <RozOShabDiary view={view} />
              </div>

              {!view && (
                <div className="w-full flex flex-col items-end gap-3 p-2">
                  <div>
                    <label htmlFor="nazim">نام ناظمِ:</label>
                    <input
                      type="text"
                      className="border-b-2 border-dashed text-center"
                      id="nazim"
                      defaultValue={me?.name || ""}
                      readOnly
                    />
                  </div>
                </div>
              )}
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
