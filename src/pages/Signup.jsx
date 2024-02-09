import { useContext, useEffect, useState } from "react";
import instance from "../api/instrance";
import { useToastState } from "../context";
import { Loader } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { UIContext } from "../context/ui";

export const Signup = () => {
  const [userAreaType, setUserAreaType] = useState("Province");
  const [areas, setAreas] = useState([]);
  const [searchArea, setSearchArea] = useState("");
  const { loading, setLoading } = useContext(UIContext);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subject, setSubject] = useState();
  const [subjects, setSubjects] = useState([]);
  const { dispatch } = useToastState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      userAreaId: formData.get("userAreaId"),
      userAreaType: formData.get("userAreaType"),
      email: formData.get("email"),
      password1: formData.get("password1"),
      password2: formData.get("password2"),
      name: formData.get("name"),
      age: formData.get("age"),
      nazim: formData.get("userAreaType").toLowerCase(),
      nazimType: formData.get("nazimType"),
      fatherName: formData.get("fatherName"),
      dob: formData.get("dob"),
      address: formData.get("address"),
      qualification: formData.get("qualification"),
      subject: formData.get("subject"),
      semester: formData.get("semester"),
      institution: formData.get("institution"),
      joiningDate: formData.get("joiningDate"),
      phoneNumber: formData.get("phoneNumber"),
      whatsAppNumber: formData.get("whatsAppNumber"),
    };
    try {
      const request = await instance.post("/user/signup", data, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: "SUCCESS", payload: request.data?.message });
      e.target.reset();
      navigate("/login");
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.message });
    }
    setLoading(false);
  };
  // FETCH ALL SUBJECTS

  const getSubjects = async () => {
    try {
      const request = await instance.get("/subjects", {
        headers: { "Content-Type": "application/json" },
      });
      if (request.status === 200) {
        setSubjects([...request.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setSelectedSubject(value);
  };
  // ADD NEW SUBJECT CALL
  const addNewSubjectCall = async () => {
    document.getElementById("subject").setAttribute("disabled", true);
    try {
      const request = await instance.post("/subjects", {
        headers: { "Content-Type": "application/json" },
        title: subject,
      });

      if (request.status === 201) {
        await getSubjects();
        document.getElementById("subject").removeAttribute("disabled");
      }
    } catch (error) {
      console.log(error);
      document.getElementById("subject").removeAttribute("disabled");
    }
  };
  useEffect(() => {
    getSubjects();
  }, []);
  const getAreas = async () => {
    let data;
    switch (userAreaType) {
      case "Province":
        setLoading(true);
        data = await instance.get("/locations/province");
        setLoading(false);
        setAreas(data.data.data);
        break;
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
        data = await instance.get("/locations/halqa");
        setLoading(false);
        setAreas(data.data.data);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    getAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAreaType]);
  const handleEventClick = (e) => {
    if (e?.target?.id !== "autocomplete") {
      if (
        !document
          ?.getElementById("autocomplete-list")
          ?.classList?.contains("hidden")
      ) {
        document?.getElementById("autocomplete-list")?.classList?.add("hidden");
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleEventClick);
    return () => {
      document.removeEventListener("click", handleEventClick);
    };
  }, []);
  return (
    <div className="relative flex flex-col justify-center min-h-screen p-2">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <div className="w-full flex items-center justify-center">
          <img src="/logo.png" className="text-center w-25 h-20" alt="LOGO" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h1 className="font-semibold text-2xl">Signup Form</h1>
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Father Name</span>
              </label>
              <input
                type="text"
                placeholder="Father name"
                name="fatherName"
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Date of birth</span>
              </label>
              <input
                type="month"
                placeholder="Date of birth"
                name="dob"
                className="w-full input input-bordered input-primary min-w-[230px]"
                required
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text text-sm">
                  Date of becoming rukan/umeedwar
                </span>
              </label>
              <input
                type="month"
                placeholder="JoiningDate"
                name="joiningDate"
                className="w-full input input-bordered input-primary"
              />
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Qualifications</span>
              </label>
              <select
                name="qualification"
                className="select select-bordered select-primary w-full"
              >
                <option disabled selected>
                  Qualification
                </option>
                <option value={"matric"}>Matric</option>
                <option value={"intermediate"}>Intermediate</option>
                <option value={"bachelors"}>Bachelors</option>
                <option value={"masters"}>Masters</option>
                <option value={"phd"}>PHD</option>
              </select>
            </div>
            <div className="w-full relative">
              <label className="label">
                <span className="text-base label-text">Subject</span>
              </label>

              <select
                name="subject"
                id="subject"
                className="select select-bordered select-primary w-full"
                value={selectedSubject}
                onChange={handleSubjectChange}
              >
                <option value={""}>Select or Add</option>
                {subjects?.map((sub) => (
                  <option value={sub?._id} className="capitalize">
                    {sub?.title.split("_").join(" ")}
                  </option>
                ))}
              </select>
              <span
                className="text-sm absolute top-1 p-1 right-0 text-slate-500 cursor-pointer hover:text-primary hover:font-semibold"
                onClick={() =>
                  document.getElementById("add_subject_modal").showModal()
                }
              >
                + Add New
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
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
                <option value={"semester 9"}>Semester 9</option>
                <option value={"semester10"}>Semester10</option>
                <option value={"semester 11"}>Semester 11</option>
                <option value={"semester 12"}>Semester 12</option>
                <option value={"1st year"}>1st Year</option>
                <option value={"2nd year"}>2nd Year</option>
                <option value={"3rd year"}>3rd Year</option>
                <option value={"4th year"}>4th Year</option>
                <option value={"5th year"}>5th Year</option>
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
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Age</span>
              </label>
              <input
                type="number"
                placeholder="Age"
                name="age"
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">WhatsApp Number</span>
              </label>
              <input
                type="text"
                placeholder="WhatsApp Number"
                name="whatsAppNumber"
                className="w-full input input-bordered input-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password1"
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
          </div>
          <div className="flex items-start justify-start">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Home address</span>
              </label>
              <textarea
                placeholder="Address"
                name="address"
                className="w-full input input-bordered input-primary"
                required
              ></textarea>
            </div>
          </div>
          <div className="w-full">
            <span className="px-1 py-2 block font-semibold">
              Organization pocket:
            </span>
            <div className="flex items-center justify-between flex-wrap border border-primary p-2 rounded-lg">
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="userAreaType"
                    className="radio checked:bg-blue-500"
                    value="Province"
                    onChange={(e) => setUserAreaType(e.target.value)}
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
                    value="Division"
                    onChange={(e) => setUserAreaType(e.target.value)}
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
                    value="Maqam"
                    onChange={(e) => setUserAreaType(e.target.value)}
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
                    value="Halqa"
                    onChange={(e) => setUserAreaType(e.target.value)}
                  />
                  <span className="label-text">Halqa</span>
                </label>
              </div>
            </div>
          </div>

          {/* NAZIM TYPES */}
          <div className="w-full">
            <span className="px-1 py-2 block font-semibold"> Status:</span>
            <div className="flex  items-center justify-start flex-wrap border border-primary p-2 rounded-lg">
              {userAreaType === "Halqa" && (
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="nazimType"
                      className="radio checked:bg-blue-500"
                      value="nazim"
                    />
                    <span className="label-text">Rafeeq-Nazim</span>
                  </label>
                </div>
              )}
              {userAreaType !== "Halqa" && (
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="nazimType"
                      className="radio checked:bg-blue-500"
                      value="rukan"
                    />
                    <span className="label-text">Rukan</span>
                  </label>
                </div>
              )}
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="nazimType"
                    className="radio checked:bg-blue-500"
                    value="umeedwaar-nazim"
                  />
                  <span className="label-text">Umeedwaar-Nazim</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="nazimType"
                    className="radio checked:bg-blue-500"
                    value="rukan-nazim"
                  />
                  <span className="label-text">Rukan-Nazim</span>
                </label>
              </div>
              {userAreaType !== "Halqa" && (
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="nazimType"
                      className="radio checked:bg-blue-500"
                      value="umeedwaar"
                    />
                    <span className="label-text">Umeedwaar</span>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <span className="px-1 py-2 block font-semibold">Area:</span>
            <input type="hidden" name="userAreaId" id="userAreaId" />
            <input
              id="autocomplete"
              type="search"
              autoComplete="off"
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
              class="absolute hidden z-10 max-h-[100px] overflow-y-scroll bg-white border border-gray-300 w-full mt-1"
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
                      document.getElementById("userAreaId").value = area?._id;
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
          <Link
            to="/"
            className="text-xs text-gray-600 hover:underline mt-5 block hover:text-blue-600"
          >
            Already have an account?
          </Link>
          <div className="w-full">
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
      <dialog id="add_subject_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Subject</h3>
          <div className="space-y-4">
            <div className="w-full">
              <label className="label">
                <span className="text-base label-text">Subject</span>
              </label>
              <input
                name="subject"
                type="text"
                placeholder="Enter Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full input input-bordered input-primary"
                required
              />
            </div>
          </div>
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              <div className=" w-full flex justify-end gap-3 items-center">
                <button
                  id="close-division-modal"
                  className="p-5 py-3 rounded-md bg-slate-400 text-white font-semibold border ms-3"
                >
                  Cancel
                </button>
                <button
                  id="close-division-modal"
                  className="btn ms-3 capitalize"
                  onClick={addNewSubjectCall}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
