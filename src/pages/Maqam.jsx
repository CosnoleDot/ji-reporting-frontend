import { GeneralLayout, GeneralInfo, calcultate } from "../components";
import { convertDataFormat, reverseDataFormat, toJson } from "../utils";
import instance from "../api/instrance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import {
  DivisionReportContext,
  HalqaReportContext,
  MaqamReportContext,
  MeContext,
  useToastState,
} from "../context";
import { UIContext } from "../context/ui";
import { Tanzeem } from "../components/maqamReport/Tanzeem";
import { IfradiKuwat } from "../components/maqamReport/IfradiKuwat";
import { MarkaziActivities } from "../components/maqamReport/MarkaziActivities";
import { ZailiActivities } from "../components/maqamReport/ZailiActivities";
import { OtherActivities } from "../components/maqamReport/OtherActivities";
import { ToseeDawat } from "../components/maqamReport/ToseeDawat";
import { Library } from "../components/maqamReport/Library";
import { PaighamDigest } from "../components/maqamReport/PaighamDigest";
import { RozOShabDiary } from "../components/maqamReport/RozOShabDiary";
import { Jamiaat } from "../components/maqamReport/Jamiaat";
import { Colleges } from "../components/maqamReport/Colleges";

export const getData = async (path, id, setData, data) => {
  const arr = data[path];
  const obj = arr.filter((i) => i?._id?.toString() === id?.toString());
  // if (req) {
  setData(reverseDataFormat(obj[0]));
  // }F
};

export const Maqam = () => {
  // EDIT CODE START
  const halqa = useContext(HalqaReportContext);
  const maqam = useContext(MaqamReportContext);
  const division = useContext(DivisionReportContext);
  const [month, setMonth] = useState("");
  const [createData, setCreateData] = useState();
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

    document.getElementById("maqam-form").reset();
    if (createData?.filter((i) => i?.month.includes(month)).length < 1) {
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
        "totalBooks",
        "totalIncrease",
        "totalDecrease",
        "totalBookRent",
      ].forEach((i) => {
        document.getElementById(i).value = 0;
      });
      document.getElementById("name").value = me?.userAreaId?.name;
    }

    createData
      ?.filter((i) => i?.month?.includes(month))
      ?.forEach((i) => {
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
      if (i === "studyCircle-decided") {
        j = "studyCircleMentioned-decided";
      } else if (i === "literatureDistribution") {
        j = "litrature";
      } else if (i === "studyCircle-completed") {
        j = "studyCircleMentioned-done";
      } else if (i === "studyCircle-attendance") {
        j = "studyCircleMentioned-averageAttendance";
      } else if (i === "currentSum") {
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
      halq.litrature = halq.literatureDistribution;
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
            } else if (elem === "litrature") {
              elem.value = halq["literatureDistribution"];
            } else {
              elem.value = halq[i];
            }
          }
        }
      }
    });
    document.getElementById("studyCircle-averageAttendance").value = 0;
    document.getElementById("studyCircle-done").value = 0;
    ["arkan", "umeedWaran"].forEach((i) => {
      document.getElementById(`${i}-start`).value = 0;
      document.getElementById(`${i}-end`).value = 0;
      document.getElementById(`${i}-increase`).value = 0;
      document.getElementById(`${i}-decrease`).value = 0;
      document.getElementById(`${i}-monthly`).value = 0;
    });
    [
      "paighamEvent",
      "shaheenMeeting",
      "darseQuran",
      "ijtKarkunan",
      "studyCircleMentioned",
      "ijtRafaqa",
    ]?.forEach((i) => {
      document.getElementById(`${i}-averageAttendance`).value = 0;
    });

    document.getElementById("karkunan-monthly").value = 0;
    document.getElementById("rafaqa-monthly").value = 0;
    document.getElementById("rawabitDecided").value = 0;
    document.getElementById("shabBedari").value = 0;

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

  // GET REPORTS OF MAQAM HALQA TO CREATE MAQAM REPORT THE COMING REPORTS WILL BE POPULATED
  const getHalqaReports = async () => {
    try {
      const req = await instance.get(`/reports/maqam`, {
        params: { areaId: me?.userAreaId?._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      const repo = req?.data?.data;
      setCreateData(repo);
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  const getMaqamReport = async () => {
    try {
      const req = await instance.get(`/reports/maqam/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      const repo = req?.data?.data;
      setData(reverseDataFormat(repo));
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };

  // To set values to zero when in create mode
  useEffect(() => {
    const value1 = document.getElementById("litrature");
    const value2 = document.getElementById("commonStudentMeetings");
    const value3 = document.getElementById("commonLiteratureDistribution");
    if (window.location.pathname?.split("/")[2] === "create") {
      value1.value = 0;
      value2.value = 0;
      value3.value = 0;
    }
  }, [location.pathname]);
  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "create") {
      getHalqaReports();
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
    if (!id) {
      autoFill();
    } else {
      getMaqamReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, createData, id]);
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
  data.litrature = data["literatureDistribution"];

  return (
    <GeneralLayout>
      <div className="reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll">
        <form
          className="flex flex-col justify-center items-center p-4 font-notoUrdu mb-5"
          dir="rtl"
          onSubmit={handleSubmit}
          id="maqam-form"
        >
          <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
            {" "}
            جائزہ کارکردگی رپورٹ (براے مقام)
          </h2>
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
