import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToastState } from "../context";
import {
  CenteralActivities,
  DivisionTable,
  EveningDiary,
  ExpandParty,
  GeneralLayout,
  Library,
  Loader,
  MenTable,
  MessageDigest,
  Zaili,
} from "../components";
import { OtherActivities } from "../components/OtherActivities";
import { useEffect } from "react";
import { getData } from "./Maqam";
import { InputWithLabel } from "../components/InputWithLabel";
import instance from "../api/instrance";
import { reverseDataFormat } from "../utils";

export const Province = () => {
  // EDIT CODE START
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [division, setDivision] = useState([]);
  const [maqam, setMaqam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.date);
  }, [params]);
  const allDivision = async () => {
    try {
      setLoading(true);
      const req = await instance.get("/reports/division", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      });
      const data = req?.data?.data;
      const reqData = data?.filter((curr) => {
        const [dataMonth, dataYear] = [
          curr?.month.split("-")[1],
          curr?.month.split("-")[0],
        ];
        const [givenMonth, givenYear] = [id?.split("-")[1], id?.split("-")[0]];
        return dataMonth == givenMonth && dataYear == givenYear;
      });
      setDivision(reverseDataFormat(reqData[0]));
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    setLoading(false);
  };
  const allMaqam = async () => {
    try {
      setLoading(true);
      const req = await instance.get("/reports/maqam", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      });
      const data = req?.data?.data;
      const reqData = data?.filter((curr) => {
        const [dataMonth, dataYear] = [
          curr?.month.split("-")[1],
          curr?.month.split("-")[0],
        ];
        const [givenMonth, givenYear] = [id?.split("-")[1], id?.split("-")[0]];
        return dataMonth == givenMonth && dataYear == givenYear;
      });
      console.log(reqData);
      const finalData = reverseDataFormat(reqData[0]);
      setMaqam(finalData);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    allDivision();
    allMaqam();
  }, [id]);

  function mergeAndSum(obj1, obj2) {
    const result = {};
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
          result[key] = mergeAndSum(obj1[key], obj2[key]);
        } else {
          result[key] = (Number(obj1[key]) || 0) + (Number(obj2[key]) || 0);
        }
      } else if (obj1.hasOwnProperty(key)) {
        result[key] = obj1[key];
      } else if (obj2.hasOwnProperty(key)) {
        result[key] = obj2[key];
      }
    }
    return result;
  }
  useEffect(() => {
    Object.keys(data).forEach((i) => {
      const elem = document.getElementById(i);
      if (elem) {
        if (i.key === "ijtKarkunan-start") {
          console.log("first");
        }
        if (i === "month") {
          elem.value = data[i]?.toString()?.split("")?.slice(0, 7)?.join("");
        } else {
          if (elem.type === "checkbox") {
            elem.defaultChecked = data[i];
          } else {
            elem.value = data[i];
          }
        }
      }
    });
  }, [data]);
  useEffect(() => {
    if (Object.keys(division).length > 1 && Object.keys(maqam).length > 1) {
      setData(mergeAndSum(division, maqam));
    }
    return;
  }, [division, maqam]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const arr = [
    {
      title: "دعوتی وفود",

      placeholder: "Input 1",
    },
    {
      title: "روابط پارٹیز",

      placeholder: "Input 1",
    },
    {
      title: "نظام الصلٰتہ",

      placeholder: "Input 1",
    },
    {
      title: "شب بیداری",

      placeholder: "Input 1",
    },
    {
      title: "کوئ اور سرگرمی",

      placeholder: "Input 1",
    },
  ];
  return (
    <GeneralLayout>
      <div className="h-[calc(100vh-64.4px-64px)] overflow-hidden overflow-y-scroll w-full">
        <form
          className="flex w-full flex-col justify-center items-center p-4 font-notoUrdu"
          dir="rtl"
        >
          {/* <fieldset disabled={view} className="w-full"> */}
          <h2 className="text-2xl">جائزہ کارکردگی رپورٹ برأے صوبہ</h2>
          <div className="w-full">
            <div>
              <CenteralActivities view={view} />
            </div>
            <div className="mb-4">
              <MenTable view={view} />
            </div>
            <div className="mb-4">
              <DivisionTable view={view} />
            </div>
            <div className="mb-4">
              <Zaili view={view} />
            </div>
            <div className=" mb-4">
              <OtherActivities arr={arr} view={view} />
            </div>
            <div className=" mb-4">
              <ExpandParty view={view} />
            </div>
            <div className=" mb-4">
              <Library view={view} />
            </div>
            <div className=" mb-4">
              <MessageDigest view={view} />
            </div>
            <div className=" mb-4">
              <EveningDiary view={view} />
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

          {/* </fieldset> */}
        </form>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
