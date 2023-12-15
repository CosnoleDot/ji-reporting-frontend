import {
  GeneralLayout,
  Loader,
  MenTableMaqam,
  ZailiActivitesMaqam,
  OtherActivitiesMaqam,
  ExpandPartyMaqam,
  LibraryMaqam,
  MessageDigestMaqam,
  EveningDiaryMaqam,
  TanzeemMaqam,
  CentralActivitiesMaqam,
  GeneralInfo,
} from "../components";
import { convertDataFormat, reverseDataFormat, toJson } from "../utils";
import instance from "../api/instrance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { HalqaContext, MeContext, useToastState } from "../context";
import { InputWithLabel } from "../components/InputWithLabel";
import { UIContext } from "../context/ui";
import { Tanzeem } from "../components/maqamReport/Tanzeem";
import { IfradiKuwat } from "../components/maqamReport/IfradiKuwat";
import { MarkaziActivities } from "../components/maqamReport/MarkaziActivities";
import ZailiActivities from "../components/maqamReport/ZailiActivities";
import { OtherActivities } from "../components/maqamReport/OtherActivities";
import { ToseeDawat } from "../components/maqamReport/ToseeDawat";
import { Library } from "../components/maqamReport/Library";
import { PaighamDigest } from "../components/maqamReport/PaighamDigest";
import { RozOShabDiary } from "../components/maqamReport/RozOShabDiary";

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
  const { loading, setLoading } = useContext(UIContext);
  const [view, setView] = useState(false);
  const location = useLocation();
  const me = useContext(MeContext);
  const navigate = useNavigate();
  const [rawabit, setRawabit] = useState({});
  const allHalqas = useContext(HalqaContext);

  const currMaqamHalqas = Array.isArray(allHalqas)
    ? allHalqas
        .filter((curr) => {
          const [dataMonth, dataYear] = [
            curr?.month?.split("-")[1],
            curr?.month?.split("-")[0],
          ];
          const [givenMonth, givenYear] = [
            id?.split("-")[1],
            id?.split("-")[0],
          ];
          return dataMonth == givenMonth && dataYear == givenYear;
        })
    : [];
  console.log(currMaqamHalqas)
  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    if (id) getData("maqam", id, setData, dispatch, setLoading);
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
        const req = await instance.put(`/reports/maqam/${id}`, jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });

        dispatch({ type: "SUCCESS", payload: req?.data?.message });
      } else {
        const req = await instance.post("/reports/maqam", jsonData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        dispatch({ type: "SUCCESS", payload: req.data?.message });
      }
      navigate("/reports");
    } catch (error) {
      dispatch({ type: "ERROR", payload: error?.response?.data?.message });
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
          id="maqam-form"
        >
          <h2 className="text-2xl">جا ئزءکارکردگی رپورٹ (براے مقام)</h2>
          <div className="w-full p-4">
          <div>
              <GeneralInfo me={me} area={"مقام"} />
            </div>
            <div className="mb-4">
              {/* <TanzeemMaqam view={view} /> */}
              <Tanzeem data={data} />
            </div>
            <div className="mb-4">
              {/* <MenTableMaqam
                view={view}
                rawabit={rawabit}
                setRawabit={setRawabit}
              /> */}
              <IfradiKuwat data={data}/>
            </div>
            <div className="mb-4">
              {/* <CentralActivitiesMaqam view={view} /> */}
              <MarkaziActivities />
            </div>
            <div className="mb-4">
              {/* <ZailiActivitesMaqam /> */}
              <ZailiActivities />
            </div>
            <div className=" mb-4">
              {/* <OtherActivitiesMaqam view={view} /> */}
              <OtherActivities />
            </div>
            <div className=" mb-4">
              {/* <ExpandPartyMaqam view={view} /> */}
              <ToseeDawat />
            </div>
            <div className=" mb-4">
              {/* <LibraryMaqam view={view} /> */}
              <Library />
            </div>
            <div className=" mb-4">
              {/* <MessageDigestMaqam view={view} /> */}
              <PaighamDigest />
            </div>
            <div className=" mb-4">
              {/* <EveningDiaryMaqam view={view} /> */}
              <RozOShabDiary />
            </div>
            <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
              <div className="w-full md:pr-0 mb-2">
                <InputWithLabel
                  readOnly={view}
                  type={"textarea"}
                  required={true}
                  placeholder={"تبصرہ"}
                  label={" تبصرہ"}
                  id={"comments"}
                  name={"comments"}
                />
              </div>
              <div className="w-full mb-2">
                <InputWithLabel
                  readOnly={view}
                  required={true}
                  label={"برائے  ماہ"}
                  placeholder={"برائے  ماہ"}
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
        </form>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
