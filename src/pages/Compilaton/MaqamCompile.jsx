import {   GeneralLayout, calcultate } from "../../components";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
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



export const MaqamCompile = () => {
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
  const compileReport =useContext(CompileReportContext) ;
  const [date, setDate]=useState(`${compileReport?.startDate}-${compileReport?.endDate}`)
 const queryParams =new URLSearchParams(location.search);
 const areaType = queryParams.get('areaType');
    const areaName = queryParams.get('areaName');
    const autoFill = () => {
      Object.keys(compileReport).forEach((i) => {
        const elem = document.getElementById(i);
        if (elem) {
          elem.value = compileReport[i];
        }
        if (i.includes('-monthly')) {
          const newKey = i.replace('-monthly', '-end');
          const newElem = document.getElementById(newKey);
          if (newElem) {
            newElem.value = compileReport[i];
          }
        }
        if (i.split('-')[0] === 'studyCircle') {
          const newKey = 'studyCircleMentioned-'+ i.split("-")[1];
          const newElem = document.getElementById(newKey);
          if (newElem) {
            newElem.value = compileReport[i];
          }
        }
        if (i === 'commonStudentMeetingsSum') {
          const newKey = 'commonStudentMeetings'
          const newElem = document.getElementById(newKey);
          if (newElem) {
            newElem.value = compileReport[i];
          }
        }
        if (i === 'commonLiteratureDistributionSum') {
          const newKey = 'commonLiteratureDistribution'
          const newElem = document.getElementById(newKey);
          if (newElem) {
            newElem.value = compileReport[i];
          }
        }
        if (i === 'literatureSum') {
          const newKey = 'litrature'
          const newElem = document.getElementById(newKey);
          if (newElem) {
            newElem.value = compileReport[i];
          }
        }
        
       
      });
    };

  // To set values to zero when in create mode
  //   useEffect(() => {
  //     const value1 = document.getElementById("litrature");
  //     const value2 = document.getElementById("commonStudentMeetings");
  //     const value3 = document.getElementById("commonLiteratureDistribution");
  //     if (window.location.pathname?.split("/")[2] === "create") {
  //       value1.value = 0;
  //       value2.value = 0;
  //       value3.value = 0;
  //     }
  //   }, [location.pathname]);

  //     const afd = [
  //       "rehaishHalqay",
  //       "taleemHalqay",
  //       "totalHalqay",
  //       "subRehaishHalqay",
  //       "subTaleemHalqay",
  //       "subTotalHalqay",
  //       "busmSchoolUnits",
  //       "busmRehaishUnits",
  //       "busmTotalUnits",
  //       "arkan",
  //       "umeedWaran",
  //       "rafaqa",
  //       "karkunan",
  //       "members",
  //       "shaheen",
  //     ];
  //     afd.forEach((i) => {
  //       calcultate(i);
  //     });
  //   }, [data]);
  useEffect(() => {
    if (!id) {
      autoFill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const totalHalqay = parseInt(
  //   document.getElementById("totalHalqay-end")?.value
  // );
  // const subTotalHalqay = parseInt(
  //   document.getElementById("subTotalHalqay-end")?.value
  // );
  // const busmTotalUnits = parseInt(
  //   document.getElementById("busmTotalUnits-end")?.value
  // );

  // useEffect(() => {
  //   document.getElementById("studyCircleMentioned-decided").value = totalHalqay;
  //   document.getElementById("ijtRafaqa-decided").value = totalHalqay;
  //   document.getElementById("darseQuran-decided").value = parseFloat(
  //     totalHalqay + subTotalHalqay
  //   );
  //   document.getElementById("ijtKarkunan-decided").value = parseFloat(
  //     totalHalqay + subTotalHalqay
  //   );
  //   document.getElementById("paighamEvent-decided").value = busmTotalUnits;
  //   document.getElementById("shaheenMeeting-decided").value = busmTotalUnits;
  // }, [totalHalqay, subTotalHalqay, busmTotalUnits]);
  // data.litrature = data["literatureDistribution"];

  return (
    <GeneralLayout>
      <div className="reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll">
        <form
          className="flex flex-col justify-center items-center p-4 font-notoUrdu mb-5"
          dir="rtl"
          id="markaz-form"
        >
          <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
            {" "}
            رپورٹ تالیف(برائے مقام)
          </h2>

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
                  value={queryParams.get('areaName')}
                  readOnly
                />
              </div>

              <div className="flex justify-start items-center gap-2 w-full p-2">
                <label htmlFor="month" className="block text-sm md:text-lg">
                  برائے عرصہ
                </label>
                <input
                  required
                  className="border-b-2 border-dashed"
                  type="month"
                  name="month"
                  id="month"
                  readOnly
                  value={date}
                />
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
            <div className="w-full flex p-2">
              <label htmlFor="comments">تبصرہ</label>
              <input
                type="text"
                required
                name="comments"
                className="border-b-2 border-dashed w-full"
                id="comments"
                readOnly={view}
              />
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
          {!view && (
            <div className="w-full">
              <button disabled={loading} className="btn btn-primary">
                {id ? "Update" : "Add"}
              </button>
            </div>
          )}
        </form>
      </div>
    </GeneralLayout>
  );
};
