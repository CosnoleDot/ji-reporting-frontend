import { useContext, useEffect, useState } from "react";
import {
  DistrictContext,
  DivisionContext,
  HalqaContext,
  MeContext,
  ProvinceContext,
  TehsilContext,
  ViewDetails,
  useToastState,
} from "../../context";
import { Link, useLocation } from "react-router-dom";
import instance from "../../api/instrance";
import { UIContext } from "../../context/ui";
import { FaEye } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowDropright,
  IoIosArrowForward,
} from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
export const LocationDivision = () => {
  const provinces = useContext(ProvinceContext);
  const me = useContext(MeContext);
  const tehsils = useContext(TehsilContext);
  const divisions = useContext(DivisionContext);
  const areaDetails = useContext(ViewDetails);
  const halqa = useContext(HalqaContext);
  const halqas = halqa.filter(
    (i) => i.parentType === "Tehsil" || i.parentType === "Division"
  );

  const [searchData, setSearchData] = useState([]);
  const [value, setValue] = useState("");
  const districts = useContext(DistrictContext);
  const [filteredData, setFilteredData] = useState(halqas);
  const [isDivision, setIsDivision] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    getHalqas,
    getDivisions,
    getDistricts,
    getTehsils,
    loading,
    setLoading,
    getAreaDetails,
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

  // Pagination states

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params, view, districts, divisions, halqas, tehsils]);
  useEffect(() => {
    if (view) {
      if (view === "halqa") {
        setFilteredData(halqas);
      }
      if (view === "district") {
        setFilteredData(districts);
      }
      if (view === "tehsil") {
        setFilteredData(tehsils);
      }
      if (view === "division") {
        setFilteredData(divisions);
      }
    }
  }, [halqas, tehsils, districts]);
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
  const itemsPerPage = 10; // Adjust this as needed
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Compute the displayed items based on the current page
  const paginatedData =
    value === ""
      ? filteredData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : searchData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

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
      document.getElementById("add_division_modal").close();

      dispatch({ type: "SUCCESS", payload: req.data?.message });
      setForm({
        name: "",
        province: "",
      });
    } catch (err) {
      document.getElementById("add_division_modal").close();

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
      document.getElementById("add_division_modal").close();

      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      console.log(err);
      setLoading(false);
      document.getElementById("add_division_modal").close();
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
      document.getElementById("add_district_modal").close();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      setFormDistrict({
        name: "",
        division: "",
      });
    } catch (err) {
      document.getElementById("add_district_modal").close();
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
      document.getElementById("add_district_modal").close();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      console.log(err);
      document.getElementById("add_district_modal").close();

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
      document.getElementById("add_tehsil_modal").close();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      setFormTehsil({
        name: "",
        district: "",
      });
    } catch (err) {
      document.getElementById("add_tehsil_modal").close();

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
      document.getElementById("add_tehsil_modal").close();

      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      console.log(err);
      setLoading(false);
      document.getElementById("add_tehsil_modal").close();
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
      document.getElementById("add_halqa_modal").close();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
      setFormHalqa({
        parentId: "",
        name: "",
        parentType: "",
        unitType: "",
      });
    } catch (err) {
      setLoading(false);
      document.getElementById("add_halqa_modal").close();
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
      document.getElementById("add_halqa_modal").close();
      dispatch({ type: "SUCCESS", payload: req.data?.message });
    } catch (err) {
      console.log(err);
      setLoading(false);
      document.getElementById("add_halqa_modal").close();
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  // ************************Disable call *******************
  const handleDisable = async (id, disabled) => {
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
      if (req) {
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
    setValue(value);
    if (view === "halqa") {
      const filteredHalqa = halqas
        ?.map((halqa) => halqa)
        ?.filter(
          (hal) =>
            hal?.name?.toLowerCase().includes(value.toLowerCase()) ||
            hal?.parentId?.name?.toLowerCase().includes(value.toLowerCase())
        );

      setFilteredData(filteredHalqa);
      setSearchData(filteredHalqa);
    } else if (view === "district") {
      const filteredDistricts = districts
        ?.map((district) => district)
        .filter(
          (dis) =>
            dis?.name.toLowerCase().includes(value.toLowerCase()) ||
            dis?.province?.name.toLowerCase().includes(value.toLowerCase())
        );

      setFilteredData(filteredDistricts);
      setSearchData(filteredDistricts);
    } else if (view === "tehsil") {
      const filteredTehsils = tehsils
        ?.map((tehsil) => tehsil)
        .filter(
          (teh) =>
            teh?.name.toLowerCase().includes(value.toLowerCase()) ||
            teh?.maqam?.name.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredData(filteredTehsils);
      setSearchData(filteredTehsils);
    } else if (view === "division") {
      const filteredDivisions = divisions
        ?.map((div) => div)
        .filter(
          (div) =>
            div?.name.toLowerCase().includes(value.toLowerCase()) ||
            div?.maqam?.name.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredData(filteredDivisions);
      setSearchData(filteredDivisions);
    }
    setCurrentPage(1); // Reset to the first page after search
  };

  const fetchAreas = async () => {
    if (tehsils.length === 0) {
      setLoading(true);
      await getTehsils();
      setLoading(false);
    }
    if (divisions.length === 0) {
      await getDivisions();
    }
    if (districts.length === 0) {
      await getDistricts();
    }
    if (halqas.length === 0) {
      await getHalqas();
    }
  };
  useEffect(() => {
    fetchAreas();
  }, []);
  return (
    <>
      <div className="w-full flex flex-wrap gap-2 justify-end items-center">
        {["province", "country"].includes(localStorage.getItem("@type")) &&
          view === "division" && (
            <button
              className="md:px-4 md:py-2 px-2 py-1 text-[14px] rounded-md bg-primary text-white capitalize "
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
        {districts?.length > 0 && view === "district" && (
          <button
            className="md:px-4 md:py-2 px-2 py-1 text-[14px] rounded-md bg-primary text-white capitalize p-[8px]"
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
        )}
        {tehsils?.length > 0 && view === "tehsil" && (
          <button
            className="md:px-4 md:py-2 px-2 py-1 text-[14px] rounded-md bg-primary text-white capitalize p-[8px]"
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
        )}
        {view === "halqa" && (
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
            className="md:px-4 md:py-2 px-2 py-1 text-[14px] rounded-md bg-primary text-white capitalize "
          >
            Add Halqa
          </button>
        )}
      </div>

      <div className="w-full flex md:flex-row flex-col justify-between items-start">
        <div
          role="tablist"
          className="w-auto flex justify-between md:justify-start items-center tabs tabs-boxed"
        >
          {["country", "province"].includes(localStorage.getItem("@type")) && (
            <Link
              to={"?active=division&view=division"}
              role="tab"
              className={`tab  ${
                view === "division" ? "bg-white text-black" : ""
              }`}
            >
              Division
            </Link>
          )}
          {districts?.length > 0 && (
            <Link
              to={"?active=division&view=district"}
              role="tab"
              className={`tab  ${
                view === "district" ? "bg-white text-black" : ""
              }`}
            >
              District
            </Link>
          )}
          {tehsils?.length > 0 && (
            <Link
              to={"?active=division&view=tehsil"}
              role="tab"
              className={`tab  ${
                view === "tehsil" ? "bg-white text-black" : ""
              }`}
            >
              Tehsil
            </Link>
          )}
          <Link
            to={"?active=division&view=halqa"}
            role="tab"
            className={`tab  ${view === "halqa" ? "bg-white text-black" : ""}`}
          >
            Halqa
          </Link>
        </div>

        <input
          type="text"
          className="input input-bordered input-sm md:w-[30%] w-full"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {view === "division" && (
        <div className="w-full overflow-x-auto">
          <table className="table ">
            <thead>
              <tr>
                <th className="border border-r-0 py-2 px-4 font-semibold text-gray-400">
                  Name
                </th>
                <th className="border border-r-0 border-l-0 text-start py-1 px-4 font-semibold text-gray-400">
                  Province
                </th>
                <th className="text-end border border-l-0 py-2 px-4 font-semibold text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.length > 0 ? (
                paginatedData.map((division, index) => (
                  <tr
                    key={division?._id}
                    className="border-r border-l font-semibold"
                  >
                    <td>{division?.name}</td>
                    <td>{division?.province?.name || "-"}</td>
                    <td className="flex justify-end gap-4 items-center">
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
                        className="text-green"
                      >
                        Edit
                      </button>
                      <input
                        type="checkbox"
                        className="toggle toggle-white bg-white [--tglbg:#E2E8F0] checked:[--tglbg:#002856]"
                        defaultChecked={division?.disabled}
                        onChange={() => {
                          handleDisable(division?._id, !division?.disabled);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <div>No Report Found</div>
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
      {view === "tehsil" && (
        <div className="w-full overflow-x-auto">
          <table className="table ">
            <thead>
              <tr className="">
                <th className="border border-r-0 py-2 px-4 font-semibold text-gray-400">
                  Name
                </th>
                <th className="border border-r-0 border-l-0 text-start py-1 px-4 font-semibold text-gray-400">
                  District
                </th>
                <th className="text-end border border-l-0 py-2 px-4 font-semibold text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {paginatedData.length > 0 ? (
                paginatedData?.map((tehsil, index) => (
                  <tr key={tehsil?._id} className="border-r border-l ">
                    <td className="font-semibold  text-start">
                      {tehsil?.name}
                    </td>
                    <td className="font-semibold  text-start">{` ${
                      tehsil?.district?.name
                    }( District  of ${
                      tehsil?.district?.division?.name
                        ? tehsil?.district?.division?.name
                        : tehsil?.parentId?.name
                    }) (${tehsil?.district?.division?.province?.name})`}</td>
                    <td className="font-semibold flex  justify-center items-center gap-4">
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
                        className="text-green"
                      >
                        Edit
                      </button>
                      <input
                        type="checkbox"
                        className="toggle toggle-white bg-white [--tglbg:#E2E8F0] checked:[--tglbg:#002856]"
                        defaultChecked={tehsil?.disabled}
                        onChange={() => {
                          handleDisable(tehsil?._id, !tehsil?.disabled);
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
      {view === "district" && (
        <div className="w-full overflow-x-auto">
          <table className="table ">
            <thead className="">
              <tr className="">
                <th className="border border-r-0 py-2 px-4 font-semibold text-gray-400">
                  Name
                </th>
                <th className="border border-r-0 border-l-0 text-start py-1 px-4 font-semibold text-gray-400">
                  Division
                </th>
                <th className="text-end border border-l-0 py-2 px-4 font-semibold text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.length > 0 ? (
                paginatedData?.map((district, index) => (
                  <tr key={district?._id} className="border-r border-l ">
                    <td className="font-semibold text-start">
                      {district?.name}
                    </td>
                    <td className="font-semibold text-start">{` ${
                      district?.division?.name
                    }( ${
                      district?.division?.province?.name
                        ? district?.division?.province?.name
                        : district?.parentId?.name
                    }) `}</td>
                    <td className="font-semibold flex justify-end items-center gap-4">
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
                        className="text-green"
                      >
                        Edit
                      </button>
                      <input
                        type="checkbox"
                        className="toggle toggle-white bg-white [--tglbg:#E2E8F0] checked:[--tglbg:#002856]"
                        defaultChecked={district?.disabled}
                        onChange={() => {
                          handleDisable(district?._id, !district?.disabled);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <div>No Location Found</div>
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
      {view === "halqa" && (
        <div className="w-full overflow-x-auto">
          <table className="table">
            <thead className="h-10">
              <tr className="">
                <th className="border border-r-0 py-2 px-4 font-semibold text-gray-400">
                  Name
                </th>
                <th className="border border-r-0 border-l-0 text-start py-1 px-4 font-semibold text-gray-400">
                  {tehsils?.length > 0 ? "Area Details" : "Division"}
                </th>
                <th className="text-end border border-l-0 py-2 px-4 font-semibold text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.length > 0 ? (
                paginatedData?.map((halqa, index) => (
                  <tr
                    key={halqa?._id}
                    className="border-r border-l font-semibold"
                  >
                    <td className="">{halqa?.name}</td>
                    <td className="">
                      <div
                        onClick={() => {
                          getAreaDetails(halqa);
                        }}
                      >
                        <FaEye className="cursor-pointer text-lg" />
                      </div>
                    </td>

                    <td className="flex justify-center items-center gap-4">
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
                        className="text-green"
                      >
                        Edit
                      </button>
                      <input
                        type="checkbox"
                        className="toggle toggle-white bg-white [--tglbg:#E2E8F0] checked:[--tglbg:#002856]"
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
        <div className="flex w-full gap-4 px-4 justify-end items-center mt-4">
          <select
            readOnly
            disabled
            name="items_per_page"
            id="items"
            className="select select-sm max-w-xs bg-gray-200 rounded-full"
          >
            <option value="text-[8px]" disabled selected>
              Rows per page 10
            </option>
          </select>

          {/* Previous Button */}
          <button
            className="rounded-full border-none w-7 h-7"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <IoIosArrowBack
              className={`text-[1.5rem] rounded-full bg-gray-200 ${
                currentPage === 1 && "text-gray-400"
              }`}
            />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center">
            <span
              className={`rounded-full text-bold text-sm ${
                currentPage === 1 && "border-2 border-gray-500"
              } mx-1 bg-white w-7 h-7 flex justify-center items-center text-[8px]`}
            >
              1
            </span>

            {totalPages > 1 && (
              <button
                className={`rounded-full text-bold text-sm ${
                  currentPage === 2 && "border-2 border-gray-500"
                } mx-1 bg-white w-7 h-7 flex justify-center items-center text-[8px]`}
              >
                2
              </button>
            )}
            {totalPages > 3 && <span>...</span>}
            {totalPages && currentPage > 2 && currentPage < totalPages ? (
              <span
                className={`rounded-full text-bold text-sm ${
                  currentPage !== totalPages && "border-2 border-gray-500"
                } mx-1 bg-white w-7 h-7 flex justify-center items-center text-[8px]`}
              >
                {currentPage}
              </span>
            ) : (
              <span></span>
            )}
            {totalPages && totalPages > 2 ? (
              <span
                className={`rounded-full text-bold text-sm ${
                  currentPage === totalPages && "border-2 border-gray-500"
                } mx-1 bg-white w-7 h-7 flex justify-center items-center text-[8px]`}
              >
                {totalPages}
              </span>
            ) : (
              <span></span>
            )}
          </div>

          {/* Next Button */}
          <button
            className="rounded-full border-none w-7 h-7"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <IoIosArrowForward
              className={`text-[1.5rem] rounded-full bg-gray-200 ${
                currentPage === totalPages && "text-gray-400"
              }`}
            />
          </button>
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
                className="w-full input input-bordered "
              >
                <option value="" disabled>
                  Select Province
                </option>
                {me?.userAreaType === "Province"
                  ? provinces
                      ?.filter(
                        (i) => !i?.disabled && i?._id === me?.userAreaId?._id
                      )
                      ?.map((i, index) => (
                        <option value={i?._id} key={index}>
                          {i?.name}
                        </option>
                      ))
                  : provinces?.map((i, index) => (
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
                className="w-full input input-bordered "
                required
              />
            </div>
          </div>
          <div className="modal-action">
            {editMode ? (
              <button className="text-green" onClick={handleSubmitEdit}>
                Update
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-md bg-primary text-white capitalize"
                onClick={handleSubmit}
              >
                Add
              </button>
            )}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                id="close-division-modal"
                className="border px-4 py-2 rounded-md bg-none text-primary capitalize"
              >
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
                className="w-full input input-bordered "
              >
                <option value="" disabled>
                  Select Division
                </option>
                {divisions
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
                className="w-full input input-bordered "
                required
              />
            </div>
          </div>
          <div className="modal-action">
            {editMode ? (
              <button
                className="px-4 py-2 rounded-md bg-primary text-white capitalize"
                onClick={handleSubmitDistrictEdit}
              >
                Update
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-md bg-primary text-white capitalize"
                onClick={handleSubmitDistrict}
              >
                Add
              </button>
            )}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                id="close-district-modal"
                className="border px-4 py-2 rounded-md bg-none text-primary capitalize"
              >
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
                className="w-full input input-bordered "
              >
                <option value="" disabled>
                  Select District
                </option>
                {districts
                  ?.filter((i) => !i?.disabled)
                  ?.sort((a, b) => a.name.localeCompare(b.name))
                  ?.map((i, index) => (
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
                className="w-full input input-bordered "
                required
              />
            </div>
          </div>
          <div className="modal-action">
            {editMode ? (
              <button
                className="px-4 py-2 rounded-md bg-primary text-white capitalize"
                onClick={handleSubmitTehsilEdit}
              >
                Update
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-md bg-primary text-white capitalize"
                onClick={handleSubmitTehsil}
              >
                Add
              </button>
            )}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                id="close-tehsil-modal"
                className="border px-4 py-2 rounded-md bg-none text-primary capitalize"
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
                  className="w-full input input-bordered "
                >
                  <option value="" disabled>
                    Select Division
                  </option>
                  {divisions
                    ?.filter((i) => !i?.disabled)
                    ?.map((i, index) => (
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
                  className="w-full input input-bordered "
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
                className="w-full input input-bordered "
                required
              />
            </div>
          </div>
          <div className="modal-action">
            {editMode ? (
              <button
                disabled={loading}
                className="px-4 py-2 rounded-md bg-primary text-white capitalize"
                onClick={handleSubmitHalqaEdit}
              >
                Update
              </button>
            ) : (
              <button
                disabled={loading}
                className="px-4 py-2 rounded-md bg-primary text-white capitalize"
                onClick={handleSubmitHalqa}
              >
                Add
              </button>
            )}
            <form method="dialog">
              <button
                disabled={loading}
                id="close-maqam-modal"
                className="border px-4 py-2 rounded-md bg-none text-primary capitalize"
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
              {areaDetails?.parentType ? areaDetails?.parentType + ":" : ""}
              <h4 className="text-gray-400 font-bold">
                {areaDetails?.parentType === "Ilaqa"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.parentType === "Maqam"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.parentType === "Tehsil"
                  ? areaDetails?.parentId?.name
                  : areaDetails?.parentType === "Division"
                  ? areaDetails?.parentId?.name
                  : ""}
              </h4>
            </div>
            {areaDetails?.parentType === "Tehsil" &&
              !areaDetails?.parentType === "Division" && (
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
                  className="border px-4 py-2 rounded-md bg-none text-primary capitalize capitalize"
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
