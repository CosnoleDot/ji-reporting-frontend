import { useContext, useEffect, useState } from "react";
import {
  CompileReportContext,
  DivisionReportContext,
  MeContext,
  ProvinceReportContext,
  useToastState,
} from "../../context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UIContext } from "../../context/ui";
import { GeneralInfo, GeneralLayout } from "../../components";
import { Jamiaat } from "../../components/provinceReport/Jamiaat";
import { Colleges } from "../../components/provinceReport/Colleges";
import { Tanzeem } from "../../components/provinceReport/Tanzeem";
import { IfradiKuwat } from "../../components/provinceReport/IfradiKuwat";
import { MarkaziActivities } from "../../components/provinceReport/MarkaziActivities";
import ZailiActivities from "../../components/provinceReport/ZailiActivities";
import { OtherActivities } from "../../components/provinceReport/OtherActivities";
import { ToseeDawat } from "../../components/provinceReport/ToseeDawat";
import { Library } from "../../components/provinceReport/Library";
import { PaighamDigest } from "../../components/provinceReport/PaighamDigest";
import { Baitulmal } from "../../components/provinceReport/Baitulmal";
import { RozOShabDiary } from "../../components/provinceReport/RozOShabDiary";
import { NoReports } from "../Reports";

export const ProvinceCompile = () => {
  // EDIT CODE START
  const [createData, setCreateData] = useState([]);
  const division = useContext(DivisionReportContext);
  const province = useContext(ProvinceReportContext);
  const [month, setMonth] = useState("");
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading, getProvinceReports } = useContext(UIContext);
  const [finalMerged, setFinalMerged] = useState({});
  const [view, setView] = useState(false);
  const location = useLocation();
  const me = useContext(MeContext);
  let navigate = useNavigate();
  const compileReport = useContext(CompileReportContext);

  const [date, setDate] = useState(
    `${compileReport?.startDate}-${compileReport?.endDate}`
  );
  const queryParams = new URLSearchParams(location.search);
  const areaType = queryParams.get("areaType");
  const areaName = queryParams.get("areaName");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
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

  return (
    <GeneralLayout>
      {Object.keys(compileReport).length > 2 ? (
        <div className="reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll">
          <form
            className="flex flex-col justify-center items-center p-4 font-notoUrdu mb-5"
            dir="rtl"
            id="markaz-form"
          >
            <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
              {" "}
              رپورٹ تالیف(برائے صوبہ)
            </h2>

            <div className="w-full">
              <div className="grid w-full grid-cols-1 lg:grid-cols-2">
                <div className="flex justify-start items-center gap-2 w-full p-2">
                  <label
                    htmlFor="halqa_name"
                    className="block text-sm md:text-lg"
                  >{`صوبہ کا نام`}</label>
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
              <div>
                <Jamiaat view={view} />
              </div>
              <div>
                <Colleges view={view} />
              </div>
              <div>
                <Tanzeem view={view} id={id} />
              </div>
              <div>
                <IfradiKuwat view={view} id={id} />
              </div>
              <div>
                <MarkaziActivities view={view} />
              </div>
              <div>
                <ZailiActivities view={view} />
              </div>
              <div>
                <OtherActivities view={view} compile={true} />
              </div>
              <div>
                <ToseeDawat finalMerged={!id ? finalMerged : null} />
              </div>
              <div>
                <Library />
              </div>
              <div>
                <PaighamDigest view={view} />
              </div>
              <div>
                <Baitulmal view={view} />
              </div>
              <div>
                <RozOShabDiary />
              </div>
              
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
            </div>
           
          </form>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center">
          <div>
            <NoReports />
          </div>
        </div>
      )}
    </GeneralLayout>
  );
};
