import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CompileReportContext, MeContext, useToastState } from "../../context";
import { UIContext } from "../../context/ui";
import { GeneralInfo, GeneralLayout, Loader } from "../../components";
import { Jamiaat } from "../../components/divisionReport/Jamiaat";
import { Colleges } from "../../components/divisionReport/Colleges";
import { Tanzeem } from "../../components/divisionReport/Tanzeem";
import { IfradiKuwat } from "../../components/divisionReport/IfradiKuwat";
import { MarkaziActivities } from "../../components/divisionReport/MarkaziActivities";
import { ZailiActivities } from "../../components/divisionReport/ZailiActivities";
import { OtherActivities } from "../../components/divisionReport/OtherActivities";
import { ToseeDawat } from "../../components/divisionReport/ToseeDawat";
import { Library } from "../../components/divisionReport/Library";
import { PaighamDigest } from "../../components/divisionReport/PaighamDigest";
import { Baitulmal } from "../../components/divisionReport/Baitulmal";
import { RozOShabDiary } from "../../components/divisionReport/RozOShabDiary";


export const DivisionCompile = () => {
  // EDIT CODE START
  const [createData, setCreateData] = useState();
  const [month, setMonth] = useState("");
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading, getDivisionReports } = useContext(UIContext);
  const [view, setView] = useState(false);
  const location = useLocation();
  const me = useContext(MeContext);
  const navigate = useNavigate();
  const [page, setPage] = useState();
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
      <div className="reports h-[calc(100vh-64.4px-64px)] overflow-hidden overflow-y-scroll w-full">
      <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
          رپورٹ تالیف(برائے ڈویزن)
        </h2>
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
                >{`ڈویزن کا نام`}</label>
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
                value={date}
                readOnly
              />
            </div>
            <div className="mb-4">
              <Jamiaat view={view} />
            </div>
            <div className="mb-4">
              <Colleges view={view} />
            </div>
            <div className="mb-4">
              {/* <TanzeemDivision view={view} /> */}
              <Tanzeem view={view} data={data} />
            </div>
            <div className="mb-4">
              {/* <MenTableDivision view={view} /> */}
              <IfradiKuwat view={view} data={data} />
            </div>
            <div className="mb-4">
              {/* <CentralActivitiesDivision view={view} /> */}
              <MarkaziActivities view={view} />
            </div>
            <div className="mb-4">
              {/* <ZailiActivitesDivision view={view} /> */}
              <ZailiActivities view={view} />
            </div>
            <div className=" mb-4">
              {/* <OtherActivitiesDivision arr={arr} view={view} /> */}
              <OtherActivities view={view} />
            </div>
            <div className=" mb-4">
              {/* <ExpandPartyDivision view={view} /> */}
              <ToseeDawat />
            </div>
            <div className=" mb-4">
              {/* <LibraryDivision view={view} /> */}
              <Library />
            </div>
            <div className=" mb-4">
              {/* <MessageDigestDivision view={view} /> */}
              <PaighamDigest view={view} />
            </div>
            <div className=" mb-4">
              {/* <MessageDigestDivision view={view} /> */}
              <Baitulmal view={view} />
            </div>
            <div className=" mb-4">
              {/* <EveningDiaryDivision view={view} /> */}
              <RozOShabDiary view={view} />
            </div>
          </div>
          <div className="w-full flex p-2">
            <label htmlFor="comments">تبصرہ</label>
            <input
              type="text"
              name="comments"
              required
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
          {!view && (
            <div className="w-full">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {id ? "Update" : "Add"}
              </button>
            </div>
          )}
          {/* </fieldset> */}
        </form>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
