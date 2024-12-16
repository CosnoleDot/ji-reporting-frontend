import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../layoutComponents";
import { Rawabit1, Rawabit2, Rawabit3 } from "./rawaabit";
import { RegularStudents } from "./RegularStudents";
import { convertDataFormat, toJson } from "../../utils";
import { FajarNamaz } from "./FajarNamaz";
import { OtherNamaz } from "./OtherNamaz";
import { TafseerQuran } from "./TafseerQuran";
import { Ahdees } from "./Ahdees";
import { Litrature } from "./Litrature";
import { Hifz } from "./Hifz";
import { Course } from "./Course";
import instance from "../../api/instrance";
import { MeContext, useToastState } from "../../context";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const intro = [
  {
    title: "نام",
    type: "text",
    key: "name",
  },
  {
    title: "جمعیت سے تعلق",
    type: "text",
    key: "JamiatRelation",
  },
  {
    title: "تنظیمی تعلق",
    type: "text",
    key: "organizationRelation",
  },
];

export const ReportUmeedwar = () => {
  const [attended, setAttended] = useState("no");
  const [studyCircle, setStudyCircle] = useState("no");
  const [aanat, setAanat] = useState("no");
  const [date, setDate] = useState("");
  const [singleFile, setSingleFile] = useState({});
  const [id, setId] = useState(null);
  const [view, setView] = useState(false);
  const [rbt1Programs, setRbt1Programs] = useState([]);
  const [rbt2Programs, setRbt2Programs] = useState([]);
  const [rbt3Programs, setRbt3Programs] = useState([]);
  const [programsList, setProgramsList] = useState([]);
  const [fileMode, setFileMode] = useState("");
  const [otherprayers, setOtherprayers] = useState("");
  const [prayers, setPrayers] = useState("");
  const getTotalDaysInPreviousMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1); // Move to previous month
    date.setDate(0); // Set to the last day of the previous month
    setPrayers(date.getDate());
    setOtherprayers(date.getDate() * 4);
  };

  useEffect(() => {
    getTotalDaysInPreviousMonth();
  }, []);
  const me = useContext(MeContext);
  const { dispatch } = useToastState();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonData = convertDataFormat(toJson(formData));
    jsonData["rbt1Programs"] = rbt1Programs;
    jsonData["rbt2Programs"] = rbt2Programs;
    jsonData["rbt3Programs"] = rbt3Programs;
    jsonData["fajarTotal"] = prayers;
    jsonData["otherPrayersTotal"] = otherprayers;
    jsonData["month"] = date;
    let l = location.pathname?.split("/")[2];
    if (l === "create") {
      await instance
        .post(`/umeedwar`, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        })
        .then((req) => {
          dispatch({ type: "SUCCESS", payload: req?.data?.message });
          navigate("/personalReport");
        })
        .catch((req) => {
          dispatch({ type: "ERROR", payload: req.response.data.message });
        });
    }
    if (l === "edit") {
      await instance
        .put(`/umeedwar/${id}`, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        })
        .then((req) => {
          dispatch({ type: "SUCCESS", payload: req?.data?.message });
          navigate("/personalReport");
        })
        .catch((req) => {
          dispatch({ type: "ERROR", payload: req.response.data.message });
        });
    }
  };
  const setDateFn = () => {
    const date0 = new Date();
    date0.setMonth(date0.getMonth() - 1);

    const month =
      date0.getMonth() + 1 > 9
        ? date0.getMonth() + 1
        : "0" + (date0.getMonth() + 1);
    setDate(`${date0.getFullYear()}-${month}`);
  };

  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "create") {
      setDateFn();
    }
  }, []);
  useEffect(() => {
    const l = location.pathname?.split("/")[2];

    if (l === "view") {
      setView(true);
      setId(params?.id);
      setFileMode("view");
    } else if (l === "edit") {
      setId(params?.id);
      setFileMode("edit");
    } else {
      setView(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const getSingleReport = async (e) => {
    const req = await instance.get(`/umeedwar/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      },
    });
    if (req.status === 200) {
      setDate(req.data.data.month.split("")?.slice(0, 7)?.join(""));
      setSingleFile(req?.data?.data);
      setAanat(req?.data?.data?.itaatNazmId?.aanat);
      setAttended(req?.data?.data?.itaatNazmId?.attended);
      setStudyCircle(req?.data?.data?.itaatNazmId?.attendedStudyCircle);
      setRbt1Programs(req?.data?.data?.toseeDawaId?.rawabit?.[0]?.programs);
      setRbt2Programs(req?.data?.data?.toseeDawaId?.rawabit?.[1]?.programs);
      setRbt3Programs(req?.data?.data?.toseeDawaId?.rawabit?.[2]?.programs);
    }
    dispatch({ type: "SUCCESS", payload: req?.data?.message });
  };
  useEffect(() => {
    function autoFillForm(obj) {
      if (obj) {
        Object.keys(obj).forEach((key) => {
          const elem = document.getElementById(key);
          if (key === "toseeDawaId") {
            obj[key].rawabit.forEach((obj, index) => {
              Object.keys(obj, index).forEach((innerKey) => {
                if (innerKey === "programs") {
                  setProgramsList((prevState) => {
                    return { ...prevState, [index]: obj[innerKey] };
                  });
                }
                const formattedKey =
                  innerKey.charAt(0).toUpperCase() + innerKey.slice(1);
                const elem = document.getElementById(
                  `rbt${index + 1}${formattedKey}`
                );
                if (elem) {
                  elem.value = obj[innerKey];
                  if (elem === "attended") {
                    setAttended(elem.value);
                  } else if (elem === "attendedStudyCircle") {
                    setStudyCircle(elem.value);
                  } else if (elem === "aanat") {
                    setAanat(elem.value);
                  }
                }
              });
            });
          }

          if (typeof obj[key] === "object") {
            autoFillForm(obj[key]);
          } else {
            if (key === "month") {
              elem.value = obj[key]?.split("").slice(0, 7).join("");
            } else {
              if (elem) {
                elem.value = obj[key];
              }
            }
          }
        });
      }
    }

    autoFillForm(singleFile);
  }, [singleFile]);
  useEffect(() => {
    if (id && id !== undefined) {
      getSingleReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <GeneralLayout active={"personalReport/create"}>
      <div dir="rtl" className="p-4 reports">
        <div>
          <button
            type="button"
            className="p-2"
            onClick={() => navigate("/personalReport")}
          >
            <RxCross1 />
          </button>

          <h2 className="mb-2 block w-full text-center text-md md:text-2xl p-3">
            رپورٹ خاکہ
          </h2>
        </div>

        <form
          className="flex w-full flex-col items-center justify-end gap-5 p-3 overflow-auto mb-5"
          dir="rtl"
          onSubmit={handleSubmit}
        >
          <div className="w-full md:pr-0 mb-2">
            <div className="flex justify-end items-center gap-2 w-full p-2">
              <label className="block text-sm md:text-lg" htmlFor="month">
                برائے ماہ
              </label>
              <input
                className="border-b-2 border-dashed"
                type="month"
                name="month"
                id="month"
                readOnly
                value={date}
              />
            </div>
          </div>

          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            <div className="w-full flex-col lg:flex-row gap-4 md:pr-0 mb-2">
              <div className="flex gap-4 mb-4">
                <label className="block text-sm md:text-lg" htmlFor="name">
                  نام
                </label>
                <input
                  type="text"
                  defaultValue={me?.name || "Name"}
                  readOnly
                  id="name"
                  name="name"
                  className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
                  value={me?.name}
                />
              </div>
              <div className="w-full flex gap-4  mb-4">
                <label
                  className="block text-sm md:text-lg"
                  htmlFor="JamiatRelation"
                >
                  جمعیت سے تعلق
                </label>
                <input
                  type="text"
                  defaultValue={localStorage.getItem("@type")}
                  readOnly
                  id="JamiatRelation"
                  name="JamiatRelation"
                  className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
                  value={localStorage.getItem("@type")}
                />
              </div>
              <div className="flex gap-4 mb-4">
                <label
                  className="block text-sm md:text-lg"
                  htmlFor="organizationRelation"
                >
                  تنظیمی تعلق
                </label>
                <input
                  type="text"
                  defaultValue={localStorage.getItem("@nazimType")}
                  readOnly
                  id="organizationRelation"
                  name="organizationRelation"
                  className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
                  value={localStorage.getItem("@nazimType")}
                />
              </div>
              <h3 className="mb-2 block text-sm md:text-lg">
                اس ماہ میں کوئ خصوصی مصروفیت جس کی وجہ سے آپ کئ روٹین متاثر ہوئ
                ہو
              </h3>
              <textarea
                className="inptut border rounded-md pr-2 w-full"
                placeholder={"..."}
                id={"disturbingRoutine"}
                name={"disturbingRoutine"}
                type={"textarea"}
                maxLength={300}
                disabled={view}
              ></textarea>
            </div>
          </div>
          <FajarNamaz view={view} />
          <OtherNamaz view={view} />
          <TafseerQuran view={view} />
          <Ahdees view={view} />
          <Litrature view={view} />
          <Hifz view={view} />
          <Course view={view} />
          <div className="w-full flex-col lg:flex-row justify-start items-center">
            <div className="flex w-full  flex-col justify-start items-start">
              <h3 className="mb-2 block w-full text-start text-sm md:text-lg p-3">
                اجتماعِ امیدواران میں شرکت کی
              </h3>
              <div className="flex flex-row items-center justify-start border border-primary p-2 rounded-lg">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="attended"
                      className="radio checked:bg-blue-500"
                      checked={attended === "yes"}
                      value="yes"
                      onChange={() => setAttended("yes")}
                    />
                    <span className="label-text">کی</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="attended"
                      className="radio checked:bg-blue-500"
                      checked={attended === "no"}
                      value="no"
                      onChange={() => setAttended("no")}
                    />
                    <span className="label-text">نہیں کی</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="attended"
                      className="radio checked:bg-blue-500"
                      checked={attended === "leave"}
                      value="leave"
                      onChange={() => setAttended("leave")}
                    />
                    <span className="label-text">رخصت</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex w-full  flex-col justify-start items-start">
              <h3 className="mb-2 block w-full text-start text-sm md:text-lg p-3">
                سٹڈی سرکل میں شرکت کی
              </h3>
              <div className="flex items-center justify-start border border-primary p-2 rounded-lg">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      readOnly={view}
                      type="radio"
                      name="attendedStudyCircle"
                      className="radio checked:bg-blue-500"
                      checked={studyCircle === "yes"}
                      value="yes"
                      onChange={() => setStudyCircle("yes")}
                    />
                    <span className="label-text">کی</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      readOnly={view}
                      type="radio"
                      name="attendedStudyCircle"
                      className="radio checked:bg-blue-500"
                      checked={studyCircle === "no"}
                      value="no"
                      onChange={() => setStudyCircle("no")}
                    />
                    <span className="label-text">نہیں کی</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      readOnly={view}
                      type="radio"
                      name="attendedStudyCircle"
                      className="radio checked:bg-blue-500"
                      checked={studyCircle === "leave"}
                      value="leave"
                      onChange={() => setStudyCircle("leave")}
                    />
                    <span className="label-text">رخصت</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex w-full  flex-col justify-start items-start">
              <h3 className="mb-2 block w-full text-start text-sm md:text-lg p-3">
                اعانت ادا
              </h3>

              <div className="flex items-center justify-start border border-primary p-2 rounded-lg">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      readOnly={view}
                      type="radio"
                      name="aanat"
                      className="radio checked:bg-blue-500"
                      checked={aanat === "yes"}
                      value="yes"
                      onChange={() => setAanat("yes")}
                    />
                    <span className="label-text">کی</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      readOnly={view}
                      type="radio"
                      name="aanat"
                      className="radio checked:bg-blue-500"
                      checked={aanat === "no"}
                      value="no"
                      onChange={() => setAanat("no")}
                    />
                    <span className="label-text">نہیں کی</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Rawabit1
              view={view}
              rbt1Programs={rbt1Programs}
              setRbt1Programs={setRbt1Programs}
              programsList={programsList}
            />
          </div>
          <div className="w-full">
            <Rawabit2
              view={view}
              rbt2Programs={rbt2Programs}
              setRbt2Programs={setRbt2Programs}
              programsList={programsList}
            />
          </div>
          <div className="w-full">
            <Rawabit3
              view={view}
              rbt3Programs={rbt3Programs}
              setRbt3Programs={setRbt3Programs}
              programsList={programsList}
            />
          </div>
          <div className="w-full">
            <RegularStudents view={view} />
          </div>
          <div className="w-full flex justify-start items-center">
            <h3 className="mb-2 ">تبصرہ</h3>
          </div>
          <textarea
            className="inptut border rounded-md pr-2 w-full"
            placeholder={"..."}
            label={"تبصرہ"}
            id={"comments"}
            maxLength={150}
            name={"comments"}
            type={"textarea"}
            disabled={view}
            required
          ></textarea>
          <div className="w-full flex justify-end items-center mb-5">
            {fileMode !== "view" && (
              <button
                type="submit"
                className="btn btn-primary "
                // onClick={handleSubmit}
              >
                {fileMode === "edit" ? "Update" : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </GeneralLayout>
  );
};
