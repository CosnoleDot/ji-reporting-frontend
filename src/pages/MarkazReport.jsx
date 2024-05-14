import { GeneralLayout, calcultate } from "../components";
import { convertDataFormat, reverseDataFormat, toJson } from "../utils";
import instance from "../api/instrance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import {
  MarkazReportContext,
  MeContext,
  ProvinceReportContext,
  useToastState,
} from "../context";
import { UIContext } from "../context/ui";
import {
  Colleges,
  IfradiKuwat,
  Jamiaat,
  Library,
  MarkaziActivities,
  OtherActivities,
  RozOShabDiary,
  Tanzeem,
  ToseeDawat,
  ZailiActivities,
} from "../components/markazReport";
import { GeneralInfo } from "../components/markazReport/GeneralInfo";

const getData = async (path, id, setData, data) => {
  const arr = data[path];
  const obj = arr.filter((i) => i?._id?.toString() === id?.toString());
  // if (req) {
  setData(reverseDataFormat(obj[0]));
  // }F
};

export const MarkazReport = () => {
  // EDIT CODE START
  const province = useContext(ProvinceReportContext);
  const markaz = useContext(MarkazReportContext);
  const [month, setMonth] = useState("");
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading, getMarkazReport } = useContext(UIContext);
  const [view, setView] = useState(false);
  const [obj, setObj] = useState({});
  const location = useLocation();
  const me = useContext(MeContext);
  const navigate = useNavigate();
  
  const autoFill = () => {
    const halq = {};
    document.getElementById("markaz-form").reset();
    if (province.filter((i) => i?.month.includes(month)).length < 1) {
      [
        `rafaqa-start`,
        "karkunan-start",
        "rafaqa-increase",
        "karkunan-increase",
        "rafaqa-decrease",
        "karkunan-decrease",
        "rafaqa-end",
        "karkunan-end",
        "rafaqa-monthly",
        "karkunan-monthly",
        "ijtRafaqa-decided",
        "ijtRafaqa-done",
        "ijtRafaqa-averageAttendance",
        "darseQuran-averageAttendance",
        "ijtKarkunan-averageAttendance",
        "ijtKarkunan-decided",
        "ijtKarkunan-done",
        "darseQuran-decided",
        "darseQuran-done",
        "dawatiWafud",
        "rawabitParties",
        "shabBedari",
        "nizamSalah",
        "totalBooks",
        "totalIncrease",
        "totalDecrease",
        "tarbiyatGaahGoalSum",
        "tarbiyatGaahHeldSum",
        "totalBookRent",
      ].forEach((i) => {
        document.getElementById(i).value = 0;
      });
      // document.getElementById("name").value = me?.userAreaId?.name;
    }
    province
      .filter((i) => i?.month.includes(month))
      .forEach((i) => {
        const sim = reverseDataFormat(i);
        Object.keys(sim)?.forEach((j) => {
          if (halq?.[j]) {
            try {
              halq[j] += parseInt(sim[j]) || 0;
            } catch {
              halq[j] += sim[j] || 0;
            }
          } else {
            try {
              halq[j] = parseInt(sim[j]) || 0;
            } catch {
              halq[j] = sim[j] || 0;
            }
          }
        });
      });
    Object.keys(halq).forEach((i) => {
      let j;
      if (i === "current") {
        j = "current";
      } else {
        if (i.split("-")[1] === "completed") {
          j = i.split("-")[0] + "-done";
        } else if (i.split("-")[1] === "attendance") {
          j = i.split("-")[0] + "-averageAttendance";
        } else if (i === "books") {
          j = "totalBooks";
        } else if (i === "bookRent") {
          j = "totalBookRent";
        } else if (i === "increase") {
          j = "totalIncrease";
        } else if (i === "decrease") {
          j = "totalDecrease";
        } else {
          j = i;
        }
      }
      //  there
      
      const afd = [
        "rehaishHalqay",
        "taleemHalqay",
        "totalHalqay",
        "subRehaishHalqay",
        "subTaleemHalqay",
        "subTotalHalqay",
        "busmSchoolUnits",
        "busmRehaishUnits",
        "busmTotalUnits",
      ];
      afd.forEach((i) => {
        calcultate(i);
      });
      
      setObj({
        ijtRafaqaDecided: halq["ijtRafaqa-decided"],
        ijtRafaqaDone: halq["ijtRafaqa-done"],
        studyCircleMentionedDone: halq["studyCircleMentioned-done"],
        studyCircleMentionedDecided: halq["studyCircleMentioned-decided"],
        darseQuranDecided: halq["darseQuran-decided"],
        darseQuranDone: halq["darseQuran-done"],
        ijtKarkunanDecided: halq["ijtKarkunan-decided"],
        ijtKarkunanDone: halq["ijtKarkunan-done"],
        shaheenMeetingDecided: halq["shaheenMeeting-decided"],
        shaheenMeetingDone: halq["shaheenMeeting-done"],
        paighamEventDecided: halq["paighamEvent-decided"],
        paighamEventDone: halq["paighamEvent-done"],
      });
     
      const elem = document.getElementById(j);
      if (elem) {
        if (j === "month") {
        } else {
          if (elem.type === "checkbox") {
          }
          if (j.split("-")[1] === "attendance") {
            document.getElementById(
              `${j.split("-")[0]}-averageAttendance`
            ).value = halq[i];
          }
          if (j.split("-")[1] === "increaseSum") {
            document.getElementById(`${j.split("-")[0]}-increase`).value =
              halq[j];
          }
          if (j.split("-")[1] === "decreaseSum") {
            document.getElementById(`${j.split("-")[0]}-decrease`).value =
              halq[j];
          }
          if (j.split("-")[1] === "startSum") {
            document.getElementById(`${j.split("-")[0]}-start`).value = halq[j];
          } else {
            if (i === "name" && !view) {
              elem.value = me?.userAreaId?.name;
            } else {
              elem.value = halq[i];
            }
          }
        }
      }
    });
    
    document.getElementById("rawabitDecided").value = halq["rawabitDecided"];
    [
      "studyCircleMentioned",
      "darseQuran",
      "ijtRafaqa",
      "shaheenMeeting",
      "paighamEvent",
      "ijtNazmeen",
      "sadurMeeting",
      "ijtKarkunan",
      "ijtUmeedwaran",
      "divMushawarat",
      "ijtArkan",
      "studyCircle",
    ].forEach((i) => {
      document.getElementById(`${i}-averageAttendance`).value = 0;
    });
    
  };

  const paigham = [
    "tarbiyatGaahGoalManual",
    "tarbiyatGaahHeldManual",
    "tarbiyatGaahGoalSum",
    "tarbiyatGaahHeldSum",
    "tarbiyatGaahGoal",
    "tarbiyatGaahHeld",
    "divMushawarat-averageAttendance",
    "ijtArkan-averageAttendance",
    "ijtNazmeen-averageAttendance",
    "ijtUmeedwaran-averageAttendance",
    "studyCircle-averageAttendance",
    "sadurMeeting-averageAttendance",
  ];

  useEffect(() => {
    if (data && id) {
      paigham.forEach((p) => {
        if (data[p] !== undefined) {
          const fieldValue = data[p];
          document.getElementById(p).value = fieldValue;
        }
      });
     
    }
  }, [data]);
 
  
  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    if (id) getData("markaz", id, setData, { markaz });
    else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    Object.keys(data).forEach((i) => {
      const elem = document.getElementById(i);
      if (elem) {
        if (i === "month") {
          elem.value = data[i]?.split("")?.slice(0, 7)?.join("");
        } else {
          if (elem.type === "checkbox") {
            elem.checked = data[i];
          } else {
            elem.value = data[i];
          }
        }
      }
    });
    
   
  }, [data]);
  useEffect(() => {
    if (!id) autoFill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, month]);
  // EDIT CODE END
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const jsonData = convertDataFormat(toJson(formData));

    // Replace null values with zero
    for (const key in jsonData) {
      if (jsonData.hasOwnProperty(key) && jsonData[key] === null) {
        jsonData[key] = 0;
      }
    }
