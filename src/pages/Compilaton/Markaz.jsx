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
import { convertDataFormat, reverseDataFormat, toJson } from "../../utils";
import instance from "../../api/instrance";
import {
  CompileReportContext,
  MarkazReportContext,
  MeContext,
  ProvinceReportContext,
  useToastState,
} from "../../context";
import { UIContext } from "../../context/ui";
import { Baitulmal } from "../../components/maqamReport/Baitulmal";
import { NoReports } from "../Reports";
import ReactToPrint from "react-to-print";
import { FaPrint } from "react-icons/fa";

// const getData = async (path, id, setData, data) => {
//   const arr = data[path];
//   const obj = arr.filter((i) => i?._id?.toString() === id?.toString());
//   // if (req) {
//   setData(reverseDataFormat(obj[0]));
//   // }F
// };

export const Markaz = () => {
  // EDIT CODE START

  const [month, setMonth] = useState("");
  const [createData, setCreateData] = useState([]);
  const formRef = useRef();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading, getMarkazReport } = useContext(UIContext);
  const [view, setView] = useState(false);
  const [obj, setObj] = useState({});
  const location = useLocation();
  const me = useContext(MeContext);
  const navigate = useNavigate();
  const compileReport = useContext(CompileReportContext);
  const [date, setDate] = useState(
    `${compileReport?.startDate}-${compileReport?.endDate}`
  );
  const queryParams = new URLSearchParams(location.search);
  const areaType = queryParams.get("areaType");
  const areaName = queryParams.get("areaName");

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
      if (i.split('-')[0] === 'studyCircle') {
        const newKey = 'studyCircleMentioned-'+ i.split("-")[1];
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

  return (
    <GeneralLayout>
      {Object.keys(compileReport).length > 2 ? (
        <div className="reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll">
          <form
           ref={formRef}
            className="flex flex-col justify-center items-center p-4 font-notoUrdu mb-5"
            dir="rtl"
            id="markaz-form"
          >
            <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
              {" "}
              رپورٹ تالیف(برائے مرکز)
            </h2>

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
                <OtherActivities view={view} compile={true}/>
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
              
              {!view && (
                <div className="w-full flex flex-col items-end gap-3 p-2">
                  <div>
                    <label htmlFor="nazim">نام ناظم اعلیٰ:</label>
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
          <div className="w-full flex justify-center p-4">
            <ReactToPrint
              trigger={() => (
                <button className="btn flex items-center gap-2">
                  <FaPrint />
                  <span>پرنٹ کریں</span>
                </button>
              )}
              content={() => formRef.current}
            />
          </div>
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
