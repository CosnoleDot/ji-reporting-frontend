import React, { useContext } from "react";
import { GeneralLayout, Loader, GeneralInfo } from "../components";
import {
  convertDataFormat,
  reverseDataFormat,
  sumIntValues,
  toJson,
} from "../utils";
import instance from "../api/instrance";
import { InputWithLabel } from "../components/InputWithLabel";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  DivisionContext,
  DivisionReportContext,
  HalqaContext,
  HalqaReportContext,
  MaqamReportContext,
  MeContext,
  useToastState,
} from "../context";
import { useEffect } from "react";
import { getData } from "./Maqam";
import { UIContext } from "../context/ui";
import { Tanzeem } from "../components/divisionReport/Tanzeem";
import { IfradiKuwat } from "../components/divisionReport/IfradiKuwat";
import { MarkaziActivities } from "../components/divisionReport/MarkaziActivities";
import ZailiActivities from "../components/divisionReport/ZailiActivities";
import { OtherActivities } from "../components/divisionReport/OtherActivities";
import { ToseeDawat } from "../components/divisionReport/ToseeDawat";
import { Library } from "../components/divisionReport/Library";
import { PaighamDigest } from "../components/divisionReport/PaighamDigest";
import { RozOShabDiary } from "../components/divisionReport/RozOShabDiary";

export const Division = () => {
  // EDIT CODE START
  const halqa = useContext(HalqaReportContext);
  const maqam = useContext(MaqamReportContext);
  const [month, setMonth] = useState("");
  const division = useContext(DivisionReportContext);
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading } = useContext(UIContext);
  const [view, setView] = useState(false);
  const me = useContext(MeContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const autoFill = () => {
    const halq = {};
    document.getElementById("totalLibraries").value = halqa.filter((i) =>
      i?.month.includes(month)
    ).length;
    halqa
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
    delete halq.comments;
    
    const studyCircleDone= halq['studyCircle-completed'];
    halq['studyCircleMentioned-done']= studyCircleDone;
    const studyCircleAttendancee= halq['studyCircle-attendance'];
    halq['studyCircleMentioned-attendance']= studyCircleAttendancee;
    delete halq['studyCircle-completed'];
    delete halq['studyCircle-attendance']
    
    Object.keys(halq).forEach((i) => {
      let j;

      if (i.split("-")[1] === "completed") {
        j = i.split("-")[0] + "-done";
      } else if (i.split("-")[1] === "attendance") {
        j = i.split("-")[0] + "-averageAttendance";
      } else if (i === "studyCircle-decided") {
        j = "studyCircleMentioned-decided";
      } else if (i === "studyCircle-completed") {
        j = "studyCircleMentioned-done";
      } else if (i === "studyCircle-attendance") {
        j = "studyCircleMentioned-averageAttendance";
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
      
      const elem = document.getElementById(j);
      if (elem) {
        // console.log(j, 'TESTING');
        if (j === "month") {
        } else {
          if (elem.type === "checkbox") {
          }
          if (j.split("-")[1] === "attendance") {
            document.getElementById(
              `${j.split("-")[0]}-averageAttendance`
            ).value = halq[i];
          } else {
            elem.value = halq[i];
          }
        }
      }
    });
  };

  useEffect(() => {
    if (!id) autoFill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, halqa, month]);
  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    if (id) getData("division", id, setData, { halqa, maqam, division });
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
          elem.value = data[i];
        }
      }
    });
  }, [data]);
  // EDIT CODE END
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const jsonData = convertDataFormat(toJson(formData));
    
    setLoading(true);
    try {
      if (id) {
        const req = await instance.put(`/reports/division/${id}`, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        dispatch({ type: "SUCCESS", payload: req.data?.message });
        navigate("/reports");
      } else {
        const req = await instance.post("/reports/division", jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        dispatch({ type: "SUCCESS", payload: req.data?.message });
        navigate("/reports");
      }

      e.target.reset();
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
    }
    setLoading(false);
  };
  return (
    <GeneralLayout>
      <div className="reports h-[calc(100vh-64.4px-64px)] overflow-hidden overflow-y-scroll w-full">
        <form
          className="flex w-full flex-col justify-center items-center p-4 font-notoUrdu"
          dir="rtl"
          onSubmit={handleSubmit}
        >
          {/* <fieldset disabled={view} className="w-full"> */}
          <h2 className="text-2xl mb-4">جا ئزءکارکردگی رپورٹ (براے ڈویژن)</h2>
          <div className="w-full">
            <div>
              <GeneralInfo setMonth={setMonth} me={me} area={"ڈویژن"} />
            </div>
            <div>
             
              <Tanzeem data={data} view={view}/>
            </div>
            <div className="mb-4">
           
              <IfradiKuwat data={data} view={view}/>
            </div>
            <div className="mb-4">
           
              <MarkaziActivities view={view} />
            </div>
            <div className="mb-4">
            
              <ZailiActivities view={view} />
            </div>
            <div className=" mb-4">
            
              <OtherActivities view={view}/>
            </div>
            <div className=" mb-4">
             
              <ToseeDawat />
            </div>
            <div className=" mb-4">
             
              <Library />
            </div>
            <div className=" mb-4">
            
              <PaighamDigest />
            </div>
            <div className=" mb-4">
          
              <RozOShabDiary />
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
          <div className="w-full">
            <button className="btn btn-primary" disabled={loading}>
              {id ? "Update" : "Add"}
            </button>
          </div>
          {/* </fieldset> */}
        </form>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
