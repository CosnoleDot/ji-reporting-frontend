import React from "react";

export const SignUp = () => {
  return (
    <div className="border w-full h-screen flex flex-col  bg-[#E9EBEF]">
      <h1 className="text-2xl font-bold text-center m-3">Signup Please</h1>
      <div className="w-full h-full border flex flex-col justify-start items-center">
        <div className="w-full mb-6">
          <label htmlFor="" className="text-gray font-medium">
            Username
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg mt-2"
            placeholder=""
          />
        </div>
        <div className="w-full mb-6 border">
          <label htmlFor="" className="text-gray font-medium">
            Phone Number
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg mt-2"
            placeholder=""
          />
        </div>
        <div className="w-full mb-6 border">
          <label htmlFor="" className="text-gray font-medium">
            Age
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg mt-2"
            placeholder=""
          />
        </div>
      </div>
    </div>
  );
};
