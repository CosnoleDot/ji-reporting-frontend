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

export const LocationCountry = () => {
  const provinces = useContext(ProvinceContext);
  const maqams = useContext(MaqamContext);
  const halqas = useContext(HalqaContext);
  const ilaqas = useContext(IlaqaContext);
  const { getHalqas, getMaqams, setLoading, loading, getIlaqas } =
    useContext(UIContext);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const { dispatch } = useToastState();
  const [view, setView] = useState(
    ["province"].includes(localStorage.getItem("@type")) ? "maqam" : "halqa"
  );
  const params = useLocation();
  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};

      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }

      if (queryParams.view) setView(queryParams.view);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params]);
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
  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th className="text-center">Edit/Disable</th>
            </tr>
          </thead>
          <tbody>
            {provinces.map((province, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{province?.name}</td>

                <td className="flex justify-center items-center gap-4">
                  <button
                    disabled={loading}
                    onClick={() => {
                      setEditMode(true);
                      setId(province?._id);
                      document.getElementById("add_maqam_modal").showModal();
                      setForm({
                        country: province?.province?._id || "",
                        name: province?.name || "",
                      });
                    }}
                    className="btn"
                  >
                    <FaEdit />
                  </button>
                  <input
                    type="checkbox"
                    className="toggle toggle-error"
                    defaultChecked={province?.disabled}
                    onChange={() => {
                      handleDisable(province?._id, !province?.disabled);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="add_province_modal" className="modal">
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
              {/* if there is a button in form, it will close the modal */}
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
