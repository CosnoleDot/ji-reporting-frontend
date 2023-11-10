import React, { useState } from "react";
import { CustomDropDown } from "../components";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNo] = useState("");
  const [age, setAge] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [tahsil, setTahsil] = useState("");
  const [halqa, setHalqa] = useState("");
  const [maqam, setMaqam] = useState("");
  const handleDropDownChange = (selectedValue) => {
    setDivision(selectedValue);
    setDistrict(selectedValue);
    setTahsil(selectedValue);
    setHalqa(selectedValue);
    setMaqam(selectedValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    division();
    district();
    tahsil();
    halqa();
    maqam();
  };
  return (
    <div className="w-full h-screen flex flex-col  bg-[#E9EBEF]">
      <h1 className="text-2xl font-bold text-center m-3">Signup Please</h1>
      <div className="w-full h-full  flex flex-col justify-start items-start p-3">
        <div className="w-full mb-2">
          <label htmlFor="" className=" opacity-70 font-medium">
            Username
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            pattern="[0-9+]*"
            maxLength="11"
            minLength="9"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Enter Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNo(e.target.value);
            }}
          />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Age
          </label>
          <input
            type="text"
            pattern="[0-9]*"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Enter Age"
            name="age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="" className="opacity-70 font-medium">
            Division
          </label>
          <CustomDropDown onSelect={handleDropDownChange} />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            District
          </label>
          <CustomDropDown onSelect={handleDropDownChange} />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Tehsil
          </label>
          <CustomDropDown onSelect={handleDropDownChange} />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Halqa
          </label>
          <CustomDropDown onSelect={handleDropDownChange} />
        </div>
        <div className="w-full mb-5 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Maqam
          </label>
          <CustomDropDown onSelect={handleDropDownChange} />
        </div>
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
