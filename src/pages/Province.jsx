import { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MeContext } from "../context";
import {
  GeneralInfo,
  GeneralLayout,
  Loader,
} from "../components";
import { useEffect } from "react";
import { InputWithLabel } from "../components/InputWithLabel";
import instance from "../api/instrance";
import { reverseDataFormat } from "../utils";
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

export const Province = () => {
  // EDIT CODE START
  const params = useParams();
  const [id, setId] = useState(null);
  const { loading, setLoading } = useContext(UIContext);
  const [view, setView] = useState(false);
  const location = useLocation();
  const me = useContext(MeContext);
  const [allReports, setAllReports] = useState([]);
  const [userType, setUserType] = useState("");
  useEffect(() => {
    setUserType(localStorage.getItem("@type"));
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.date);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          return dataMonth === givenMonth && dataYear === givenYear;
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
          return dataMonth === givenMonth && dataYear === givenYear;
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
          return dataMonth === givenMonth && dataYear === givenYear;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          className="flex w-full flex-col justify-center items-center p-4 gap-4"
          dir="rtl"
        >
          <h2 className="text-2xl mb-4">جائزہ کارکردگی رپورٹ برائے صوبہ</h2>
          <div className="w-full p-4">
            <div>
              <GeneralInfo me={me} area={"صوبہ"} />
            </div>
            <div>
              {/* <TanzeemProvince view={view} /> */}
              <Tanzeem/>
            </div>
            <div className="mb-4">
              {/* <MenTableProvince view={view} /> */}
              <IfradiKuwat/>
            </div>
            <div className="mb-4">
              {/* <CentralActivitiesProvince view={view} /> */}
              <MarkaziActivities/>
            </div>
            <div className="mb-4">
              {/* <ZailiActivitesProvince view={view} /> */}
              <ZailiActivities/>
            </div>
            <div className=" mb-4">
              {/* <OtherActivitiesProvince view={view} /> */}
              <OtherActivities/>
            </div>
            <div className=" mb-4">
              {/* <ExpandPartyProvince view={view} /> */}
              <ToseeDawat/>
            </div>
            <div className=" mb-4">
              {/* <LibraryProvince view={view} /> */}
              <Library/>
            </div>
            <div className=" mb-4">
              {/* <MessageDigestProvince view={view} /> */}
              <PaighamDigest/>
            </div>
            <div className=" mb-4">
              {/* <EveningDiaryProvince view={view} /> */}
              <RozOShabDiary/>
            </div>
          </div>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            <div className="w-full md:pr-0 mb-2">
              <InputWithLabel
                readOnly={view}
                type={"textarea"}
                required={true}
                placeholder={" تبصرہ"}
                label={" تبصرہ"}
                id={"comments"}
                name={"comments"}
              />
            </div>
            <div className="w-full mb-2">
              <InputWithLabel
                readOnly={view}
                required={true}
                label={"برائے ماہ"}
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
