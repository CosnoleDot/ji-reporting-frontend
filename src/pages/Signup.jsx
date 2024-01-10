import { useContext, useEffect, useMemo, useState } from "react";
import instance from "../api/instrance";
import { useToastState } from "../context";
import { Loader } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { UIContext } from "../context/ui";

export const Signup = () => {
  const [userAreaType, setUserAreaType] = useState("Division");
  const [nazimType, setNazimType] = useState("nazim");
  const [areas, setAreas] = useState([]);
  const { loading, setLoading } = useContext(UIContext);
  const [searchArea, setSearchArea] = useState("");
  const [halqas, setHalqas] = useState([]);
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
      nazimType: formData.get("nazimType"),
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
  useEffect(() => {
    getAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAreaType]);
  return (
    <div className="relative flex flex-col justify-center h-auto p-2">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <div className="w-full flex items-center justify-center">
          <img src="/logo.png" className="text-center w-25 h-20" alt="LOGO" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h1 className="font-semibold text-2xl">Signup Form</h1>
          <div className="flex items-center justify-between">
            <div>
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
            <div>
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
          <div className="flex items-center justify-between">
            <div>
              <label className="label">
                <span className="text-base label-text">Date of birth</span>
              </label>
              <input
                type="date"
                placeholder="Date of birth"
                name="dob"
                className="w-full input input-bordered input-primary min-w-[230px]"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Home address</span>
              </label>
              <textarea
                placeholder="Address"
                name="address"
                className="w-full input input-bordered input-primary"
                required
                cols="22"
                rows="2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
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
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
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
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
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
          <div className="flex items-center justify-between">
            <div>
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
            <div>
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

          <div className="flex items-center justify-between">
            <div>
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
            <div>
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
                <span className="text-base label-text">
                  Date of becoming rukan/umeedwar
                </span>
              </label>
              <input
                type="text"
                placeholder="JoiningDate"
                name="joiningDate"
                className="w-full input input-bordered input-primary"
              />
            </div>
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
            <span className="px-1 py-2 block font-semibold"> Status:</span>
            <div className="flex  flex-wrap items-center justify-between border border-primary p-2 rounded-lg">
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
                    checked={nazimType === "rukan-nazim"}
                    value="rukan-nazim"
                    onChange={(e) => {
                      setNazimType(e.target.value);
                      setSearchArea("");
                      document.getElementById("autocomplete").value = "";
                    }}
                  />
                  <span className="label-text">Rukan-Nazim</span>
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
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <input
                    type="radio"
                    name="nazimType"
                    className="radio checked:bg-blue-500"
                    checked={nazimType === "umeedwaar-nazim"}
                    value="umeedwaar-nazim"
                    onChange={(e) => {
                      setNazimType(e.target.value);
                      setSearchArea("");
                      document.getElementById("autocomplete").value = "";
                    }}
                  />
                  <span className="label-text">Umeedwaar-Nazim</span>
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
          <div>
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
};
