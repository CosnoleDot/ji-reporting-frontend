import React from "react";
import logo from "../assets/png/download3.png";
import { useState } from "react";

import instance from "../api/instrance";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgetEmail, setForgetEmail] = useState("");
  const [errorResponse, setErrorResponse] = useState({ error: "" });
  const navigate = useNavigate();
  const handleSubmit = () => {
    instance
      .post("/user/login", { email: username, password: password })
      .then((res) => {
        navigate("/");

        localStorage.setItem("@token", res?.data?.data?.token);
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        setErrorResponse({ error: message });
        console.log(error);
      });
  };
  const handleForget = (e) => {
    instance
      .post("/user/forget-password", { email: forgetEmail })
      .then((res) => {
        alert("successful");
      })
      .catch((error) => {
        alert("error");
      });
  };
  return (
    <div className="w-full h-screen  bg-[#E9EBEF]">
      <div className="w-full  xl:w-1/2 lg:w-1/2  md:w-1/2 h-screen flex flex-col p-3">
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
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="mb-6 ">
          <label htmlFor="" className=" opacity-70 font-medium">
            Password
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg mt-2"
            placeholder="Enter Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {Object.keys(errorResponse).length > 0 && (
          <div>
            <p className="text-error">{errorResponse?.error}</p>
          </div>
        )}
        <label
          htmlFor=""
          className="mb-6 flex"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <dialog id="my_modal_3" className="modal ">
            <div className="modal-box bg-[#E9EBEF]">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg ">Enter Your Email</h3>
              <p className="py-4">
                <input
                  type="text"
                  id="email_forger"
                  name="email_forget"
                  className="w-full p-2 rounded-lg mt-2"
                  placeholder="Enter your email"
                  value={forgetEmail}
                  onChange={(e) => {
                    setForgetEmail(e.target.value);
                  }}
                />
              </p>
              <button
                className="w-1/2  bg-[#049cfc] p-2  text-white font-bold mb-5 rounded-lg
    
              "
                onClick={handleForget}
              >
                Submit
              </button>
            </div>
          </dialog>

          <p className="text-[#049cfc]">Forget your Password?</p>
        </label>
        <div className="flex flex-col">
          <button
            className="w-full bg-[#049cfc] p-2 text-white font-bold mb-5 rounded-lg"
            onClick={handleSubmit}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full  p-2 text-[#049cfc] font-bold "
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};
