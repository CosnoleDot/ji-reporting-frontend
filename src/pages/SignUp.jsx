import React, { useState, useEffect } from "react";
import { CustomDropDown } from "../components";
import instance from "../api/instrance";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [divisions, setDivisions] = useState([]);
  const [tehsil, setTehsil] = useState([]);
  const [halqa, setHalqa] = useState([]);
  const [maqamData, setMaqamData] = useState([]);
  const [district, setDistrict] = useState([]);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    name: "",
    age: "",
    userAreaId: "",
    userAreaType: "",
    nazim: "",
  });
  const navigate = useNavigate();
  const setDivision = () => {
    setUserType("Division");
    setFormData({ ...formData, nazim: "Division" });
  };

  const setMaqam = () => {
    setUserType("Maqam");
    setFormData({ ...formData, nazim: "Maqam" });
  };
  const fetchData = async () => {
    try {
      const divisionResponse = await instance.get("/locations/division");
      setDivisions(divisionResponse.data.data);
    } catch (error) {
      console.error("Error fetching divisions:", error);
    }
    try {
      const tehsilResponse = await instance.get("/locations/tehsil");
      setTehsil(tehsilResponse.data.data);
    } catch (error) {
      console.error("Error fetching tehsil:", error);
    }
    try {
      const halqaResponse = await instance.get("/locations/maqam");
      setMaqamData(halqaResponse.data.data);
    } catch (error) {
      console.error("Error fetching tehsil:", error);
    }
    try {
      const halqaResponse = await instance.get("/locations/halqa");
      setHalqa(halqaResponse.data.data);
    } catch (error) {
      console.error("Error fetching tehsil:", error);
    }

    try {
      const districtResponse = await instance.get("/locations/district");
      setDistrict(districtResponse.data.data);
    } catch (error) {
      console.error("Error fetching tehsil:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await instance.post("/user/signup", formData);
      if (response.status === 200) {
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full flex flex-col  bg-[#E9EBEF]">
      <h1 className="text-2xl font-bold text-center m-3">Signup Please</h1>
      <div className="w-full h-full  flex flex-col justify-start items-start p-3">
        <div className="w-full mb-4">
          <label htmlFor="" className=" opacity-70 font-medium">
            Username
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Enter Username"
            name="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="" className=" opacity-70 font-medium">
            Email
          </label>
          <input
            type="mail"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </div>
        <div className="w-full mb-4 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Age
          </label>
          <input
            type="number"
            pattern="[0-9]*"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Enter Age"
            name="age"
            value={formData.age}
            onChange={(e) => {
              setFormData({ ...formData, age: e.target.value });
            }}
          />
        </div>
        <div className="w-full mb-4 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Password
          </label>
          <input
            type="password"
            pattern="[0-9]*"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Enter Password"
            name="password1"
            value={formData.password1}
            onChange={(e) => {
              setFormData({ ...formData, password1: e.target.value });
            }}
          />
        </div>
        <div className="w-full mb-4 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            pattern="[0-9]*"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Confirm Password"
            name="confirm-password"
            value={formData.password2}
            onChange={(e) => {
              setFormData({ ...formData, password2: e.target.value });
            }}
          />
        </div>
        <div>
          <h2>Select your Type</h2>
          <div className="form-control flex flex-row">
            <label className="label cursor-pointer mr-2">
              <span className="label-text mr-2">Division</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-[#049cfc]"
                checked={userType === "Division"}
                onChange={setDivision}
              />
            </label>
            <label className="label cursor-pointer mr-2">
              <span className="label-text mr-2">Maqam</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-[#049cfc]"
                checked={userType === "Maqam"}
                onChange={setMaqam}
              />
            </label>
          </div>
        </div>

        {userType === "Division" && (
          <div className="w-full mb-10">
            <div className="w-full flex flex-row md:flex-col sm:flex-col  gap-5 ">
              <div className="w-full mb-5">
                <label htmlFor="" className="opacity-70 font-medium">
                  Division
                </label>
                <CustomDropDown
                  onSelect={(selected) => {
                    if (selected) {
                      setFormData({
                        ...formData,
                        userAreaId: selected._id,
                        userAreaType: "Division",
                        nazim: "division",
                      });
                    }
                  }}
                  location={divisions}
                  title={"Select Division"}
                />
              </div>
              <div className="w-full mb-4 ">
                <label htmlFor="" className=" opacity-70 font-medium">
                  District
                </label>
                <CustomDropDown
                  onSelect={(selected) => {
                    if (selected) {
                      setFormData({
                        ...formData,
                        userAreaId: selected._id,
                        userAreaType: "District",
                        nazim: "district",
                      });
                    }
                  }}
                  location={district}
                  title={"Select District"}
                />
              </div>
            </div>
            <div className="w-full flex flex-row md:flex-col sm:flex-col  gap-5">
              <div className="w-full mb-4 ">
                <label htmlFor="" className=" opacity-70 font-medium">
                  Tehsil
                </label>
                <CustomDropDown
                  onSelect={(selected) => {
                    if (selected) {
                      setFormData({
                        ...formData,
                        userAreaId: selected._id,
                        userAreaType: "Tehsil",
                        nazim: "tehsil",
                      });
                    }
                  }}
                  location={tehsil}
                  title={"Select Tehsil"}
                />
              </div>
              <div className="w-full mb-4 ">
                <label htmlFor="" className=" opacity-70 font-medium">
                  Halqa
                </label>
                <CustomDropDown
                  onSelect={(selected) => {
                    if (selected) {
                      setFormData({
                        ...formData,
                        userAreaId: selected._id,
                        userAreaType: "Halqa",
                        nazim: "halqa",
                      });
                    }
                  }}
                  location={halqa}
                  title={"Select Halqa"}
                />
              </div>
            </div>
          </div>
        )}

        {userType === "Maqam" && (
          <div className="w-full flex flex-row md:flex-col sm:flex-col  gap-5 ">
            <div className="w-full mb-5 ">
              <label htmlFor="maqam" className=" opacity-70 font-medium">
                Maqam
              </label>
              <CustomDropDown
                onSelect={(selected) => {
                  if (selected) {
                    setFormData({
                      ...formData,
                      userAreaId: selected._id,
                      userAreaType: "Maqam",
                      nazim: "maqam",
                    });
                  }
                }}
                location={maqamData}
                title={"Select Maqam"}
              />
            </div>
            <div className="w-full mb-5 ">
              <label htmlFor="" className=" opacity-70 font-medium">
                Halqa
              </label>
              <CustomDropDown
                onSelect={(selected) => {
                  if (selected) {
                    setFormData({
                      ...formData,
                      userAreaId: selected._id,
                      userAreaType: "Halqa",
                      nazim: "halqa",
                    });
                  }
                }}
                location={halqa}
                title={"Select Halqa"}
              />
            </div>
          </div>
        )}
        <button
          className="w-full bg-[#049cfc] p-2 text-white font-bold mb-5 rounded-lg"
          onClick={handleSubmit}
        >
          Signup
        </button>
      </div>
    </div>
  );
};
