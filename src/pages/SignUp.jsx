import React from "react";
import { CustomDropDown } from "../components";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const navigate = useNavigate();
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
          />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Phone Number
          </label>
          <input
            type="number"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Age
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Enter Age"
          />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Division
          </label>
          <CustomDropDown />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Zilla
          </label>
          <CustomDropDown />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Tehsil
          </label>
          <CustomDropDown />
        </div>
        <div className="w-full mb-2 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Halqa
          </label>
          <CustomDropDown />
        </div>
        <button
          className="w-full bg-[#049cfc] p-2 text-white font-bold mb-5 rounded-lg"
          onClick={() => navigate("/login")}
        >
          Signup
        </button>
      </div>
    </div>
  );
};
