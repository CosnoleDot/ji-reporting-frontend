import { useContext, useEffect, useState } from "react";
import {
  DistrictContext,
  DivisionContext,
  HalqaContext,
  MeContext,
  ProvinceContext,
  TehsilContext,
  useToastState,
} from "../../context";
import { Link, useLocation } from "react-router-dom";
import instance from "../../api/instrance";
import { FaEdit } from "react-icons/fa";
import { UIContext } from "../../context/ui";
import { Loader } from "../Loader";

export const LocationDivision = () => {
  const provinces = useContext(ProvinceContext);
  const me = useContext(MeContext);
  const tehsils = useContext(TehsilContext);
  const divisions = useContext(DivisionContext);
  const halqas = useContext(HalqaContext);
  const districts = useContext(DistrictContext);
  const [filteredData, setFilteredData] = useState(halqas);
  const [isDivision, setIsDivision] = useState(false);
  const {
    getHalqas,
    getDivisions,
    getDistricts,
    getTehsils,
    loading,
    setLoading,
  } = useContext(UIContext);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const { dispatch } = useToastState();
  const [view, setView] = useState(
    ["country", "province", "maqam"].includes(localStorage.getItem("@type"))
      ? "province"
      : "halqa"
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
      if (
        queryParams.hasOwnProperty !== "halqa" &&
        Object.keys(queryParams).length === 1
      ) {
        setFilteredData(halqas);
      } else {
        setView(queryParams.view);
        if (queryParams.view) {
          if (queryParams.view === "halqa") {
            setFilteredData(halqas);
          }
          if (queryParams.view === "district") {
            setFilteredData(districts);
          }
          if (queryParams.view === "tehsil") {
            setFilteredData(tehsils);
          }
          if (queryParams.view === "division") {
            setFilteredData(divisions);
          }
        }
      }
    };
    console.log("2nd");

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params, view, districts, divisions, halqas, tehsils]);
  const [form, setForm] = useState({
    name: "",
    province: "",
  });
  const [formDistrict, setFormDistrict] = useState({
    name: "",
    division: "",
  });
  const [formTehsil, setFormTehsil] = useState({
    name: "",
    district: "",
  });
  const [formHalqa, setFormHalqa] = useState({
    parentId: "",
    name: "",
    parentType: "",
    unitType: "",
  });

  // *****************Division***********************
  const handleSubmit = async () => {
    try {
      const req = await instance.post("/locations/division", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      await getDivisions();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      setForm({
        name: "",
        province: "",
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
  };
  const handleSubmitEdit = async () => {
    setLoading(true);
    try {
      const req = await instance.put("/locations/division/" + id, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      await getDivisions();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      console.log(err);
      setLoading(false);
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  // *********************District**************************
  const handleSubmitDistrict = async () => {
    try {
      const req = await instance.post("/locations/district", formDistrict, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      await getDistricts();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      setFormDistrict({
        name: "",
        division: "",
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
  };
  const handleSubmitDistrictEdit = async () => {
    setLoading(true);
    try {
      const req = await instance.put(
        "/locations/district/" + id,
        formDistrict,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      await getDistricts();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      console.log(err);
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  // ***********************Teshsil*************************
  const handleSubmitTehsil = async () => {
    try {
      const req = await instance.post("/locations/tehsil", formTehsil, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      await getTehsils();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      setFormTehsil({
        name: "",
        district: "",
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
  };
  const handleSubmitTehsilEdit = async () => {
    setLoading(true);
    try {
      const req = await instance.put("/locations/tehsil/" + id, formTehsil, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
          "Content-Type": "application/json",
        },
      });
      await getTehsils();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      console.log(err);
      setLoading(false);
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  // **************************Halqa******************* *
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
        parentId: "",
        name: "",
        parentType: "",
        unitType: "",
      });
    } catch (err) {
      setLoading(false);
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
      setFilteredData(halqas);
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      console.log(err);
      setLoading(false);
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  // ************************Disable call *******************
  const handleDisable = async (id, disable) => {
    const disabled = !disable;
    setLoading(true);
    try {
      let req = await instance.patch(
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
        case "tehsil":
          getTehsils();
          break;
        case "district":
          getDistricts();
          break;
        case "division":
          getDivisions();
          break;
        default:
          break;
      }
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      setLoading(false);
      console.log(err);
      dispatch({ type: "ERROR", payload: err.response.data.message });
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
    } else if (view === "district") {
      const filteredDistricts = districts
        ?.map((district) => district)
        .filter(
          (dis) =>
            dis?.name.toLowerCase().includes(value.toLowerCase()) ||
            dis?.province?.name.toLowerCase().includes(value.toLowerCase())
        );

      setFilteredData(filteredDistricts);
    } else if (view === "tehsil") {
      const filteredTehsils = tehsils
        ?.map((tehsil) => tehsil)
        .filter(
          (teh) =>
            teh?.name.toLowerCase().includes(value.toLowerCase()) ||
            teh?.maqam?.name.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredData(filteredTehsils);
    } else if (view === "division") {
      const filteredDivisions = divisions
        ?.map((div) => div)
        .filter(
          (div) =>
            div?.name.toLowerCase().includes(value.toLowerCase()) ||
            div?.maqam?.name.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredData(filteredDivisions);
    }
  };
  return (
    <>
      <div
        className={`p-5 grid ${
          ["province"].includes(localStorage.getItem("@type"))
            ? "grid-cols-4"
            : "grid-cols-3"
        }`}
      >
        {["province"].includes(localStorage.getItem("@type")) && (
          <button
            className="btn"
            onClick={() => {
              setForm({
                name: "",
                province: "",
              });
              document.getElementById("add_division_modal").showModal();
              setEditMode(false);
            }}
          >
            Add Division
          </button>
        )}
        <button
          className="btn"
          onClick={() => {
            setFormDistrict({
              name: "",
              division: "",
            });
            document.getElementById("add_district_modal").showModal();
            setEditMode(false);
          }}
        >
          Add District
        </button>
        <button
          className="btn"
          onClick={() => {
            setFormTehsil({
              name: "",
              district: "",
            });
            document.getElementById("add_tehsil_modal").showModal();
            setEditMode(false);
          }}
        >
          Add Tehsil
        </button>
        <button
          onClick={() => {
            setFormHalqa({
              parentId: "",
              name: "",
              parentType: "",
              unitType: "",
            });
            document.getElementById("add_halqa_modal").showModal();
            setEditMode(false);
          }}
          className="btn"
        >
          Add Halqa
        </button>
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
            to={"?active=division&view=division"}
            role="tab"
            className={`tab w-full ${view === "division" ? "tab-active" : ""}`}
          >
            Division
          </Link>
        )}
        <Link
          to={"?active=division&view=district"}
          role="tab"
          className={`tab w-full ${view === "district" ? "tab-active" : ""}`}
        >
          District
        </Link>
        <Link
          to={"?active=division&view=tehsil"}
          role="tab"
          className={`tab w-full ${view === "tehsil" ? "tab-active" : ""}`}
        >
          Tehsil
        </Link>
        <Link
          to={"?active=division&view=halqa"}
          role="tab"
          className={`tab w-full ${view === "halqa" ? "tab-active" : ""}`}
        >
          Halqa
        </Link>
      </div>
      {view === "division" && (
        <div className="w-full overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Province</th>
                <th className="text-center">Edit/Disable</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((division, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{division?.name}</td>
                  <td>{division?.province?.name || "-"}</td>
                  <td className="flex justify-center gap-4 items-center">
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setId(division?._id);
                        document
                          .getElementById("add_division_modal")
                          .showModal();
                        setForm({
                          province: division?.province?._id || "",
                          name: division?.name || "",
                        });
                      }}
                      className="btn"
                    >
                      <FaEdit />
                    </button>
                    <input
                      type="checkbox"
                      className="toggle toggle-error"
                      defaultChecked={division?.disabled}
                      onChange={() => {
                        handleDisable(division?._id, !division?.disabled);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {view === "tehsil" && (
        <div className="w-full overflow-x-auto">
          <table className="table table-zebra">
            <thead className="h-10">
              <tr className="fixed mb-2 bg-slate-300 flex w-full justify-between items-start">
                <th className=" text-start"></th>
                <th className="w-full text-start">Name</th>
                <th className="w-full text-start">District</th>
                <th className="w-full text-center">Edit/Disable</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 1 ? (
                filteredData?.map((tehsil, index) => (
                  <tr
                    key={index}
                    className="flex w-full justify-between items-start"
                  >
                    <th>{index + 1}</th>
                    <td className="w-full text-start">{tehsil?.name}</td>
                    <td className="w-full text-start">{` ${
                      tehsil?.district?.name
                    }( District  of ${
                      tehsil?.district?.division?.name
                        ? tehsil?.district?.division?.name
                        : tehsil?.parentId?.name
                    }) (${tehsil?.district?.division?.province?.name})`}</td>
                    <td className="flex w-full justify-center items-center gap-4">
                      <button
                        onClick={() => {
                          setEditMode(true);
                          setId(tehsil?._id);
                          document
                            .getElementById("add_tehsil_modal")
                            .showModal();
                          setFormTehsil({
                            district: tehsil?.district?._id || "",
                            name: tehsil?.name || "",
                          });
                        }}
                        className="btn"
                      >
                        <FaEdit />
                      </button>
                      <input
                        type="checkbox"
                        className="toggle toggle-error"
                        defaultChecked={tehsil?.disabled}
                        onChange={() => {
                          handleDisable(tehsil?._id, !tehsil?.disabled);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <div>
                  <Loader />
                </div>
              )}
            </tbody>
          </table>
        </div>
      )}
      {view === "district" && (
        <div className="w-full overflow-x-auto">
          <table className="table table-zebra">
            <thead className="h-10">
              <tr className="fixed mb-2 bg-slate-300 flex w-full justify-between items-start">
                <th className=" text-start"></th>
                <th className="w-full text-start">Name</th>
                <th className="w-full text-start">Division</th>
                <th className="w-full text-center">Edit/Disable</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((district, index) => (
                <tr
                  key={index}
                  className="flex w-full justify-between items-start"
                >
                  <th>{index + 1}</th>
                  <td className="w-full text-start">{district?.name}</td>
                  <td className="w-full text-start">{` ${
                    district?.division?.name
                  }( ${
                    district?.division?.province?.name
                      ? district?.division?.province?.name
                      : district?.parentId?.name
                  }) `}</td>
                  <td className="flex w-full justify-center items-center gap-4">
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setId(district?._id);
                        document
                          .getElementById("add_district_modal")
                          .showModal();
                        setFormDistrict({
                          district: district?.division?._id || "",
                          name: district?.name || "",
                        });
                      }}
                      className="btn"
                    >
                      <FaEdit />
                    </button>
                    <input
                      type="checkbox"
                      className="toggle toggle-error"
                      defaultChecked={district?.disabled}
                      onChange={() => {
                        handleDisable(district?._id, !district?.disabled);
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
        <div className="w-full overflow-x-auto">
          <table className="table table-zebra">
            <thead className="h-10">
              <tr className="fixed mb-2 bg-slate-300 flex w-full justify-between items-start">
                <th className=" text-start"></th>
                <th className="w-full text-start">Name</th>
                <th className="w-full text-center">Tehsil</th>
                <th className="w-full text-center">Edit/Disable</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 1 ? (
                filteredData
                  ?.filter(
                    (i) =>
                      i?.parentType === "Tehsil" || i?.parentType === "Division"
                  )
                  .map((halqa, index) => (
                    <tr
                      key={index}
                      className="flex w-full justify-between items-start"
                    >
                      <th>{index + 1}</th>
                      <td className="w-full">{halqa?.name}</td>
                      <td className="w-full">{`${halqa?.parentType} ${
                        halqa?.parentId?.name.toUpperCase() || "-"
                      } of ${
                        halqa?.parentType !== "Division"
                          ? `Division ${
                              halqa?.parentId?.district?.division?.name ||
                              halqa?.parentId?.name ||
                              "-"
                            } (${
                              halqa?.parentId?.district?.division?.province
                                ?.name ||
                              halqa?.parentId?.province?.name ||
                              "-"
                            })`
                          : `(${halqa?.parentId?.province?.name})`
                      }`}</td>

                      <td className="flex w-full justify-center items-center gap-4">
                        <button
                          onClick={() => {
                            setEditMode(true);
                            setId(halqa?._id);
                            document
                              .getElementById("add_halqa_modal")
                              .showModal();
                            setFormHalqa({
                              parentId: halqa?.parentId?._id || "",
                              name: halqa?.name || "",
                              parentType: halqa?.parentType || "",
                              unitType: halqa?.unitType || "",
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
                            handleDisable(halqa?._id, halqa?.disabled);
                          }}
                        />
                      </td>
                    </tr>
                  ))
              ) : (
                <div>
                  <Loader />
                </div>
              )}
            </tbody>
          </table>
        </div>
      )}
      <dialog id="add_division_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Division</h3>
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
                  .filter((i) => !i?.disabled && i?._id === me?.userAreaId?._id)
                  .map((i, index) => (
                    <option value={i?._id} key={index}>
                      {i?.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Division</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter Division Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
          </div>
          <div className="modal-action">
            {editMode ? (
              <button className="btn" onClick={handleSubmitEdit}>
                Update
              </button>
            ) : (
              <button className="btn" onClick={handleSubmit}>
                Add
              </button>
            )}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button id="close-division-modal" className="btn ms-3">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="add_district_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add District</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Division</span>
              </label>
              <select
                name="division"
                required
                value={formDistrict.division}
                onChange={(e) =>
                  setFormDistrict({ ...formDistrict, division: e.target.value })
                }
                className="w-full input input-bordered input-primary"
              >
                <option value="" disabled>
                  Select Division
                </option>
                {divisions
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
                <span className="text-base label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter District Name"
                value={formDistrict.name}
                onChange={(e) =>
                  setFormDistrict({ ...formDistrict, name: e.target.value })
                }
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
          </div>
          <div className="modal-action">
            {editMode ? (
              <button className="btn" onClick={handleSubmitDistrictEdit}>
                Update
              </button>
            ) : (
              <button className="btn" onClick={handleSubmitDistrict}>
                Add
              </button>
            )}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button id="close-district-modal" className="btn ms-3">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="add_tehsil_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Tehsil</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">District</span>
              </label>
              <select
                name="district"
                required
                value={formTehsil.district}
                onChange={(e) =>
                  setFormTehsil({ ...formTehsil, district: e.target.value })
                }
                className="w-full input input-bordered input-primary"
              >
                <option value="" disabled>
                  Select District
                </option>
                {districts
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
                <span className="text-base label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter Tehsil Name"
                value={formTehsil.name}
                onChange={(e) =>
                  setFormTehsil({ ...formTehsil, name: e.target.value })
                }
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
          </div>
          <div className="modal-action">
            {editMode ? (
              <button className="btn" onClick={handleSubmitTehsilEdit}>
                Update
              </button>
            ) : (
              <button className="btn" onClick={handleSubmitTehsil}>
                Add
              </button>
            )}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button id="close-tehsil-modal" className="btn ms-3">
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
              <label className="label cursor-pointer gap-3">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  checked={isDivision}
                  onChange={() => {
                    setIsDivision(!isDivision);
                    setFormHalqa({ ...formHalqa, parentType: "Division" });
                  }}
                />
                <span className="label-text">Division Halqa</span>
              </label>
              <label className="label cursor-pointer gap-3">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                  checked={!isDivision}
                  onChange={() => {
                    setIsDivision(!isDivision);
                    setFormHalqa({ ...formHalqa, parentType: "Tehsil" });
                  }}
                />
                <span className="label-text">Tehsil Halqa</span>
              </label>
            </div>
            {isDivision ? (
              <div>
                <label className="label">
                  <span className="text-base label-text">Division</span>
                </label>
                <select
                  name="division"
                  required
                  value={formHalqa.parentId}
                  onChange={(e) =>
                    setFormHalqa({ ...formHalqa, parentId: e.target.value })
                  }
                  className="w-full input input-bordered input-primary"
                >
                  <option value="" disabled>
                    Select Division
                  </option>
                  {divisions
                    .filter((i) => !i?.disabled)
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
                  <span className="text-base label-text">Tehsil</span>
                </label>
                <select
                  name="tehsil"
                  required
                  value={formHalqa.parentId}
                  onChange={(e) =>
                    setFormHalqa({ ...formHalqa, parentId: e.target.value })
                  }
                  className="w-full input input-bordered input-primary"
                >
                  <option value="" disabled>
                    Select Tehsil
                  </option>
                  {tehsils
                    .filter((i) => !i?.disabled)
                    .map((i, index) => (
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
