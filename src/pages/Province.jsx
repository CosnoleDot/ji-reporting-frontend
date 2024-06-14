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
  ProvinceReportContext,
  useToastState,
} from "../context";
import { UIContext } from "../context/ui";
import { Tanzeem } from "../components/provinceReport/Tanzeem";
import { IfradiKuwat } from "../components/provinceReport/IfradiKuwat";
import { MarkaziActivities } from "../components/provinceReport/MarkaziActivities";
import ZailiActivities from "../components/provinceReport/ZailiActivities";
import { OtherActivities } from "../components/provinceReport/OtherActivities";
import { ToseeDawat } from "../components/provinceReport/ToseeDawat";
import { Library } from "../components/provinceReport/Library";
import { PaighamDigest } from "../components/provinceReport/PaighamDigest";
import { RozOShabDiary } from "../components/provinceReport/RozOShabDiary";
import { Jamiaat } from "../components/provinceReport/Jamiaat";
import { Colleges } from "../components/provinceReport/Colleges";
import { Baitulmal } from "../components/provinceReport/Baitulmal";

export const Province = () => {
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
  const navigate = useNavigate();
  const [page, setPage] = useState();

  useEffect(() => {
    const url = window.location.pathname.split("/")[2];
    setPage(url);
  }, [window.location]);
  const autoFill = () => {
    const provinceFinalData = {};
    document.getElementById("province-form").reset();
    const maqamTFiltered = createData?.maqamReports?.map((item) => {
      const { muntakhibTdId, tdId } = item;
      return { m: muntakhibTdId || [], t: tdId || [] };
    });

    const divisionTFiltered = createData?.divisionReports?.map((item) => {
      const { tdId } = item;
      return { t: tdId || [] };
    });
    const merged = {};
    if (maqamTFiltered && divisionTFiltered) {
      [...maqamTFiltered, ...divisionTFiltered]?.forEach((item) => {
        const { m, t } = item;
        if (t) {
          Object.keys(t)?.forEach((key) => {
            if (merged[key]) {
              merged[key] += t[key];
            } else {
              merged[key] = t[key];
            }
          });
        }
        if (m) {
          Object.keys(m)?.forEach((key) => {
            if (merged[key]) {
              merged[key] += m[key];
            } else {
              merged[key] = m[key];
            }
          });
        }
      });
    }

    for (const key in merged) {
      if (key === "literatureDistribution") {
        setFinalMerged((prevState) => ({
          ...prevState,
          [key]: merged["literatureDistribution"],
        }));
      } else if (key === "commonLiteratureDistribution") {
        setFinalMerged((prevState) => ({
          ...prevState,
          [key]: merged["commonLiteratureDistribution"],
        }));
      } else if (key === "commonStudentMeetings") {
        setFinalMerged((prevState) => ({
          ...prevState,
          [key]: merged["commonStudentMeetings"],
        }));
      } else if (
        key !== "current" &&
        key !== "manualMeetings" &&
        key !== "uploadedCurrent" &&
        key !== "uploadedLitrature" &&
        key !== "uploadedMeetings" &&
        key !== "uploadedCommonStudentMeetings" &&
        key !== "uploadedCommonLiteratureDistribution" &&
        key !== "current" &&
        key !== "meetings" &&
        key !== "currentManual" &&
        key !== "manualCommonLiteratureDistribution" &&
        key !== "manualCommonStudentMeetings" &&
        key !== "manualCurrent" &&
        key !== "manualLitrature" &&
        key !== "meetingsManual"
      ) {
        setFinalMerged((prevState) => ({
          ...prevState,
          [key]: merged[key],
        }));
      }
    }
    createData?.maqamReports?.forEach((i) => {
      const sim = reverseDataFormat(i);
      Object.keys(sim)?.forEach((j) => {
        if (provinceFinalData?.[j]) {
          try {
            provinceFinalData[j] += parseInt(sim[j]) || 0;
          } catch {
            provinceFinalData[j] += sim[j] || 0;
          }
        } else {
          try {
            provinceFinalData[j] = parseInt(sim[j]) || 0;
          } catch {
            provinceFinalData[j] = sim[j] || 0;
          }
        }
      });
    });
    createData?.divisionReports?.forEach((i) => {
      const sim = reverseDataFormat(i);
      Object.keys(sim)?.forEach((j) => {
        if (provinceFinalData?.[j]) {
          try {
            provinceFinalData[j] += parseInt(sim[j]) || 0;
          } catch {
            provinceFinalData[j] += sim[j] || 0;
          }
        } else {
          try {
            provinceFinalData[j] = parseInt(sim[j]) || 0;
          } catch {
            provinceFinalData[j] = sim[j] || 0;
          }
        }
      });
    });

    if (page === "create") {
      [
        "ijtArkan",
        "studyCircle",
        "ijtNazmeen",
        "ijtUmeedwaran",
        "sadurMeeting",
        "ijtRafaqa",
        "paighamEvent",
        "shaheenMeeting",
        "studyCircleMentioned",
        "darseQuran",
        "ijtKarkunan",
      ].map((i) => (provinceFinalData[`${i}-averageAttendance`] = 0));
    }
    Object.keys(provinceFinalData).forEach((i) => {
      let j = i;
      const elem = document.getElementById(j);
      if (elem) {
        if (j === "month") {
        } else {
          if (elem.type === "checkbox") {
          }
          if (j.split("-")[1] === "attendance") {
            document.getElementById(
              `${j.split("-")[0]}-averageAttendance`
            ).value = provinceFinalData[i];
          } else {
            if (i === "name" && !view) {
              elem.value = me?.userAreaId?.name;
            } else {
              elem.value = provinceFinalData[i];
            }
          }
        }
      }
    });
    if (!id) {
      document.getElementById("comments").value = null;
      document.getElementById("anyOther").value = null;
    }
  };
  // GET REPORTS OF Division and Maqams TO CREATE Province REPORT THE COMING REPORTS WILL BE POPULATED
  const getReportsForProvinceReport = async () => {
    try {
      const req = await instance.get(`/reports/province`, {
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
  const getProvinceSingleReport = async () => {
    try {
      const req = await instance.get(`/reports/province/${id}`, {
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
  const paigham = [
    "anyOther",
    "arkan-decrease",
    "arkan-decreaseSum",
    "arkan-increase",
    "arkan-increaseSum",
    "arkan-manualDecrease",
    "arkan-manualIncrease",
    "arkan-manualStart",
    "arkan-monthly",
    "arkan-start",
    "arkan-startSum",
    "busmRehaishUnits-continue",
    "busmRehaishUnits-decrease",
    "busmRehaishUnits-increase",
    "busmRehaishUnits-monthly",
    "busmRehaishUnits-paused",
    "busmRehaishUnits-start",
    "busmSchoolUnits-continue",
    "busmSchoolUnits-decrease",
    "busmSchoolUnits-increase",
    "busmSchoolUnits-monthly",
    "busmSchoolUnits-paused",
    "busmSchoolUnits-start",
    "busmTotalUnits-continue",
    "busmTotalUnits-decrease",
    "busmTotalUnits-increase",
    "busmTotalUnits-monthly",
    "busmTotalUnits-paused",
    "busmTotalUnits-start",
    "collegesA-end",
    "collegesA-increase",
    "collegesA-monthly",
    "collegesA-start",
    "collegesB-end",
    "collegesB-increase",
    "collegesB-monthly",
    "collegesB-start",
    "collegesC-end",
    "collegesC-increase",
    "collegesC-monthly",
    "collegesC-start",
    "collegesD-end",
    "collegesD-increase",
    "collegesD-monthly",
    "collegesD-start",
    "comments",
    "commonLiteratureDistribution",
    "commonStudentMeetings",
    "current",
    "darseQuran-averageAttendance",
    "darseQuran-decided",
    "darseQuran-done",
    "dawatiWafud",
    "divMushawarat-averageAttendance",
    "divMushawarat-decided",
    "divMushawarat-done",
    "gift",
    "ijtArkan-averageAttendance",
    "ijtArkan-decided",
    "ijtArkan-done",
    "ijtKarkunan-averageAttendance",
    "ijtKarkunan-decided",
    "ijtKarkunan-done",
    "ijtNazmeen-averageAttendance",
    "ijtNazmeen-decided",
    "ijtNazmeen-done",
    "ijtRafaqa-averageAttendance",
    "ijtRafaqa-decided",
    "ijtRafaqa-done",
    "ijtUmeedwaran-averageAttendance",
    "ijtUmeedwaran-decided",
    "ijtUmeedwaran-done",
    "jamiaatA-end",
    "jamiaatA-increase",
    "jamiaatA-monthly",
    "jamiaatA-start",
    "jamiaatB-end",
    "jamiaatB-increase",
    "jamiaatB-monthly",
    "jamiaatB-start",
    "jamiaatC-end",
    "jamiaatC-increase",
    "jamiaatC-monthly",
    "jamiaatC-start",
    "jamiaatD-end",
    "jamiaatD-increase",
    "jamiaatD-monthly",
    "jamiaatD-start",
    "jamiaatE-end",
    "jamiaatE-increase",
    "jamiaatE-monthly",
    "jamiaatE-start",
    "karkunan-decrease",
    "karkunan-decreaseSum",
    "karkunan-increase",
    "karkunan-increaseSum",
    "karkunan-manualDecrease",
    "karkunan-manualIncrease",
    "karkunan-manualStart",
    "karkunan-monthly",
    "karkunan-start",
    "karkunan-startSum",
    "literatureDistribution",
    "meetings",
    "members-decrease",
    "members-decreaseSum",
    "members-increase",
    "members-increaseSum",
    "members-manualDecrease",
    "members-manualIncrease",
    "members-manualStart",
    "members-monthly",
    "members-start",
    "members-startSum",
    "nizamSalah",
    "paighamEvent-averageAttendance",
    "paighamEvent-decided",
    "paighamEvent-done",
    "rafaqa-decrease",
    "rafaqa-decreaseSum",
    "rafaqa-increase",
    "rafaqa-increaseSum",
    "rafaqa-manualDecrease",
    "rafaqa-manualIncrease",
    "rafaqa-manualStart",
    "rafaqa-monthly",
    "rafaqa-start",
    "rafaqa-startSum",
    "rafaqaFilled",
    "rawabitDecided",
    "rawabitParties",
    "rehaishHalqay-continue",
    "rehaishHalqay-decrease",
    "rehaishHalqay-increase",
    "rehaishHalqay-monthly",
    "rehaishHalqay-paused",
    "rehaishHalqay-start",
    "rwabitMeetingsGoal",
    "sadurMeeting-averageAttendance",
    "sadurMeeting-decided",
    "sadurMeeting-done",
    "shabBedari",
    "shaheen-decrease",
    "shaheen-decreaseSum",
    "shaheen-increase",
    "shaheen-increaseSum",
    "shaheen-manualDecrease",
    "shaheen-manualIncrease",
    "shaheen-manualStart",
    "shaheen-monthly",
    "shaheen-start",
    "shaheen-startSum",
    "shaheenMeeting-averageAttendance",
    "shaheenMeeting-decided",
    "shaheenMeeting-done",
    "studyCircle-averageAttendance",
    "studyCircle-decided",
    "studyCircle-done",
    "studyCircleMentioned-averageAttendance",
    "studyCircleMentioned-decided",
    "studyCircleMentioned-done",
    "subRehaishHalqay-continue",
    "subRehaishHalqay-decrease",
    "subRehaishHalqay-increase",
    "subRehaishHalqay-monthly",
    "subRehaishHalqay-paused",
    "subRehaishHalqay-start",
    "subTaleemHalqay-continue",
    "subTaleemHalqay-decrease",
    "subTaleemHalqay-increase",
    "subTaleemHalqay-monthly",
    "subTaleemHalqay-paused",
    "subTaleemHalqay-start",
    "subTotalHalqay-continue",
    "subTotalHalqay-decrease",
    "subTotalHalqay-increase",
    "subTotalHalqay-monthly",
    "subTotalHalqay-paused",
    "subTotalHalqay-start",
    "taleemHalqay-continue",
    "taleemHalqay-decrease",
    "taleemHalqay-increase",
    "taleemHalqay-monthly",
    "taleemHalqay-paused",
    "taleemHalqay-start",
    "tanzeemiRound",
    "tarbiyatGaah",
    "tarbiyatGaahGoal",
    "tarbiyatGaahGoalManual",
    "tarbiyatGaahGoalSum",
    "tarbiyatGaahHeld",
    "tarbiyatGaahHeldManual",
    "tarbiyatGaahHeldSum",
    "totalBookRent",
    "totalBooks",
    "totalDecrease",
    "totalHalqay-continue",
    "totalHalqay-decrease",
    "totalHalqay-increase",
    "totalHalqay-monthly",
    "totalHalqay-paused",
    "totalHalqay-start",
    "totalIncrease",
    "totalLibraries",
    "totalPrinted",
    "totalSoldMarket",
    "totalSoldTanzeemi",
    "umeedWaran-decrease",
    "umeedWaran-decreaseSum",
    "umeedWaran-increase",
    "umeedWaran-increaseSum",
    "umeedWaran-manualDecrease",
    "umeedWaran-manualIncrease",
    "umeedWaran-manualStart",
    "umeedWaran-monthly",
    "umeedWaran-start",
    "umeedWaran-startSum",
    "umeedwaranFilled",
    "monthlyIncome",
    "monthlyExpenditure",
    "savings",
    "loss",
  ];
  useEffect(() => {
    if (data && id) {
      paigham?.forEach((p) => {
        if (data[p] !== undefined) {
          const fieldValue = data[p];
          document.getElementById(p).value = fieldValue;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const l = location.pathname?.split("/")[2];
    if (l === "create") {
      getReportsForProvinceReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (!id) {
      autoFill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, createData, id]);
  useEffect(() => {
    if (id) {
      getProvinceSingleReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // EDIT CODE END
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonData = convertDataFormat(toJson(formData));
    setLoading(true);
    try {
      if (id) {
        const req = await instance.put(`/reports/province/${id}`, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        dispatch({ type: "SUCCESS", payload: req?.data?.message });
      } else {
        const req = await instance.post("/reports/province", jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        await getProvinceReports(0, 10);
        dispatch({ type: "SUCCESS", payload: req.data?.message });
      }
      navigate("/reports");
    } catch (error) {
      dispatch({ type: "ERROR", payload: error?.response?.data?.message });
    }
    setLoading(false);
  };
  Object.keys(data).forEach((i) => {
    if (data[i] === null) {
      data[i] = 0;
    }
  });

  return (
    <GeneralLayout>
      <div className="reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll">
        <form
          className="flex flex-col justify-center items-center p-4 font-notoUrdu mb-5"
          dir="rtl"
          onSubmit={handleSubmit}
          id="province-form"
        >
          <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
            جائزہ کارکردگی رپورٹ (براے صوبہ)
          </h2>
          <div className="w-full">
            <div>
              <GeneralInfo
                setMonth={setMonth}
                month={month}
                me={me}
                area={"صوبہ"}
                view={view}
              />
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
              <OtherActivities view={view} />
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
