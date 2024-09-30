import { useContext, useEffect, useRef, useState } from "react";
import { GeneralLayout } from "../../components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CompileReportContext, MeContext, useToastState } from "../../context";
import { UIContext } from "../../context/ui";
import { Tanzeem } from "../../components/ilaqaReport/Tanzeem";
import { IfradiKuwat } from "../../components/ilaqaReport/IfradiKuwat";
import { MarkaziActivities } from "../../components/ilaqaReport/MarkaziActivities";
import ZailiActivities from "../../components/ilaqaReport/ZailiActivities";
import { OtherActivities } from "../../components/ilaqaReport/OtherActivities";
import { ToseeDawat } from "../../components/ilaqaReport/ToseeDawat";
import { Library } from "../../components/ilaqaReport/Library";
import { PaighamDigest } from "../../components/ilaqaReport/PaighamDigest";
import { Baitulmal } from "../../components/ilaqaReport/Baitulmal";
import { RozOShabDiary } from "../../components/ilaqaReport/RozOShabDiary";
import { MdOutlineSearchOff } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { NoReports } from "../Reports";
import { FaPrint } from "react-icons/fa";

export const IlaqaCompile = () => {
  // EDIT CODE START
  const [createData, setCreateData] = useState();
  const [month, setMonth] = useState("");
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading, getIlaqaReports } = useContext(UIContext);
  const [view, setView] = useState(true);
  const location = useLocation();
  const me = useContext(MeContext);
  let navigate = useNavigate();
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
  }, [id, compileReport]);

  Object.keys(data).forEach((i) => {
    if (data[i] === null) {
      data[i] = 0;
    }
  });
  const handlePrint = () => {
    window.open(
      `/ilaqa-report-compile/print?areaId=${areaId}&startDate=${startDate}&endDate=${endDate}&areaName=${areaName}`
    );
    // window.location.href = `/halqa-report-compile/print?areaId${areaId}&startDate=${startDate}&endDate=${endDate}`;
  };
  return (
    <GeneralLayout active={'compileReports'}>
      {Object.keys(compileReport).length > 2 ? (
        <div className="reports overflow-y-scroll">
          <div>
            <button
              type="button"
              className="p-2"
              onClick={() => navigate("/compilation")}
            >
              <RxCross1 />
            </button>
            <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
                رپورٹ تالیف(برائے علاقہ)
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
                  >{`علاقہ کا نام`}</label>
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
                <ToseeDawat view={view} compile={true} />
              </div>
              <div className="mb-4">
                <Library view={view} />
              </div>
              <div className="mb-4">
                <PaighamDigest view={view} compile={true} />
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
