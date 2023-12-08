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
} from "../components";
import { convertDataFormat, reverseDataFormat, toJson } from "../utils";
import instance from "../api/instrance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useToastState } from "../context";
import { InputWithLabel } from "../components/InputWithLabel";

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
  const [rawabit, setRawabit] = useState({});
  const [unfilledUsers, setUnfilledUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [showUnfilled, setShowUnfilled] = useState(false);

  useEffect(() => {
    const l = location.pathname?.split("/")[2];
    if (l === "view") {
      setView(true);
    }
    setId(params?.id);
    getUnfilled();
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
  const getUnfilled = async () => {
    try {
      const res = await instance.get(
        "/user/un-filled/" + params?.id + "?type=maqam",
        {
          headers: {
            Authorization: `Barrear ${localStorage.getItem("@token")}`,
          },
        }
      );
      setUnfilledUsers([...res.data.data.result]);
      setTotalUsers(res.data.data.total);
    } catch (error) {}
  };
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
          <div className="relative flex justify-between items-center w-full">
            <h2 className="text-2xl">جا ئزءکارکردگی رپورٹ (براے مقام)</h2>
            <span
              className="btn"
              onClick={() => {
                setShowUnfilled(!showUnfilled);
              }}
            >
              Total reports filled: {totalUsers - unfilledUsers.length}/
              {totalUsers}
            </span>
            {showUnfilled && (
              <div className="z-50 absolute top-[45px] left-0 w-[320px] min-h-8 max-h-[400px] overflow-hidden overflow-y-scroll rounded-lg bg-slate-200">
                {unfilledUsers?.length > 0
                  ? unfilledUsers.map((user, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-slate-300 flex flex-col lg:flex-row lg:items-center justify-end"
                      >
                        <div className="flex items-center justify-end">
                          <div dir="ltr" className="flex flex-col px-3">
                            <span className="font-semibold">{user?.name}</span>
                            <span>{user?.email}</span>
                          </div>
                          <div className="avatar">
                            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/1159/1159740.png"
                                alt="logo"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : "No Unfilled Reports"}
              </div>
            )}
          </div>
          <div className="w-full p-4">
            <div className="mb-4">
              <TanzeemMaqam view={view} />
            </div>
            <div className="mb-4">
              <MenTableMaqam
                view={view}
                rawabit={rawabit}
                setRawabit={setRawabit}
              />
            </div>
            <div className="mb-4">
              <CentralActivitiesMaqam view={view} />
            </div>
            <div className="mb-4">
              <ZailiActivitesMaqam />
            </div>
            <div className=" mb-4">
              <OtherActivitiesMaqam view={view} />
            </div>
            <div className=" mb-4">
              <ExpandPartyMaqam view={view} />
            </div>
            <div className=" mb-4">
              <LibraryMaqam view={view} />
            </div>
            <div className=" mb-4">
              <MessageDigestMaqam view={view} />
            </div>
            <div className=" mb-4">
              <EveningDiaryMaqam view={view} />
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
        </form>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
