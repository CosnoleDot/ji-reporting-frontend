import React from "react";
import {
  CenteralActivities,
  DivisionTable,
  ExpandParty,
  Library,
  Zaili,
  MessageDigest,
  EveningDiary,
  MenTable,
  GeneralLayout,
  Loader,
} from "../components";
import { OtherActivities } from "../components/OtherActivities";
import { convertDataFormat, reverseDataFormat, toJson } from "../utils";
import instance from "../api/instrance";
import { InputWithLabel } from "../components/InputWithLabel";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useToastState } from "../context";
import { useEffect } from "react";
import { getData } from "./Maqam";

export const Division = () => {
  // EDIT CODE START
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.id);
  }, [params]);
  useEffect(() => {
    if (id) getData("division", id, setData, dispatch, setLoading);
    else {
      setLoading(false);
    }
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
      title: "کوءی اور سرگرمی",

      placeholder: "Input 1",
    },
  ];
  return (
    <GeneralLayout>
      <div className="h-[calc(100vh-64.4px-64px)] overflow-hidden overflow-y-scroll w-full">
        <form
          className="flex w-full flex-col justify-center items-center p-4 font-notoUrdu"
          dir="rtl"
          onSubmit={handleSubmit}
        >
          {/* <fieldset disabled={view} className="w-full"> */}
          <h2 className="text-2xl">جا ئزءکارکردگی رپورٹ (براے ڈویژن)</h2>
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
