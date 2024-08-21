import { useContext, useEffect, useState } from "react";
import {
  HalqaContext,
  IlaqaContext,
  MaqamContext,
  ProvinceContext,
  ViewDetails,
  useToastState,
} from "../../context";
import { Link, useLocation } from "react-router-dom";
import instance from "../../api/instrance";
import { FaEdit } from "react-icons/fa";
import { UIContext } from "../../context/ui";
import { FcViewDetails } from "react-icons/fc";
import { Loader } from "../Loader";

export const LocationMaqam = () => {
  const provinces = useContext(ProvinceContext);
  const maqams = useContext(MaqamContext);
  const halqas = useContext(HalqaContext);
  const ilaqas = useContext(IlaqaContext);
  const areaDetails = useContext(ViewDetails);
  const {
    getHalqas,
    getMaqams,
    setLoading,
    loading,
    getIlaqas,
    getAreaDetails,
  } = useContext(UIContext);

  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const { dispatch } = useToastState();
  const [filteredData, setFilteredData] = useState([]);
  const [view, setView] = useState("halqa");
  const [isIlaqa, setIsIlaqa] = useState(false);
  const params = useLocation();
  const [muntakhib, setMuntakhib] = useState(ilaqas?.length > 0 ? true : false);

  useEffect(() => {
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
        Object.keys(queryParams).length === 1
      ) {
        setFilteredData(halqas);
      } else {
        if (queryParams.view) {
          if (queryParams.view === "halqa") {
            if (queryParams.active === "maqam") {
              let maqamHalqas = halqas?.filter(
                (i) => i.parentType === "Ilaqa" || i?.parentType === "Maqam"
              );
              setFilteredData(maqamHalqas);
            } else if (queryParams.active === "division") {
              let divHalqas = halqas?.filter(
                (i) => i.parentType === "Tehsil" || i?.parentType === "Division"
              );
              setFilteredData(divHalqas);
            }
            else{
              setFilteredData(halqas)
            }
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
    // eslint-disable-next-line
  }, [params, view, halqas, maqams, ilaqas]);

  useEffect(() => {
    if (view) {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};
      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }
      if (view === "halqa") {
        if (queryParams.active === "maqam") {
          let maqamHalqas = halqas?.filter(
            (i) => i.parentType === "Ilaqa" || i?.parentType === "Maqam"
          );
          setFilteredData(maqamHalqas);
        } else if (queryParams.active === "division") {
          let divHalqas = halqas?.filter(
            (i) => i.parentType === "Tehsil" || i?.parentType === "Division"
          );
          setFilteredData(divHalqas);
        }
        else{
          setFilteredData(halqas)
        }
      }
      if (view === "maqam") {
        setFilteredData(maqams);
      }
      if (view === "ilaqa") {
        setFilteredData(ilaqas);
      }
    }
  }, [halqas, maqams, ilaqas]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [form, setForm] = useState({
    name: "",
    province: "",
  });

  const [ilaqaForm, setIlaqaForm] = useState({
    name: "",
    maqam: "",
  });

  const [formHalqa, setFormHalqa] = useState({
    name: "",
    parentId: "",
    parentType: isIlaqa ? "Ilaqa" : "Maqam",
    unitType: "",
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
      dispatch({ type: "SUCCESS", payload: req?.data?.message });
      setForm({
        name: "",
        province: "",
      });
      await getMaqams();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err?.response?.data?.message });
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
      dispatch({ type: "SUCCESS", payload: req?.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err?.response?.data?.message });
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
      dispatch({ type: "SUCCESS", payload: req?.data?.message });
      setFormHalqa({
        name: "",
        parentId: "",
        parentType: isIlaqa ? "Ilaqa" : "Maqam",
        unitType: "",
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err?.response?.data?.message });
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
      dispatch({ type: "SUCCESS", payload: req?.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err?.response?.data?.message });
    }
    setLoading(false);
  };

  const handleSubmitIlaqa = async () => {
    setLoading(true);
    try {
      const req = await instance.post("/locations/ilaqa", ilaqaForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "SUCCESS", payload: req?.data?.message });
      setIlaqaForm({
        name: "",
        maqam: "",
      });
      await getIlaqas();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err?.response?.data?.message });
    }
    setLoading(false);
  };

  const handleSubmitEditIlaqa = async () => {
    setLoading(true);
    try {
      const req = await instance.put("/locations/ilaqa/" + id, ilaqaForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      setIlaqaForm({
        name: "",
        maqam: "",
      });
      await getIlaqas();
      dispatch({ type: "SUCCESS", payload: req?.data?.message });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err?.response?.data?.message });
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
      const getAreas = () => {
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
      };
      getAreas();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err?.response?.data?.message });
    }
    setLoading(false);
  };

  const handleSearch = (value) => {
    setValue(value);
    if (view === "halqa") {
      const filteredHalqa = halqas?.filter((hal) => {
        const halName = hal?.name?.toLowerCase() || "";
        const parentName = hal?.parentId?.name?.toLowerCase() || "";
        const searchValue = value.toLowerCase();

        return (
          halName.includes(searchValue) || parentName.includes(searchValue)
        );
      });

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
      const filteredIlaqa = ilaqas
        ?.map((ilaqa) => ilaqa)
        .filter(
          (ila) =>
            ila?.name.toLowerCase().includes(value.toLowerCase()) ||
            ila?.maqam?.name.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredData(filteredIlaqa);
    }
    setCurrentPage(1); // Reset to the first page after search
  };

  return (
    <>
      <div
        className={`p-2 grid ${
          ["province", "country", "division", "maqam"].includes(
            localStorage.getItem("@type")
          )
            ? "grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {["province", "country"].includes(localStorage.getItem("@type")) && (
          <button
            disabled={loading}
            className="btn capitalize p-[8px]"
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
        {["maqam", "province", "country"].includes(
          localStorage.getItem("@type")
        ) &&
          view === "ilaqa" && (
            <button
              disabled={loading}
              className="btn capitalize p-[8px]"
              onClick={() => {
                setIlaqaForm({
                  name: "",
                  maqam: "",
                });
                document.getElementById("add_ilaqa_modal").showModal();
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
                parentType: isIlaqa ? "Ilaqa" : "Maqam",
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
            onClick={() => setCurrentPage(1)}
          >
            مقام
          </Link>
        )}
        <Link
          to={"?active=maqam&view=halqa"}
          role="tab"
          className={`tab w-full ${view === "halqa" ? "tab-active" : ""}`}
          onClick={() => setCurrentPage(1)}
        >
          حلقہ
        </Link>
        {muntakhib && (
          <Link
            to={"?active=maqam&view=ilaqa"}
            role="tab"
            className={`tab w-full ${view === "ilaqa" ? "tab-active" : ""}`}
            onClick={() => setCurrentPage(1)}
          >
            علاقہ/Zone
          </Link>
        )}
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
              {paginatedData?.length > 0 ? (
                paginatedData?.map((maqam, index) => (
                  <tr
                    key={maqam?._id}
                    className="flex w-full justify-between items-start"
                  >
                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
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
                          document
                            .getElementById("add_maqam_modal")
                            .showModal();
                          setForm({
                            province: maqam?.province?._id || "",
                            name: maqam?.name || "",
                          });
                        }}
                        className="btn capitalize "
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
                ))
              ) : (
                <div>No Report Found</div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {view === "ilaqa" && (
        <div className="w-full overflow-x-auto">
          <table className="table table-zebra">
            <thead className="h-10">
              <tr className="fixed mb-2 bg-slate-300 flex w-full justify-between items-start">
                <th className=" text-start"></th>
                <th className="w-full text-start">Name</th>
                <th className="w-full text-start">Area Details</th>
                <th className="w-full text-center">Edit/Disable</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.length > 0 ? (
                paginatedData?.map((ilaqa, index) => (
                  <tr
                    key={ilaqa?._id}
                    className="flex w-full justify-between items-center"
                  >
                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                    <td className="w-full text-start">{ilaqa?.name}</td>
                    <td className="w-full text-start">
                      <div
                        onClick={() => {
                          getAreaDetails(ilaqa);
                        }}
                      >
                        <FcViewDetails className="cursor-pointer text-2xl" />
                      </div>
                    </td>
                    <td className="flex  w-full justify-center items-center gap-4">
                      <button
                        disabled={loading}
                        onClick={() => {
                          setEditMode(true);
                          setId(ilaqa?._id);
                          document
                            .getElementById("add_ilaqa_modal")
                            .showModal();
                          setIlaqaForm({
                            maqam: ilaqa?.maqam?._id || "",
                            name: ilaqa?.name,
                          });
                        }}
                        className="btn capitalize "
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
                ))
              ) : (
                <div>No Report Found</div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {view === "halqa" && (
        <div className="w-full overflow-x-auto">
          <table className="table table-zebra">
            <thead className="h-10">
              <tr className="fixed mb-2 bg-slate-300 flex w-full justify-between items-start">
                <th className="text-start"></th>
                <th className="w-full text-start">Name</th>
                <th className="w-full text-start">Area Details</th>
                <th className="w-full text-center">Edit/Disable</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.length > 0 ? (
                paginatedData
                  ?.filter(
                    (i) =>
                      i?.parentType === "Maqam" || i?.parentType === "Ilaqa"
                  )
                  ?.map((halqa, index) => (
                    <tr
                      key={halqa?._id}
                      className="flex w-full justify-between items-center"
                    >
                      <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                      <td className="w-full text-start">{halqa?.name}</td>
                      <td className="w-full text-start">
                        <div
                          onClick={() => {
                            getAreaDetails(halqa);
                          }}
                        >
                          <FcViewDetails className="cursor-pointer text-2xl" />
                        </div>
                      </td>
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
                              parentType: isIlaqa ? "Ilaqa" : "Maqam",
                            });
                          }}
                          className="btn capitalize "
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
                  ))
              ) : (
                <div>No Report Found</div>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}

      {value === "" && (
        <div className="flex w-full px-4 justify-between items-center mt-4">
          <button
            className="btn capitalize p-[8px]"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn capitalize p-[8px]"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
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
                  ?.filter((i) => !i?.disabled)
                  ?.map((i, index) => (
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
                className="btn capitalize p-[8px]"
                onClick={handleSubmitEdit}
              >
                Update
              </button>
            ) : (
              <button
                disabled={loading}
                className="btn capitalize p-[8px]"
                onClick={handleSubmit}
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

      <dialog id="add_halqa_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Halqa</h3>
          <div className="space-y-4">
            <div className="flex">
              {ilaqas?.length > 0 && (
                <label className="label cursor-pointer gap-3">
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-red-500"
                    checked={isIlaqa}
                    onChange={() => {
                      setIsIlaqa(!isIlaqa);
                      setFormHalqa({ ...formHalqa, parentType: "Ilaqa" });
                    }}
                  />
                  <span className="label-text">Ilaqa Halqa</span>
                </label>
              )}
              <label className="label cursor-pointer gap-3">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                  checked={!isIlaqa}
                  onChange={() => {
                    setIsIlaqa(!isIlaqa);
                    setFormHalqa({ ...formHalqa, parentType: "Maqam" });
                  }}
                />
                <span className="label-text">Maqam Halqa</span>
              </label>
            </div>
            {isIlaqa ? (
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
                    ?.filter((i) => !i?.disabled)
                    .map((i, index) => (
                      <option value={i?._id} key={index}>
                        {i?.name}
                      </option>
                    ))}
                </select>
              </div>
            ) : (
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
                    ?.filter((i) => !i?.disabled)
                    ?.map((i, index) => (
                      <option value={i?._id} key={index}>
                        {i?.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
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
                className="btn capitalize"
                onClick={handleSubmitHalqaEdit}
              >
                Update
              </button>
            ) : (
              <button
                disabled={loading}
                className="btn capitalize "
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
      <dialog id="add_ilaqa_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Ilaqa</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Maqam</span>
              </label>
              <select
                name="ilaqa"
                required
                value={ilaqaForm.maqam}
                onChange={(e) =>
                  setIlaqaForm({ ...ilaqaForm, maqam: e.target.value })
                }
                className="w-full input input-bordered input-primary"
              >
                <option value="" disabled>
                  Select Maqam
                </option>
                {maqams
                  ?.filter((i) => !i?.disabled)
                  ?.map((i, index) => (
                    <option value={i?._id} key={index}>
                      {i?.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Ilaqa</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter Ilaqa Name"
                value={ilaqaForm.name}
                onChange={(e) =>
                  setIlaqaForm({ ...ilaqaForm, name: e.target.value })
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
                className="btn capitalize p-[8px]"
                onClick={handleSubmitEditIlaqa}
              >
                Update
              </button>
            ) : (
              <button
                disabled={loading}
                className="btn capitalize p-[8px]"
                onClick={handleSubmitIlaqa}
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
      <dialog id="area_details" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Details of the area</h3>
          <div className="w-full  flex flex-col justify-between items-start text-left gap-4  flex-wrap">
            <div className="w-full flex justify-start items-center gap-5">
              <h5>Name:</h5>
              <h4 className="text-gray-400 font-bold">{areaDetails?.name}</h4>
              <h4 className="text-gray-400 font-semibold">
                {areaDetails?.parentType === "Ilaqa" ||
                areaDetails?.parentType === "Tehsil" ||
                areaDetails?.parentType === "Division" ||
                areaDetails?.parentType === "Maqam"
                  ? "(Halqa)"
                  : !areaDetails?.parentId && areaDetails?.maqam
                  ? "(Ilaqa)"
                  : areaDetails?.country
                  ? "(Province)"
                  : `(${areaDetails?.areaType})`}
              </h4>
            </div>
            <div className="w-full flex justify-start items-center gap-5">
              {areaDetails?.parentType
                ? areaDetails?.parentType + ":"
                : areaDetails?.maqam
                ? "Maqam"
                : ""}
              <h4 className="text-gray-400 font-bold">
                {areaDetails?.parentType === "Ilaqa"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.parentType === "Maqam"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.parentType === "Tehsil"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.parentType === "Division"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.maqam?.name}
              </h4>
            </div>
            {(areaDetails?.parentType === "Tehsil" ||
              areaDetails?.parentType === "Division") && (
              <>
                <div className="w-full flex justify-start items-center gap-5">
                  <h5> District:</h5>
                  <h4 className="text-gray-400 font-bold">
                    {areaDetails?.parentId?.district
                      ? areaDetails?.parentId?.district?.name
                      : "Not a District aera"}
                  </h4>
                </div>
                <div className="w-full flex justify-start items-center gap-5">
                  <h5>Division:</h5>
                  <h4 className="text-gray-400 font-bold">
                    {areaDetails?.parentId?.district
                      ? areaDetails?.parentId?.district?.division?.name
                      : areaDetails?.division?.name}
                  </h4>
                </div>
              </>
            )}
            {areaDetails?.parentType === "Ilaqa" && (
              <div className="w-full flex justify-start items-center gap-5">
                <h5>Maqam:</h5>
                <h4 className="text-gray-400 font-bold">
                  {areaDetails?.parentType === "Ilaqa"
                    ? areaDetails?.parentId?.maqam?.name
                    : ""}
                </h4>
              </div>
            )}
            {!areaDetails?.country && (
              <div className="w-full flex justify-start items-center gap-5">
                <h4>Province:</h4>
                <h4 className="text-gray-400 font-bold">
                  {areaDetails?.parentType === "Ilaqa"
                    ? areaDetails?.parentId?.maqam?.province?.name
                    : areaDetails?.parentType === "Maqam"
                    ? areaDetails?.parentId?.province?.name
                    : areaDetails?.parentType === "Tehsil"
                    ? areaDetails?.parentId?.district?.division?.province?.name
                    : areaDetails?.parentType === "Division"
                    ? areaDetails?.parentId?.province?.name
                    : areaDetails?.province
                    ? areaDetails?.province?.name
                    : ""}
                </h4>
              </div>
            )}
            <div className="w-full flex justify-start items-center gap-5">
              <h5>Country:</h5>
              <h4 className="text-gray-400 font-bold">Pakistan</h4>
            </div>
          </div>
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              <div className=" w-full flex justify-end gap-3 items-center">
                <button
                  id="close-details-modal"
                  className="btn ms-3 capitalize"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