console.log(jsonData,'asd')
    setLoading(true);
    try {
      if (id) {
        jsonData.month = data?.month;
        const req = await instance.put(`/reports/markaz/${id}`, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        await getMarkazReport();
        dispatch({ type: "SUCCESS", payload: req?.data?.message });
      } else {
        const req = await instance.post("/reports/markaz", jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        await getMarkazReport();
        dispatch({ type: "SUCCESS", payload: req.data?.message });
      }
      navigate("/reports");
    } catch (error) {
      dispatch({ type: "ERROR", payload: error?.response?.data?.message });
    }
    setLoading(false);
  };
  

  return (
    <GeneralLayout>
      <div className="reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll">
        <form
          className="flex flex-col justify-center items-center p-4 font-notoUrdu mb-5"
          dir="rtl"
          onSubmit={handleSubmit}
          id="markaz-form"
        >
          <h2 className="text-2xl">جا ئزءکارکردگی رپورٹ (برائے مرکز)</h2>

          <div className="w-full p-4">
            <div>
              <GeneralInfo
                setMonth={setMonth}
                month={month}
                me={me}
                area={"مقام"}
                view={view}
              />
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
              <OtherActivities view={view} />
            </div>
            <div className="mb-4">
              <ToseeDawat />
            </div>
            <div className="mb-4">
              <Library />
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
