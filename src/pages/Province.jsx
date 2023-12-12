import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToastState } from "../context";
import {
  CentralActivitiesProvince,
  EveningDiaryProvince,
  ExpandPartyProvince,
  GeneralLayout,
  LibraryProvince,
  Loader,
  MenTableProvince,
  MessageDigestProvince,
  OtherActivitiesProvince,
  TanzeemProvince,
  ZailiActivitesProvince,
} from "../components";
import { useEffect } from "react";
import { InputWithLabel } from "../components/InputWithLabel";
import instance from "../api/instrance";
import { convertDataFormat, reverseDataFormat } from "../utils";

export const Province = () => {
  // EDIT CODE START
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [allReports, setAllReports] = useState([]);
  const [userType, setUserType] = useState("");
  const [sum, setSum] = useState({ maqam: {}, division: {}, halqa: {} });
  useEffect(() => {
    setUserType(localStorage.getItem("@type"));
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.date);
  }, [params]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      if (userType === "province") {
        const m = await instance.get(`reports/maqam`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        const h = await instance.get(`reports/halqa`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        const d = await instance.get(`reports/division`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        const ma = m?.data?.data?.filter((curr) => {
          const [dataMonth, dataYear] = [
            curr?.month.split("-")[1],
            curr?.month.split("-")[0],
          ];
          const [givenMonth, givenYear] = [
            id?.split("-")[1],
            id?.split("-")[0],
          ];
          return dataMonth == givenMonth && dataYear == givenYear;
        });
        const hal = h?.data?.data?.filter((curr) => {
          const [dataMonth, dataYear] = [
            curr?.month.split("-")[1],
            curr?.month.split("-")[0],
          ];
          const [givenMonth, givenYear] = [
            id?.split("-")[1],
            id?.split("-")[0],
          ];
          return dataMonth == givenMonth && dataYear == givenYear;
        });
        const divi = d?.data?.data?.filter((curr) => {
          const [dataMonth, dataYear] = [
            curr?.month.split("-")[1],
            curr?.month.split("-")[0],
          ];
          const [givenMonth, givenYear] = [
            id?.split("-")[1],
            id?.split("-")[0],
          ];
          return dataMonth == givenMonth && dataYear == givenYear;
        });

        const maq = {};
        ma.forEach((i) => {
          const sim = reverseDataFormat(i);
          Object.keys(sim)?.forEach((j) => {
            if (maq?.[j]) {
              try {
                maq[j] += parseInt(sim[j]);
              } catch {
                maq[j] += sim[j];
              }
            } else {
              try {
                maq[j] = parseInt(sim[j]);
              } catch {
                maq[j] = sim[j];
              }
            }
          });
        });

        const divis = {};
        divi.forEach((i) => {
          const sim = reverseDataFormat(i);
          Object.keys(sim)?.forEach((j) => {
            if (divis?.[j]) {
              try {
                divis[j] += parseInt(sim[j]);
              } catch {
                divis[j] += sim[j];
              }
            } else {
              try {
                divis[j] = parseInt(sim[j]);
              } catch {
                divis[j] = sim[j];
              }
            }
          });
        });

        const halq = {};
        hal.forEach((i) => {
          const sim = reverseDataFormat(i);
          Object.keys(sim)?.forEach((j) => {
            if (halq?.[j]) {
              try {
                halq[j] += parseInt(sim[j]);
              } catch {
                halq[j] += sim[j];
              }
            } else {
              try {
                halq[j] = parseInt(sim[j]);
              } catch {
                halq[j] = sim[j];
              }
            }
          });
        });

        setAllReports({
          maqam: maq,
          halqa: halq,
          division: divis,
        });
      } else {
        setLoading(false);
        console.log("error");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchReports();
  }, [id]);

  useEffect(() => {
    const zaili_s = [
      "ijtRafaqa",
      "studyCircleMentioned",
      "ijtKarkunan",
      "darseQuran",
      "shaheenMeeting",
      "paighamEvent",
    ];
    const zaili_e = ["decided", "done", "averageAttendance"];
    const newArr = [];
    zaili_s.forEach((i) => {
      zaili_e.forEach((j) => {
        newArr.push(`${i}-${j}`);
      });
    });

    Object.keys(allReports?.["division"] || {}).forEach((i) => {
      const elem = document.getElementById(i);
      if (elem) {
        if (i === "month") {
          elem.value = allReports[i]
            ?.toString()
            ?.split("")
            ?.slice(0, 7)
            ?.join("");
        } else {
          if (elem.type === "checkbox") {
            elem.defaultChecked = allReports[i];
          } else {
            if (newArr.includes(i)) {
              elem.value = allReports["halqa"][i];
            } else {
              elem.value = allReports["division"][i] + allReports["maqam"][i];
            }
          }
        }
      }
    });
    Object.keys(allReports?.["halqa"] || {}).forEach((i) => {
      const elem = document.getElementById(i);
      if (elem) {
        if (i === "month") {
          elem.value = allReports[i]
            ?.toString()
            ?.split("")
            ?.slice(0, 7)
            ?.join("");
        } else {
          if (elem.type === "checkbox") {
            elem.defaultChecked = allReports[i];
          } else {
            if (newArr.includes(i)) {
              elem.value = allReports["halqa"][i];
            } else {
              elem.value = allReports["division"][i] + allReports["maqam"][i];
            }
          }
        }
      }
    });
  }, [allReports]);

  return (
    <GeneralLayout>
      <div className="reports h-[calc(100vh-64.4px-64px)] overflow-hidden overflow-y-scroll w-full">
        <form
          className="flex w-full flex-col justify-center items-center p-4"
          dir="rtl"
        >
          <h2 className="text-2xl mb-4">جائزہ کارکردگی رپورٹ برأے صوبہ</h2>
          <div className="w-full">
            <div>
              <TanzeemProvince view={view} />
            </div>
            <div className="mb-4">
              <MenTableProvince view={view} />
            </div>
            <div className="mb-4">
              <CentralActivitiesProvince view={view} />
            </div>
            <div className="mb-4">
              <ZailiActivitesProvince view={view} />
            </div>
            <div className=" mb-4">
              <OtherActivitiesProvince view={view} />
            </div>
            <div className=" mb-4">
              <ExpandPartyProvince view={view} />
            </div>
            <div className=" mb-4">
              <LibraryProvince view={view} />
            </div>
            <div className=" mb-4">
              <MessageDigestProvince view={view} />
            </div>
            <div className=" mb-4">
              <EveningDiaryProvince view={view} />
            </div>
          </div>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            <div className="w-full md:pr-0 mb-2">
              <InputWithLabel
                readOnly={view}
                type={"textarea"}
                required={true}
                placeholder={" تبصرھ"}
                label={" تبصرھ"}
                id={"comments"}
                name={"comments"}
              />
            </div>
            <div className="w-full mb-2">
              <InputWithLabel
                readOnly={view}
                required={true}
                label={"براے ماھ"}
                type={"month"}
                id={"month"}
                name={"month"}
                value={"sdfhasdfhas"}
              />
            </div>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
