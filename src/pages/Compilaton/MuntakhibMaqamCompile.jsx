import { GeneralLayout, calcultate } from "../../components";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
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
export const MuntakhibMaqamCompile = () => {
  // EDIT CODE START
  const [month, setMonth] = useState("");
  const [createData, setCreateData] = useState();
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading, getMaqamReports } = useContext(UIContext);
  const [view, setView] = useState(true);
  const location = useLocation();
  const me = useContext(MeContext);
  const navigate = useNavigate();
  const report = useContext(CompileReportContext);
  const compileReport = report?.b;
  const [date, setDate] = useState(
    `${report?.startDate} تا  ${report?.endDate}`
  );
  const queryParams = new URLSearchParams(location.search);
  const areaType = queryParams.get("areaType");
  const areaName = queryParams.get("areaName");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const areaId = queryParams.get("areaId");
  const autoFill = () => {
    Object.keys(compileReport).forEach((i) => {
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
      if (i === "darseQuran-done") {
        const newKey = "darseQuran-sum";
        const newElem = document.getElementById(newKey);
        if (newElem) {
          newElem.value = compileReport["darseQuran-done"];
        }
      }
      if (i === "ijtKarkunan-done") {
        const newKey = "ijtKarkunan-sum";
        const newElem = document.getElementById(newKey);
        if (newElem) {
          newElem.value = compileReport["ijtKarkunan-done"];
        }
      }
      // compileReport['darseQuran-sum']= compileReport["darseQuran-done"]+ compileReport["darseQuran-manual"]
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
    // window.location.href = `/halqa-report-compile/print?areaId${areaId}&startDate=${startDate}&endDate=${endDate}`;
  };
  return (
    <GeneralLayout active={"compileReports"}>
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
            رپورٹ تالیف(برائے منتخب مقام)
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
                >{`منتخب مقام کا نام`}</label>
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

              <div className="flex justify-start items-center gap-2 w-full p-2">
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
              <ZailiActivities view={view} compile={true} />
            </div>
            <div className="mb-4">
              <OtherActivities view={view} compile={true} />
            </div>
            <div className="mb-4">
              <ToseeDawat compile={true} />
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
              <RozOShabDiary view={view} compile={true} />
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
          <div className="flex w-ful justify-center">
            <button className="btn" onClick={() => handlePrint()}>
              <FaPrint /> پرنٹ
            </button>
          </div>
        </form>
        <button className="btn" onClick={() => handlePrint()}>
          <FaPrint />
        </button>
      </div>
    </GeneralLayout>
  );
};
