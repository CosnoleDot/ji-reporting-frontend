import { GeneralLayout, GeneralInfo, calcultate } from "../components";
import { convertDataFormat, reverseDataFormat, toJson } from "../utils";
import instance from "../api/instrance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import {
  HalqaReportContext,
  IlaqaReportContext,
  MaqamReportContext,
  // MaqamReportContext,
  MeContext,
  useToastState,
} from "../context";
import { UIContext } from "../context/ui";
import { Tanzeem } from "../components/ilaqaReport/Tanzeem";
import { IfradiKuwat } from "../components/ilaqaReport/IfradiKuwat";
import { MarkaziActivities } from "../components/ilaqaReport/MarkaziActivities";
import ZailiActivities from "../components/ilaqaReport/ZailiActivities";
import { OtherActivities } from "../components/ilaqaReport/OtherActivities";
import { ToseeDawat } from "../components/ilaqaReport/ToseeDawat";
import { Library } from "../components/ilaqaReport/Library";
import { PaighamDigest } from "../components/ilaqaReport/PaighamDigest";
import { RozOShabDiary } from "../components/ilaqaReport/RozOShabDiary";
import { getData } from "./Maqam";

export const Ilaqa = () => {
  // EDIT CODE START
  const halqa = useContext(HalqaReportContext);
  const ilaqa = useContext(IlaqaReportContext);
  const maqam = useContext(MaqamReportContext);
  const [month, setMonth] = useState("");
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading, getMaqamReports } = useContext(UIContext);
  const [view, setView] = useState(false);
  const location = useLocation();
  const me = useContext(MeContext);
  const navigate = useNavigate();
  const autoFill = () => {
    const halq = {};
    document.getElementById("ilaqa-form").reset();
    if (halqa.filter((i) => i?.month.includes(month)).length < 1) {
      [
        "rafaqa-start",
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
        "studyCircleMentioned-decided",
        "studyCircleMentioned-done",
        "studyCircleMentioned-averageAttendance",
        "ijtKarkunan-decided",
        "ijtKarkunan-done",
        "ijtKarkunan-averageAttendance",
        "darseQuran-decided",
        "darseQuran-done",
        "darseQuran-averageAttendance",
        "dawatiWafud",
        "rawabitParties",
        "shabBedari",
        "nizamSalah",
        "rawabitDecided",
        "current",
        "meetings",
        "literatureDistribution",
        "commonStudentMeetings",
        "commonLiteratureDistribution",
        "totalBooks",
        "meetings",
        "literatureDistribution",
        "commonStudentMeetings",
        "commonLiteratureDistribution",
        "totalBooks",
        "totalIncrease",
        "totalDecrease",
        "totalBookRent",
        "rafaqaFilled",
      ].forEach((i) => {
        document.getElementById(i).value = 0;
      });
      document.getElementById("name").value = me?.userAreaId?.name;
    }
    halqa
      .filter((i) => i?.month.includes(month))
      .forEach((i) => {
        const sim = reverseDataFormat(i);
        Object.keys(sim)?.forEach((j) => {
          if (halq?.[j]) {
            try {
              // console.log(sim[j]);
              halq[j] += parseInt(sim[j]) || 0;
            } catch {
              halq[j] += sim[j] || 0;
            }
          } else {
            try {
              // console.log(sim[j]);
              halq[j] = parseInt(sim[j]) || 0;
            } catch {
              halq[j] = sim[j] || 0;
            }
          }
        });
      });
    // console.log(halq);
    Object.keys(halq).forEach((i) => {
      let j;
      if (i === "studyCircle-decided") {
        j = "studyCircleMentioned-decided";
      } else if (i === "studyCircle-completed") {
        j = "studyCircleMentioned-done";
      } else if (i === "studyCircle-attendance") {
        j = "studyCircleMentioned-averageAttendance";
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
    document.getElementById("studyCircle-averageAttendance").value = 0;
    document.getElementById("studyCircle-done").value = 0;
    document.getElementById("umeedwaranFilled").value = 0;
    ["arkan", "umeedWaran"].forEach((i) => {
      document.getElementById(`${i}-start`).value = 0;
      document.getElementById(`${i}-end`).value = 0;
      document.getElementById(`${i}-increase`).value = 0;
      document.getElementById(`${i}-decrease`).value = 0;
      document.getElementById(`${i}-monthly`).value = 0;
    });
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
      "arkan",
      "umeedWaran",
      "rafaqa",
      "karkunan",
      "members",
      "shaheen",
    ];
    afd.forEach((i) => {
      calcultate(i);
    });
  };
  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    if (id) getData("ilaqa", id, setData, { ilaqa, maqam });
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
      "arkan",
      "umeedWaran",
      "rafaqa",
      "karkunan",
      "members",
      "shaheen",
    ];
    afd.forEach((i) => {
      calcultate(i);
    });
  }, [data]);
  useEffect(() => {
    if (!id) autoFill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, halqa, month]);
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

    setLoading(true);
    try {
      if (id) {
        jsonData.month = data?.month;
        const req = await instance.put(`/reports/maqam/${id}`, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        await getMaqamReports();
        dispatch({ type: "SUCCESS", payload: req?.data?.message });
      } else {
        const req = await instance.post("/reports/maqam", jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        await getMaqamReports();
        dispatch({ type: "SUCCESS", payload: req.data?.message });
      }
      navigate("/reports");
    } catch (error) {
      dispatch({ type: "ERROR", payload: error?.response?.data?.message });
    }
    setLoading(false);
  };
  const totalHalqay = parseInt(
    document.getElementById("totalHalqay-end")?.value
  );
  const subTotalHalqay = parseInt(
    document.getElementById("subTotalHalqay-end")?.value
  );
  const busmTotalUnits = parseInt(
    document.getElementById("busmTotalUnits-end")?.value
  );

  // ***************To set the values on change

  useEffect(() => {
    document.getElementById("studyCircleMentioned-decided").value = totalHalqay;
    document.getElementById("ijtRafaqa-decided").value = totalHalqay;
    document.getElementById("darseQuran-decided").value = parseFloat(
      totalHalqay + subTotalHalqay
    );
    document.getElementById("ijtKarkunan-decided").value = parseFloat(
      totalHalqay + subTotalHalqay
    );
    document.getElementById("paighamEvent-decided").value = busmTotalUnits;
    document.getElementById("shaheenMeeting-decided").value = busmTotalUnits;
  }, [totalHalqay, subTotalHalqay, busmTotalUnits]);

  return (
    <GeneralLayout>
      <div className="reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll">
        <form
          className="flex flex-col justify-center items-center p-4 font-notoUrdu mb-5"
          dir="rtl"
          onSubmit={handleSubmit}
          id="ilaqa-form"
        >
          <h2 className="text-2xl">جا ئزءکارکردگی رپورٹ (براے علاقہ)</h2>
          <div className="w-full p-4">
            <div>
              <GeneralInfo
                setMonth={setMonth}
                month={month}
                me={me}
                area={"علاقہ"}
                view={view}
              />
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
