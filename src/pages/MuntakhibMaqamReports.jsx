import { GeneralLayout, GeneralInfo, calcultate } from "../components";
import { convertDataFormat, reverseDataFormat, toJson } from "../utils";
import instance from "../api/instrance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import {
  DivisionReportContext,
  HalqaReportContext,
  IlaqaReportContext,
  MaqamReportContext,
  MeContext,
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
  PaighamDigest,
  RozOShabDiary,
  Tanzeem,
  ToseeDawat,
  ZailiActivities,
} from "../components/muntakhibMaqamReports";
import { Baitulmal } from "../components/muntakhibMaqamReports/Baitulmal";

export const getData = async (path, id, setData, data) => {
  const arr = data[path];
  const obj = arr.filter((i) => i?._id?.toString() === id?.toString());
  // if (req) {
  setData(reverseDataFormat(obj[0]));
  // }F
};

export const MuntakhibMaqamReports = () => {
  // EDIT CODE START
  const halqa = useContext(HalqaReportContext);
  const [createData, setCreateData] = useState([]);
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
    document.getElementById("maqam-form").reset();
    if (createData?.length > 0)
      createData?.forEach((i) => {
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
    Object.keys(halq)?.forEach((i) => {
      let j;

      if (i === "studyCircle-decided") {
        j = "studyCircleMentioned-decided";
      } else if (i === "studyCircle-decided") {
        j = "studyCircleMentioned-decided";
      } else if (i === "umeedwaranFilled") {
        j = "uploadedUmeedwaran";
      } else if (i === "rafaqaFilled") {
        j = "uploadedRafaqa";
      } else if (i === "umeedwaranFilledSum") {
        j = "umeedwaranFilledSum";
      } else if (i === "rafaqaFilledSum") {
        j = "rafaqaFilledSum";
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
      halq.uploadedCurrent = halq.currentSum;
      halq["manualCurrent"] = 0;
      halq["manualMeetings"] = 0;
      halq["manualLitrature"] = 0;
      halq["manualCommonLiteratureDistribution"] = 0;
      halq["manualCommonStudentMeetings"] = 0;

      halq.uploadedMeetings = halq.meetingsSum;
      halq.uploadedCommonLiteratureDistribution =
        halq.commonLiteratureDistributionSum;
      halq.uploadedLitrature = halq.literatureSum;
      halq.uploadedCommonStudentMeetings = halq.commonStudentMeetingsSum;
      halq.totalReceived = halq.receivedSum;
      halq.monthlyReceivingGoal = halq.monthlyReceivingGoalSum;
      halq.totalSold = halq.soldSum;
      document.getElementById("uploadedRafaqa").value = halq.rafaqaFilledSum;
      document.getElementById("uploadedUmeedwaran").value =
        halq.umeedwaranFilledSum;
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
              elem.value = halq[i] || 0;
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
      "taleemHalqay",
      "totalHalqay",
      "busmRehaishUnits",
      "busmTotalUnits",
      "subRehaishHalqay",
      "subTaleemHalqay",
      "subTotalHalqay",
      "busmSchoolUnits",
      "arkan",
      "umeedWaran",
      "rehaishHalqay",
      "taleemHalqay",
    ].forEach((i) => {
      document.getElementById(`${i}-monthly`).value = 0;
    });
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
    ].forEach((i) => {
      document.getElementById(`${i}-averageAttendance`).value = 0;
    });
    [
      "ijtArkan",
      "studyCircle",
      "ijtNazmeen",
      "sadurMeeting",
      "ijtUmeedwaran",
    ].forEach((i) => {
      document.getElementById(`${i}-decided`).value = 0;
      document.getElementById(`${i}-done`).value = 0;
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
    ["manualUmeedwaran", "manualRafaqa"].forEach(
      (l) => (document.getElementById(l).value = 0)
    );
  };
  const getIlaqaReports = async () => {
    try {
      setLoading(true);
      const req = await instance.get(`/reports/maqam`, {
        params: { areaId: me?.userAreaId?._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      const repo = req?.data?.data;

      setCreateData(repo?.data);
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  const getMaqamReport = async () => {
    try {
      setLoading(true);
      const req = await instance.get(`/reports/maqam/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      const repo = req?.data?.data;
      let unfilter = reverseDataFormat(repo);
      unfilter.uploadedUmeedwaran = unfilter["umeedwaranFilled"];
      unfilter.uploadedRafaqa = unfilter["rafaqaFilled"];
      setData(unfilter);
      setCreateData(reverseDataFormat(repo));

      if (data) {
        setLoading(false);
      }
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    setId(params?.id);
    if ((l === "view" || l === "edit") && id) {
      getMaqamReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "create") {
      getIlaqaReports();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
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
            elem.value = data[i] || 0;
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
    if (!id || window.location.pathname?.split("/")[2] === "create") {
      autoFill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, createData]);
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
        jsonData.rafaqaFilled = jsonData.uploadedRafaqa;
        jsonData.manualRafaqaFilled = jsonData.manualRafaqa;
        jsonData.umeedwaranFilled = jsonData.uploadedUmeedwaran;
        const req = await instance.put(`/reports/maqam/${id}`, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        dispatch({ type: "SUCCESS", payload: req?.data?.message });
      } else {
        jsonData.rafaqaFilled = jsonData.uploadedRafaqa;
        jsonData.manualRafaqaFilled = jsonData.manualRafaqa;
        jsonData.umeedwaranFilled = jsonData.uploadedUmeedwaran;

        const req = await instance.post("/reports/maqam", jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        await getMaqamReports(0, 10);
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

  if (data["manualRafaqaFilled"]) {
    data.manualRafaqa = data["manualRafaqaFilled"];
  }
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
          id="maqam-form"
        >
          <button
            type="button"
            class="absolute top-20 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
           onClick={()=>navigate('/reports')}
           >
            Back
          </button>
          <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
            {" "}
            جائزہ کارکردگی رپورٹ (برائے منتخب مقام)
          </h2>

          <div className="w-full">
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
