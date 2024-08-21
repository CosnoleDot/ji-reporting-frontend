import { useContext, useEffect, useState } from "react";
import { ProvinceContext, useToastState } from "../../context";
import instance from "../../api/instrance";
import { FaEdit } from "react-icons/fa";
import { UIContext } from "../../context/ui";
export const LocationCountry = () => {
  const provinces = useContext(ProvinceContext);
  const { setLoading, loading, getProvinces } = useContext(UIContext);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState(provinces);
  const [id, setId] = useState("");
  const { dispatch } = useToastState();

  const [form, setForm] = useState({
    name: "",
    country: "Pakistan",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const req = await instance.post("/locations/province", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      getProvinces();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      setForm({
        name: "",
        country: "",
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  const handleSubmitEdit = async () => {
    setLoading(true);
    try {
      const req = await instance.put("/locations/province/" + id, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      getProvinces();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };

  const handleDisable = async (id) => {
    setLoading(true);
    try {
   
      const req = await instance.patch(`/locations/province/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      });
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      getProvinces();
    } catch (err) {
      console.log(err);
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  useEffect(() => {
    setData(provinces);
  }, [provinces]);
  return (
    <>
      <div className="p-2 grid grid-cols-1">
        {["country"].includes(localStorage.getItem("@type")) && (
          <button
            disabled={loading}
            className="btn"
            onClick={() => {
              setForm({
                name: "",
                country: "Pakistan",
              });
              document.getElementById("add_province_modal").showModal();
              setEditMode(false);
            }}
          >
            Add Province
          </button>
        )}
      </div>
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
            {data?.map((province, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{province?.name}</td>
                <td className="flex justify-center items-center gap-4">
                  <button
                    disabled={loading}
                    onClick={() => {
                      setEditMode(true);
                      setId(province?._id);
                      document.getElementById("add_province_modal").showModal();
                      setForm({
                        country: "Pakistan",
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
          <h3 className="font-bold text-lg">Add Province</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Country</span>
              </label>
              <input
                name="country"
                type="text"
                disabled
                className="w-full input input-bordered input-primary"
                value={"Pakistan"}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Province</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter Province Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                    country: "Pakistan",
                  })
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
                id="close-province-modal"
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
