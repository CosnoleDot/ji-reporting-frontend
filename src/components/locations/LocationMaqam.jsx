import { useContext, useEffect, useState } from "react";
import {
  HalqaContext,
  IlaqaContext,
  MaqamContext,
  ProvinceContext,
  useToastState,
} from "../../context";
import { Link, useLocation } from "react-router-dom";
import instance from "../../api/instrance";
import { FaEdit } from "react-icons/fa";
import { UIContext } from "../../context/ui";
import { Loader } from "../Loader";

export const LocationMaqam = () => {
  const provinces = useContext(ProvinceContext);
  const maqams = useContext(MaqamContext);
  const halqas = useContext(HalqaContext);
  const ilaqas = useContext(IlaqaContext);
  const { getHalqas, getMaqams, setLoading, loading, getIlaqas } =
    useContext(UIContext);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const { dispatch } = useToastState();
  const [filteredData, setFilteredData] = useState([]);
  const [view, setView] = useState("halqa");
  const params = useLocation();
  useEffect(() => {
    // Function to parse query parameters
    setLoading(true); // Set loading to true before fetching data
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};
      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }
      setView(queryParams.view || "halqa");
      if (
        queryParams.hasOwnProperty !== "halqa" &&
        Object.keys(queryParams).length == 1
      ) {
        setFilteredData(halqas);
      } else {
        if (queryParams.view) {
          if (queryParams.view === "halqa") {
            setFilteredData(halqas);
          }
          if (queryParams.view === "maqam") {
            setFilteredData(maqams);
          }
          if (queryParams.view === "ilaqa") {
            setFilteredData(ilaqas);
          }
        }
      }
      setLoading(false);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params, view]);

  const [form, setForm] = useState({
    name: "",
    province: "",
  });
  const [formHalqa, setFormHalqa] = useState({
    name: "",
    parentId: "",
    parentType: "Maqam",
  });
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const req = await instance.post("/locations/maqam", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      setForm({
        name: "",
        province: "",
      });
      await getMaqams();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  const handleSubmitHalqa = async () => {
    setLoading(true);
    try {
      const req = await instance.post("/locations/halqa", formHalqa, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      await getHalqas();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      setFormHalqa({
        name: "",
        parentId: "",
        parentType: "Maqam",
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  const handleSubmitEdit = async () => {
    setLoading(true);
    try {
      const req = await instance.put("/locations/maqam/" + id, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      await getMaqams();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  const handleSubmitHalqaEdit = async () => {
    setLoading(true);
    try {
      const req = await instance.put("/locations/halqa/" + id, formHalqa, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      await getHalqas();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  const handleDisable = async (id, disabled) => {
    setLoading(true);
    try {
      await instance.patch(
        `/locations/${view}/disable-location/${id}`,
        { disabled },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        }
      );
      switch (view) {
        case "halqa":
          getHalqas();
          break;
        case "maqam":
          getMaqams();
          break;
        case "ilaqa":
          getIlaqas();
          break;
        default:
          break;
      }
    } catch (err) {
      // dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
  };
  const handleSearch = (value) => {
    if (view === "halqa") {
      const filteredHalqa = halqas
        ?.map((halqa) => halqa)
        .filter(
          (hal) =>
            hal?.name.toLowerCase().includes(value.toLowerCase()) ||
            hal?.parentId?.name.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredData(filteredHalqa);
    } else if (view === "maqam") {
      const filteredMaqams = maqams
        ?.map((maqam) => maqam)
        .filter(
          (maq) =>
            maq?.name.toLowerCase().includes(value.toLowerCase()) ||
            maq?.province?.name.toLowerCase().includes(value.toLowerCase())
        );

      setFilteredData(filteredMaqams);
    } else if (view === "ilaqa") {
      const filteredHalqa = ilaqas
        ?.map((ilaqa) => ilaqa)
        .filter(
          (ila) =>
            ila?.name.toLowerCase().includes(value.toLowerCase()) ||
            ila?.maqam?.name.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredData(filteredHalqa);
    }
  };
  useEffect(() => {
    console.log(window.location.href, "view");
  }, [view]);
  return (
    <>
      <div
        className={`p-2 grid ${
          ["province"].includes(localStorage.getItem("@type"))
            ? "grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {["province"].includes(localStorage.getItem("@type")) && (
          <button
            disabled={loading}
            className="btn"
            onClick={() => {
              setForm({
                name: "",
                province: "",
              });
              document.getElementById("add_maqam_modal").showModal();
              setEditMode(false);
            }}
          >
            Add Maqam
          </button>
        )}
        {["maqam"].includes(localStorage.getItem("@type")) &&
          view === "ilaqa" && (
            <button
              disabled={loading}
              className="btn"
              onClick={() => {
                setForm({
                  name: "",
                  maqam: "",
                });
                document.getElementById("add_maqam_modal").showModal();
                setEditMode(false);
              }}
            >
              Add Ilaqa
            </button>
          )}
        {view !== "ilaqa" && (
          <button
            disabled={loading}
            onClick={() => {
              setFormHalqa({
                name: "",
                parentId: "",
                parentType: "Maqam",
              });
              document.getElementById("add_halqa_modal").showModal();
              setEditMode(false);
            }}
            className="btn ms-3"
          >
            Add Halqa
          </button>
        )}
      </div>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow p-2"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div role="tablist" className="w-full flex justify-between items-center">
        {["country", "province"].includes(localStorage.getItem("@type")) && (
          <Link
            to={"?active=maqam&view=maqam"}
            role="tab"
            className={`tab w-full ${view === "maqam" ? "tab-active" : ""}`}
          >
            Maqam
          </Link>
        )}
        <Link
          to={"?active=maqam&view=halqa"}
          role="tab"
          className={`tab w-full ${view === "halqa" ? "tab-active" : ""}`}
        >
          Halqa
        </Link>
        <Link
          to={"?active=maqam&view=ilaqa"}
          role="tab"
          className={`tab w-full ${view === "ilaqa" ? "tab-active" : ""}`}
        >
          Ilaqa
        </Link>
      </div>

      {view === "maqam" && (
        <div className="w-full overflow-x-auto">
          <table className="table table-zebra">
            <thead className="h-10">
              <tr className="fixed mb-2 bg-slate-300 flex w-full justify-between items-start">
                <th className=" text-start"></th>
                <th className="w-full text-start">Name</th>
                <th className="w-full text-center">Province</th>
                <th className="w-full text-center">Edit/Disable</th>
              </tr>
            </thead>
            <tbody className="mt-5">
              {filteredData.map((maqam, index) => (
                <tr
                  key={index}
                  className="flex w-full justify-between items-start"
                >
                  <th>{index + 1}</th>
                  <td className="w-full text-start">{maqam?.name}</td>
                  <td className="w-full text-center">
                    {maqam?.province?.name || "-"}
                  </td>
                  <td className="flex  w-full justify-center items-center gap-4">
                    <button
                      disabled={loading}
                      onClick={() => {
                        setEditMode(true);
                        setId(maqam?._id);
                        document.getElementById("add_maqam_modal").showModal();
                        setForm({
                          province: maqam?.province?._id || "",
                          name: maqam?.name || "",
                        });
                      }}
                      className="btn"
                    >
                      <FaEdit />
                    </button>
                    <input
                      type="checkbox"
                      className="toggle toggle-error"
                      defaultChecked={maqam?.disabled}
                      onChange={() => {
                        handleDisable(maqam?._id, !maqam?.disabled);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === "halqa" && (
        <>
          {loading ? (
            <>
              hello
              <Loader />
            </>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="table table-zebra">
                <thead className="h-10">
                  <tr className="fixed mb-2 bg-slate-300 flex w-full justify-between items-start">
                    <th className="text-start"></th>
                    <th className="w-full text-start">Name</th>
                    <th className="w-full text-start">Ilaqa/Maqam</th>
                    <th className="w-full text-center">Edit/Disable</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData
                    .filter(
                      (i) =>
                        i?.parentType === "Maqam" || i?.parentType === "Ilaqa"
                    )
                    .map((halqa, index) => (
                      <tr
                        key={index}
                        className="flex w-full justify-between items-start"
                      >
                        <th>{index + 1}</th>
                        <td className="w-full text-start">{halqa?.name}</td>
                        <td className="w-full text-start">{`Halqa of ${
                          halqa?.parentType
                        }  ${
                          halqa?.parentId?.maqam?.name
                            ? halqa?.parentId?.maqam?.name
                            : halqa?.parentId?.name
                        } (${
                          halqa?.parentId?.maqam?.province?.name
                            ? halqa?.parentId?.maqam?.province?.name
                            : halqa?.parentId?.province?.name
                        })`}</td>
                        <td className="flex w-full justify-center  items-center gap-4">
                          <button
                            disabled={loading}
                            onClick={() => {
                              setEditMode(true);
                              setId(halqa?._id);
                              document
                                .getElementById("add_halqa_modal")
                                .showModal();
                              setFormHalqa({
                                parentId: halqa?.parentId?._id || "",
                                name: halqa?.name || "",
                                parentType: "Maqam",
                              });
                            }}
                            className="btn"
                          >
                            <FaEdit />
                          </button>
                          <input
                            type="checkbox"
                            className="toggle toggle-error"
                            defaultChecked={halqa?.disabled}
                            onChange={() => {
                              handleDisable(halqa?._id, !halqa?.disabled);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {view === "ilaqa" && (
        <div className="w-full overflow-x-auto">
          <table className="table table-zebra">
            <thead className="h-10">
              <tr className="fixed mb-2 bg-slate-300 flex w-full justify-between items-start">
                <th className=" text-start"></th>
                <th className="w-full text-start">Name</th>
                <th className="w-full text-start">Maqam</th>
                <th className="w-full text-center">Edit/Disable</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((ilaqa, index) => (
                <tr
                  key={index}
                  className="flex w-full justify-between items-start"
                >
                  <th>{index + 1}</th>
                  <td className="w-full text-start">{ilaqa?.name}</td>
                  <td className="w-full text-start">
                    Maqam Of {ilaqa?.maqam?.name || "-"} ({" "}
                    {ilaqa?.maqam?.province?.name})
                  </td>
                  <td className="flex  w-full justify-center items-center gap-4">
                    <button
                      disabled={loading}
                      onClick={() => {
                        setEditMode(true);
                        setId(ilaqa?._id);
                        document.getElementById("add_halqa_modal").showModal();
                        setFormHalqa({
                          parentId: ilaqa?.parentId?._id || "",
                          name: ilaqa?.name || "",
                          parentType: "Maqam",
                        });
                      }}
                      className="btn"
                    >
                      <FaEdit />
                    </button>
                    <input
                      type="checkbox"
                      className="toggle toggle-error"
                      defaultChecked={ilaqa?.disabled}
                      onChange={() => {
                        handleDisable(ilaqa?._id, !ilaqa?.disabled);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <dialog id="add_maqam_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Maqam</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Province</span>
              </label>
              <select
                name="province"
                required
                value={form.province}
                onChange={(e) => setForm({ ...form, province: e.target.value })}
                className="w-full input input-bordered input-primary"
              >
                <option value="" disabled>
                  Select Province
                </option>
                {provinces
                  .filter((i) => !i?.disabled)
                  .map((i, index) => (
                    <option value={i?._id} key={index}>
                      {i?.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Maqam</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter Maqam Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
          </div>
          <div className="modal-action">
            {editMode ? (
              <button
                disabled={loading}
                className="btn"
                onClick={handleSubmitEdit}
              >
                Update
              </button>
            ) : (
              <button disabled={loading} className="btn" onClick={handleSubmit}>
                Add
              </button>
            )}
            <form method="dialog">
              <button
                disabled={loading}
                id="close-maqam-modal"
                className="btn ms-3"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="add_halqa_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Halqa</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Maqam</span>
              </label>
              <select
                name="maqam"
                required
                value={formHalqa.parentId}
                onChange={(e) =>
                  setFormHalqa({ ...formHalqa, parentId: e.target.value })
                }
                className="w-full input input-bordered input-primary"
              >
                <option value="" disabled>
                  Select Maqam
                </option>
                {maqams
                  .filter((i) => !i?.disabled)
                  .map((i, index) => (
                    <option value={i?._id} key={index}>
                      {i?.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Halqa</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter Halqa Name"
                value={formHalqa.name}
                onChange={(e) =>
                  setFormHalqa({ ...formHalqa, name: e.target.value })
                }
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
          </div>
          <div className="modal-action">
            {editMode ? (
              <button
                disabled={loading}
                className="btn"
                onClick={handleSubmitHalqaEdit}
              >
                Update
              </button>
            ) : (
              <button
                disabled={loading}
                className="btn"
                onClick={handleSubmitHalqa}
              >
                Add
              </button>
            )}
            <form method="dialog">
              <button
                disabled={loading}
                id="close-maqam-modal"
                className="btn ms-3"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
