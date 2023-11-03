import React from "react";
import logo from "../assets/download3.png";
import { useNavigate } from "react-router-dom";
export const SignIn = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen  bg-[#E9EBEF]">
      <div className="w-1/2 h-full flex flex-col m-auto  ">
        <div className="bg-[#E9EBEF] w-full h-auto mt-10  flex flex-col  items-center  ">
          <img src={logo} alt="" className="w-40 h-32 bg-[#E9EBEF]  " />
          <h1 className="text-2xl font-bold text-center">Login Please</h1>
        </div>
        <div className="mb-6 mt-6 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Username
          </label>
          <input
            type="text"
            className="w-full  p-2 rounded-lg mt-2"
            placeholder=""
          />
        </div>
        <div className="mb-6 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Password
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg mt-2"
            placeholder=""
          />
        </div>
        <label
          htmlFor=""
          className="text-[#049cfc] mb-6"
          onClick={() => {
            alert("to the forget password page");
          }}
        >
          Forget your Password?
        </label>
        <div className="flex flex-col">
          <button
            className="w-full bg-[#049cfc] p-2 text-white font-bold mb-5 rounded-lg"
            onClick={() => navigate("/")}
          >
            Login
          </button>
          <button
            className="w-full  p-2 text-[#049cfc] font-bold "
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};
