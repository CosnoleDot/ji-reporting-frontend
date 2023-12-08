import React, { useEffect, useState } from "react";
import {
  ActivityTableHalqa,
  EveningDiaryHalqa,
  ExpandPartyHalqa,
  GeneralLayout,
  LibraryHalqa,
  Loader,
  MenTableHalqa,
  OtherActivitiesHalqa,
} from "../components";
import { InputWithLabel } from "../components/InputWithLabel";
import { convertDataFormat, toJson } from "../utils";
import instance from "../api/instrance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToastState } from "../context";
import { getData } from "./Maqam";

export const Halqa = () => {
  // EDIT CODE START
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [rawabit, setRawabit] = useState({});

  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.id);
  }, [params]);
  useEffect(() => {
    if (id) {
      getData("halqa", id, setData, dispatch, setLoading);
    } else {
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
          if (elem.type === "checkbox") {
            elem.defaultChecked = data[i];
          } else {
            elem.value = data[i];
          }
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
        const req = await instance.put(`/reports/halqa/${id}`, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        dispatch({ type: "SUCCESS", payload: req?.data?.message });
        navigate("/reports");
      } else {
        const req = await instance.post("/reports/halqa", jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        dispatch({ type: "SUCCESS", payload: req.data?.message });
        navigate("/reports");
      }

      e.target.reset();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
      navigate("/reports");
    }
    setLoading(false);
  };

  return (
    <GeneralLayout>
      <div className="reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll">
        <form
          className="flex flex-col justify-center items-center p-4 font-notoUrdu"
          dir="rtl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl mb-4">کارکردگی رپورٹ براۓ حلقہ</h2>

          <MenTableHalqa
            rawabit={rawabit}
            setRawabit={setRawabit}
          />
          <ActivityTableHalqa />
          <OtherActivitiesHalqa />
          <ExpandPartyHalqa rawabit={rawabit} />
          <LibraryHalqa view={view} />
          <EveningDiaryHalqa />
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
                placeholder={"براے ماھ"}
                type={"month"}
                id={"month"}
                name={"month"}
              />
            </div>
          </div>
          <div className="w-full">
            <button disabled={loading} className="btn btn-primary">
              {id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
