import { useContext, useEffect, useState } from "react";
import { HalqaContext, IlaqaContext, useToastState } from "../../context";
import { Link, useLocation } from "react-router-dom";
import instance from "../../api/instrance";
import { FaEdit } from "react-icons/fa";
import { UIContext } from "../../context/ui";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Change this value according to your preference
  const totalPages = Math.ceil(halqas?.length / itemsPerPage);
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = halqas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="w-full flex flex-wrap gap-2 justify-end items-center">
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
          className="px-4 py-2 rounded-md bg-primary text-white capitalize"
        >
          Add Halqa
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table ">
          <thead className="">
            <tr className="">
              <th className="border border-r-0 py-2 px-4 font-semibold text-gray-400">
                Name
              </th>
              <th className="border border-r-0 border-l-0 text-start py-1 px-4 font-semibold text-gray-400">
                Ilaqa
              </th>
              <th className="border border-r-0 border-l-0 text-start py-1 px-4 font-semibold text-gray-400">
                Type
              </th>
              <th className="text-end border border-l-0 py-2 px-4 font-semibold text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems
              ?.filter((i) => i?.parentType === "Ilaqa")
              ?.map((halqa, index) => (
                <tr
                  key={halqa?._id}
                  className="border-r border-l font-semibold"
                >
                  <td className="text-start">{halqa?.name}</td>
                  <td className="text-start">{halqa?.parentId?.name || "-"}</td>
                  <td className="text-start">{halqa?.unitType}</td>
                  <td className="flex justify-end  items-center gap-4">
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
              ))}
          </tbody>
        </table>
      </div>

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
          <IoIosArrowBack className="text-[1.5rem] rounded-full bg-gray-200" />
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
          <IoIosArrowForward className="text-[1.5rem] rounded-full bg-gray-200" />
        </button>
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
                className="w-full input input-bordered "
              >
                <option value="" disabled>
                  Select Ilaqa
                </option>
                {ilaqas
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
                className="w-full input input-bordered "
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
                className="px-4 py-2 rounded-md bg-primary text-white capitalize"
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
                className="border px-4 py-2 rounded-md bg-none text-primary capitalize"
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
