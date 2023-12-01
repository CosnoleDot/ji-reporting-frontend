import React from "react";
import { DivisionTable } from "../components/maqam/DivisionTable";
import {
  CenteralActivities,
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
import { InputWithLabel } from "../components/InputWithLabel";
import { convertDataFormat, reverseDataFormat, toJson } from "../utils";
import instance from "../api/instrance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useToastState } from "../context";

export const getData = async (path, id, setData, dispatch, setLoading) => {
  setLoading(true);
  try {
    const req = await instance(`/reports/${path}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
    });
    if (req) {
      setData(reverseDataFormat(req?.data?.data));
    }
  } catch (err) {
    dispatch({ type: "ERROR", payload: err?.response?.data?.message });
  }
  setLoading(false);
};

export const Maqam = () => {
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
  }, [params]);
  useEffect(() => {
    if (id) getData("maqam", id, setData, dispatch, setLoading);
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
    try {
      if (id) {
        const req = await instance.put(`/reports/maqam/${id}`, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        dispatch({ type: "SUCCESS", payload: req.data?.message });
        navigate("/reports");
      } else {
        const req = await instance.post("/reports/maqam", jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        dispatch({ type: "SUCCESS", payload: req.data?.message });
        navigate("/reports");
      }

      console.log(req);
      e.target.reset();
    } catch (error) {
      dispatch({ type: "SUCCESS", payload: error.data?.message });
    }
  };

  return (
    <GeneralLayout>
      <div className="h-[calc(100vh-64.4px-64px)] overflow-y-scroll">
        <form
          className="flex flex-col justify-center items-center p-4 font-notoUrdu"
          dir="rtl"
          onSubmit={handleSubmit}
          id="maqam-form"
        >
          <fieldset disabled={view}>
            <h2 className="text-2xl">جا ئزءکارکردگی رپورٹ (براے مقام)</h2>
            <div className="w-full p-4">
              <div className="mb-4">
                <CenteralActivities />
              </div>
              <div className="mb-4">
                <MenTable />
              </div>
              <div className="mb-4">
                <DivisionTable />
              </div>
              <div className="mb-4">
                <Zaili />
              </div>
              <div className=" mb-4">
                <OtherActivities />
              </div>
              <div className=" mb-4">
                <ExpandParty />
              </div>
              <div className=" mb-4">
                <Library condition={false} />
              </div>
              <div className=" mb-4">
                <MessageDigest />
              </div>
              <div className=" mb-4">
                <EveningDiary />
              </div>
              <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
                <div className="w-full md:pr-0 mb-2">
                  <InputWithLabel
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
                    required={true}
                    label={"براے ماھ"}
                    placeholder={"براے ماھ"}
                    type={"month"}
                    id={"month"}
                    name={"month"}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <button disabled={loading} className="btn btn-primary">
                {id ? "Update" : "Add"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
