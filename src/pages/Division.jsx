import React from "react";
import { CenteralActivities, ExpandParty, Library, Zeli } from "../components";
import { OtherActivities } from "../components/OtherActivities";

export const Division = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4" dir="rtl">
      <h2 className="text-2xl">جا ئزءکارکردگی رپورٹ (براے ڈویژن)</h2>
      <div className="w-full p-4">
        <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          <div className="w-full md:pr-0 mb-2">
            <label htmlFor="" className="mb-2 text-lg">
              ڈویژن کانام
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="Input 1"
            />
          </div>
          <div className="w-full mb-2">
            <label htmlFor="" className="mb-2 text-lg">
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
        <div className="mb-4">
          <CenteralActivities />
        </div>
        <div className="mb-4">
          <Zeli />
        </div>
        <div className=" mb-4">
          <OtherActivities />
        </div>
        <div className=" mb-4">
          <ExpandParty />
        </div>
        <div className=" mb-4">
          <Library />
        </div>
      </div>
    </div>
  );
};
