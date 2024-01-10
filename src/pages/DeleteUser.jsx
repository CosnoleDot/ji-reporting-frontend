import { useContext, useEffect, useState, useMemo } from "react";
import { GeneralLayout } from "../components";
import { UIContext } from "../context/ui";
import { FaTrash } from "react-icons/fa";
import { MeContext, useToastState } from "../context";
import instance from "../api/instrance";

export const DeleteUser = () => {
  const me = useContext(MeContext);
  const { nazim, loading, setLoading, getNazim } = useContext(UIContext);
  const [data, setData] = useState(nazim);
  const [userAreaType, setUserAreaType] = useState("Division");
  const [nazimType, setNazimType] = useState("Nazim");
  const [areas, setAreas] = useState([]);
  const [searchArea, setSearchArea] = useState("");
  const [halqas, setHalqas] = useState([]);
  const [search, setSearch] = useState("");
  const { dispatch } = useToastState();
  const [years, setYears] = useState([
    2021, 2022, 2023, 2024, 2025, 2026, 2027,
  ]);
  const [selectedYear, setSelectedYear] = useState();
  const [openYears, setOpenYears] = useState(false);
  //year calender
  const YearCalender = (val) => {
    setYears((prevYears) => {
      const updatedYears = prevYears.map((year) => year + val);
      return updatedYears;
    });
  };
  const searchUsers = (e) => {
    setSearch(e.target.value);
    if (e.target.value && e.target.value !== "") {
      setData(nazim.filter((i) => i.email.includes(e.target.value)));
    } else {
      setData(nazim);
    }
  };
  useEffect(() => {
    getAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAreaType]);
  useEffect(() => {
    setData(nazim);
  }, [nazim]);
  const deleteUser = async (user) => {
    setLoading(true);
    try {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete ${user?.email}?`
      );
      if (isConfirmed) {
        const req = await instance.delete("/user/" + user?._id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@token")}`,
          },
        });
        if (req) {
          await getNazim();
          dispatch({ type: "SUCCESS", payload: req.data?.message });
        }
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err?.response?.data?.message || err?.message,
      });
    }
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const params = {};
    const data = {
      userAreaId: formData.get("userAreaId"),
      userAreaType: formData.get("userAreaType"),
      name: formData.get("name"),
      nazim: formData.get("userAreaType").toLowerCase(),
      dob: formData.get("dob"),
      address: formData.get("address"),
      qualification: formData.get("qualification"),
      subject: formData.get("subject"),
      semester: formData.get("semester"),
      institution: formData.get("institution"),
      joiningDate: formData.get("joiningDate"),
      nazimType: formData.get("nazimType"),
    };
    if (data.userAreaId && data.userAreaId !== "")
      params.userAreaId = data.userAreaId;
    if (data.userAreaType && data.userAreaType !== "")
      params.userAreaType = data.userAreaType;
    if (data.name && data.name !== "") params.name = data.name;
    if (data.nazim && data.nazim !== "") params.nazim = data.nazim;
    if (data.dob && data.dob !== "") params.dob = data.dob;
    if (data.address && data.address !== "") params.address = data.address;
    if (data.qualification && data.qualification !== "")
      params.qualification = data.qualification;
    if (data.subject && data.subject !== "") params.subject = data.subject;
    if (data.semester && data.semester !== "") params.semester = data.semester;
    if (data.institution && data.institution !== "")
      params.institution = data.institution;
    if (data.joiningDate && data.joiningDate !== "")
      params.joiningDate = data.joiningDate;
    if (data.nazimType && data.nazimType !== "")
      params.nazimType = data.nazimType;

    try {
      const request = await instance.get("/user/filter", {
        params: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      });
      setData(request?.data?.data);
      dispatch({ type: "SUCCESS", payload: request.data?.message });
      e.target.reset();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }

    setLoading(false);
  };
  const fetchData = async () => {
    setLoading(true);
    const response = await instance.get("/locations/halqa");
    setLoading(false);
    setHalqas(response.data.data);
  };
  const memoizedHalqas = useMemo(() => halqas, [halqas]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    getAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAreaType]);
  const getAreas = async () => {
    let data;
    switch (userAreaType) {
      case "Division":
        setLoading(true);
        data = await instance.get("/locations/division");
        setLoading(false);
        setAreas(data.data.data);
        break;
      case "Maqam":
        setLoading(true);
        data = await instance.get("/locations/maqam");
        setLoading(false);
        setAreas(data.data.data);
        break;
      case "Halqa":
        setLoading(true);
        data = memoizedHalqas;
        setLoading(false);
        setAreas(data);
        break;
      default:
        break;
    }
    switch (nazimType) {
      case "nazim":
        setLoading(true);
        data = memoizedHalqas;
        setLoading(false);
        setAreas(data);
        break;
      case "rukan":
        setLoading(true);
        data = memoizedHalqas;
        setLoading(false);
        setAreas(data);
        break;
      case "umeedwar":
        setLoading(true);
        data = memoizedHalqas;
        setLoading(false);
        setAreas(data);
        break;
      default:
        break;
    }
  };

  return (
    <GeneralLayout title={"Delete Users"} active={"user-switch"}>
      <div className="p-5 relative flex flex-col items-center py-3 px-0 pt-0 justify-start h-[calc(100vh-65.6px-64px)]">
        <div className="w-full overflow-x-auto">
          <div className="flex items-center justify-center gap-2 p-2">
            <input
              type="search"
              name="Search"
              id="search"
              placeholder="Search User..."
              className="input input-bordered"
              value={search}
              onChange={searchUsers}
            />
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="btn btn-secondary border-none"
            >
              Filter
            </button>
          </div>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>
                  {localStorage.getItem("@type") === "province"
                    ? "Area"
                    : "Halqa"}
                </th>
                <th>Status</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((i) => i?.userAreaId?._id !== me?.userAreaId?._id)
                .map((maqam, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{maqam?.name || "-"}</td>
                    <td>{maqam?.email || "-"}</td>
                    <td>{maqam?.userAreaId?.name || "-"}</td>
                    <td>
                      {!maqam?.isDeleted ? (
                        <div className="badge badge-accent">active</div>
                      ) : (
                        <div className="badge badge-secondary">deleted</div>
                      )}
                    </td>
                    <td className="flex justify-center items-center gap-4">
                      <button
                        disabled={loading}
                        className="btn"
                        onClick={() => deleteUser(maqam)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <h1 className="font-semibold text-2xl">Signup Form</h1>

              <div>
                <label className="label">
                  <span className="text-base label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  className="w-full input input-bordered input-primary"
                />
              </div>

              <div className="relative">
                <label className="label">
                  <span className="text-base label-text">
                    Date of becoming rukan/umeedwar
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={"Select year"}
                  name="joiningDate"
                  className="w-full select select-bordered select-primary"
                  value={selectedYear}
                  onClick={() => setOpenYears(!openYears)}
                />
                {openYears && (
                  <div className="absolute bg-white border w-20 p-0 right-0">
                    <button
                      className="w-full p-1 bg-[#eee] hover:bg-[#aaa]"
                      onClick={() => YearCalender(-1)}
                    >
                      -
                    </button>

                    {years.map((obj) => (
                      <p
                        key={obj}
                        className={`year-item hover:bg-slate-400 w-full flex justify-start px-4 items-center cursor-pointer ${
                          obj === selectedYear ? "bg-slate-400" : ""
                        }`}
                        data-year={obj}
                        onClick={(e) =>
                          setSelectedYear(
                            parseInt(e.currentTarget.getAttribute("data-year"))
                          )
                        }
                      >
                        {obj}
                      </p>
                    ))}
                    <button
                      className="w-full p-1 bg-[#eee] hover:bg-[#aaa]"
                      onClick={() => YearCalender(1)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="text-base label-text">Year of birth</span>
                </label>
                <input
                  type="date"
                  placeholder="Date of birth"
                  name="dob"
                  className="w-full input input-bordered input-primary min-w-[230px]"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base label-text">City </span>
                </label>
                <textarea
                  placeholder="Address"
                  name="address"
                  className="w-full input input-bordered input-primary"
                  cols="22"
                  rows="2"
                />
              </div>

              <div className="w-full">
                <label className="label">
                  <span className="text-base label-text">Qualifications</span>
                </label>
                <select
                  name="qualification"
                  className="select select-bordered select-primary w-full"
                >
                  <button>add</button>
                  <option disabled selected>
                    Qualification
                  </option>
                  <option value={"matric"}>Matric</option>
                  <option value={"intermediate"}>Intermediate</option>
                  <option value={"bachelors"}>Bachelors</option>
                  <option value={"masters"}>Masters</option>
                </select>
              </div>
              <div className="w-full">
                <label className="label">
                  <span className="text-base label-text">Subject</span>
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  className="w-full input input-bordered input-primary"
                />
              </div>

              <div className="w-full">
                <label className="label">
                  <span className="text-base label-text">Semester/Year</span>
                </label>
                <select
                  name="semester"
                  className="select select-bordered select-primary w-full "
                >
                  <option disabled selected>
                    Semester/Year
                  </option>
                  <option value={"semester 1"}>Semester 1</option>
                  <option value={"semester 2"}>Semester 2</option>
                  <option value={"semester 3"}>Semester 3</option>
                  <option value={"semester 4"}>Semester 4</option>
                  <option value={"semester 5"}>Semester 5</option>
                  <option value={"semester 6"}>Semester 6</option>
                  <option value={"semester 7"}>Semester 7</option>
                  <option value={"semester 8"}>Semester 8</option>
                  <option value={"1st year"}>1st Year</option>
                  <option value={"2nd year"}>2dn Year</option>
                  <option value={"3rd year"}>3rd Year</option>
                  <option value={"4th year"}>4th Year</option>
                </select>
              </div>
              <div className="w-full">
                <label className="label">
                  <span className="text-base label-text">Institution</span>
                </label>
                <input
                  type="text"
                  placeholder="Institution"
                  name="institution"
                  className="w-full input input-bordered input-primary"
                />
              </div>

              <div>
                <span className="px-1 py-2 block font-semibold">
                  Organization pocket:
                </span>
                <div className="flex items-center justify-between border border-primary p-2 rounded-lg">
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="userAreaType"
                        className="radio checked:bg-blue-500"
                        checked={userAreaType === "Province"}
                        value="Province"
                        onChange={(e) => {
                          setUserAreaType(e.target.value);
                          setSearchArea("");
                          document.getElementById("autocomplete").value = "";
                        }}
                      />
                      <span className="label-text">Province</span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="userAreaType"
                        className="radio checked:bg-blue-500"
                        checked={userAreaType === "Division"}
                        value="Division"
                        onChange={(e) => {
                          setUserAreaType(e.target.value);
                          setSearchArea("");
                          document.getElementById("autocomplete").value = "";
                        }}
                      />
                      <span className="label-text">Division</span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="userAreaType"
                        className="radio checked:bg-blue-500"
                        checked={userAreaType === "Maqam"}
                        value="Maqam"
                        onChange={(e) => {
                          setUserAreaType(e.target.value);
                          setSearchArea("");
                          document.getElementById("autocomplete").value = "";
                        }}
                      />
                      <span className="label-text">Maqam</span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="userAreaType"
                        className="radio checked:bg-blue-500"
                        checked={userAreaType === "Halqa"}
                        value="Halqa"
                        onChange={(e) => {
                          setUserAreaType(e.target.value);
                          setSearchArea("");
                          document.getElementById("autocomplete").value = "";
                        }}
                      />
                      <span className="label-text">Halqa</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* NAZIM TYPES */}
              <div>
                <span className="px-1 py-2 block font-semibold">Status:</span>
                <div className="flex items-center justify-between border border-primary p-2 rounded-lg">
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="nazimType"
                        className="radio checked:bg-blue-500"
                        checked={nazimType === "nazim"}
                        value="nazim"
                        onChange={(e) => {
                          setNazimType(e.target.value);
                          setSearchArea("");
                          document.getElementById("autocomplete").value = "";
                        }}
                      />
                      <span className="label-text">Nazim</span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="nazimType"
                        className="radio checked:bg-blue-500"
                        checked={nazimType === "rukan"}
                        value="rukan"
                        onChange={(e) => {
                          setNazimType(e.target.value);
                          setSearchArea("");
                          document.getElementById("autocomplete").value = "";
                        }}
                      />
                      <span className="label-text">Rukan</span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="nazimType"
                        className="radio checked:bg-blue-500"
                        checked={nazimType === "umeedwaar"}
                        value="umeedwaar"
                        onChange={(e) => {
                          setNazimType(e.target.value);
                          setSearchArea("");
                          document.getElementById("autocomplete").value = "";
                        }}
                      />
                      <span className="label-text">Umeedwaar</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative">
                <span className="px-1 py-2 block font-semibold">Area:</span>
                <input type="hidden" name="userAreaId" id="userAreaId" />
                <input
                  id="autocomplete"
                  type="text"
                  class="input input-bordered input-primary w-full"
                  placeholder="Select area"
                  onChange={(e) => setSearchArea(e.target.value)}
                  onClick={() => {
                    if (
                      document
                        .getElementById("autocomplete-list")
                        .classList.contains("hidden")
                    ) {
                      document
                        .getElementById("autocomplete-list")
                        .classList.remove("hidden");
                    } else {
                      document
                        .getElementById("autocomplete-list")
                        .classList.add("hidden");
                    }
                  }}
                />
                <div
                  id="autocomplete-list"
                  class="absolute z-10 max-h-[100px] overflow-y-scroll bg-white border border-gray-300 w-full mt-1"
                >
                  {areas
                    .sort((a, b) => a?.name?.localeCompare(b?.name))
                    .filter((item) => {
                      if (searchArea && searchArea !== "") {
                        if (
                          item?.name
                            ?.toString()
                            ?.toLowerCase()
                            ?.includes(searchArea?.toString()?.toLowerCase())
                        ) {
                          return true;
                        }
                        return false;
                      } else {
                        return true;
                      }
                    })
                    .map((area, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          document.getElementById("userAreaId").value =
                            area?._id;
                          document.getElementById("autocomplete").value = `${
                            area?.name
                          }${
                            userAreaType === "Halqa"
                              ? ` - ${area?.parentId?.name} (${area?.parentType})`
                              : ""
                          }`;
                          document
                            .getElementById("autocomplete-list")
                            .classList.add("hidden");
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {area?.name}
                        {userAreaType === "Halqa"
                          ? ` - ${area?.parentId?.name} (${area?.parentType})`
                          : ""}
                      </div>
                    ))}
                </div>
              </div>
              <button className="btn btn-primary">ok</button>
            </form>
          </div>
        </dialog>
      </div>
    </GeneralLayout>
  );
};
