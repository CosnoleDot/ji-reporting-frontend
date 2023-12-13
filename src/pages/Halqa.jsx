import { useContext, useEffect, useState } from "react";
import instance from "../api/instrance";
import {
  Activity,
  GeneralInfo,
  GeneralLayout,
  IfradiKuwat,
  Library,
  OtherActivities,
  RozOShabDiary,
  ToseeDawat,
} from "../components";
import { useToastState } from "../context";
import {
  convertDataFormat,
  handleReportSubmit,
  reverseDataFormat,
  toJson,
} from "../utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

export const Halqa = () => {
  
  const { dispatch } = useToastState();
  const [me, setMe] = useState(null);
  const [id, setId] = useState(null);
  const [view, setView] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const params = useParams();
  let navigate = useNavigate();
  const isViewPage= location.pathname?.split("/")[2];
  
  const getMe = async () => {
    try {
      const req = await instance.get("/user/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("@token")}` },
      });
      setMe(req.data.data);
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.data?.message,
      });
    }
  };
  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.id);
  }, [params]);
  const handleReportSubmit = async (e) => {
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
  useEffect(() => {
    getMe(setMe, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    if (id) {
      setLoading(true);
      try {
        const req = await instance(`/reports/halqa/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        if (req) {
          setData(reverseDataFormat(req?.data?.data));
        }
      } catch (err) {
        dispatch({ type: "ERROR", payload: err?.response?.data?.message });
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
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
  return (
    <GeneralLayout>
      <div className="reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll">
        <h2 className="block w-full text-center p-3">
          کارکردگی رپورٹ براۓ حلقہ
        </h2>
        <form
          className="flex flex-col items-center justify-start gap-5 p-3 w-full overflow-auto"
          onSubmit={handleReportSubmit}
          dir="rtl"
        >
          <GeneralInfo me={me} />
          <IfradiKuwat data={data} />
          <Activity />
          <OtherActivities />
          <ToseeDawat />
          <Library />
          <RozOShabDiary />
          <div className="w-full flex p-2">
            <label htmlFor="comments">تبصرھ</label>
            <input
              type="text"
              name="comments"
              className="border-b-2 border-dashed w-full"
              id="comments"
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
          {isViewPage !== "view" && <button type="submit">Submit</button>}
        </form>
      </div>
    </GeneralLayout>
  );
};
