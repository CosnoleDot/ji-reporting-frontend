import { useContext, useEffect, useState } from "react";
import {
  HalqaContext,
  IlaqaContext,
  useToastState,
} from "../../context";
import { Link, useLocation } from "react-router-dom";
import instance from "../../api/instrance";
import { FaEdit } from "react-icons/fa";
import { UIContext } from "../../context/ui";

export const LocationIlaqa = () => {
  const halqas = useContext(HalqaContext);
  const ilaqas = useContext(IlaqaContext);
  const { getHalqas, getMaqams, setLoading, loading, getIlaqas } =
    useContext(UIContext);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const { dispatch } = useToastState();
  const [view, setView] = useState("halqa");
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

  const [formHalqa, setFormHalqa] = useState({
    name: "",
    parentId: "",
    unitType: "",
    parentType: "Ilaqa",
  });

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
        parentType: "Ilaqa",
        unitType: "",
      });
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
        default:
          break;
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="p-5 grid grid-cols-1">
        <button
          disabled={loading}
          onClick={() => {
            setFormHalqa({
              name: "",
              parentId: "",
              parentType: "Ilaqa",
              unitType: "",
            });
            document.getElementById("add_halqa_modal").showModal();
            setEditMode(false);
          }}
          className="btn ms-3"
        >
          Add Halqa
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table table-zebra">
          <thead className="h-10">
            <tr className="fixed mb-2 bg-slate-300 flex w-full justify-between items-start">
              <th className=" text-start"></th>
              <th className="w-full text-start">Name</th>
              <th className="w-full text-start">Ilaqa</th>
              <th className="w-full text-start">Type</th>
              <th className="w-full text-center">Edit/Disable</th>
            </tr>
          </thead>
          <tbody>
            {halqas
              ?.filter((i) => i?.parentType === "Ilaqa")
              ?.map((halqa, index) => (
                <tr
                  key={index}
                  className="flex w-full justify-between items-start"
                >
                  <th>{index + 1}</th>
                  <td className="w-full text-start">{halqa?.name}</td>
                  <td className="w-full text-start">
                    {halqa?.parentId?.name || "-"}
                  </td>
                  <td className="w-full text-start">{halqa?.unitType}</td>
                  <td className="flex w-full justify-center  items-center gap-4">
                    <button
                      disabled={loading}
                      onClick={() => {
                        setEditMode(true);
                        setId(halqa?._id);
                        document.getElementById("add_halqa_modal").showModal();
                        setFormHalqa({
                          parentId: halqa?.parentId?._id || "",
                          name: halqa?.name || "",
                          parentType: "Ilaqa",
                          unitType: "",
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

      <dialog id="add_halqa_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Halqa</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Ilaqa</span>
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
                  Select Ilaqa
                </option>
                {ilaqas
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
                <span className="text-base label-text">Halqa Name</span>
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
            <div>
              <label className="label">
                <span className="text-base label-text">Halqa Type</span>
              </label>
              <select
                className="select select-bordered w-full max-w-full"
                onChange={(e) => {
                  setFormHalqa({ ...formHalqa, unitType: e.target.value });
                }}
                value={formHalqa.unitType}
              >
                <option disabled value="">
                  Select Unit Type
                </option>
                <option value="Residential">Residential</option>
                <option value="Educational">Educational</option>
              </select>
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
