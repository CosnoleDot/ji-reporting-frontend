import React from "react";
import { Division } from "../components/maqam/Division";
import { CenteralActivities } from "../components";

export const Maqam = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4" dir="rtl">
      <h2 className="text-2xl">جا ئزءکارکردگی رپورٹ (براے مقام)</h2>
      <div className="w-full p-4">
        <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          <div className="w-full md:pr-0 mb-2">
            <label htmlFor="" className="mb-2">
              مقام کانام
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="Input 1"
            />
          </div>
          <div className="w-full mb-2">
            <label htmlFor="" className="mb-2">
              براے ماھ
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="Input 2"
            />
          </div>
        </div>
        <div className="mb-4">
          <Division />
        </div>
        <CenteralActivities />
      </div>
    </div>
  );
};
