import React from "react";
import { DivisionTable } from "../components/maqam/DivisionTable";
import { CenteralActivities, ExpandParty, Library, Zila } from "../components";
import { OtherActivities } from "../components/OtherActivities";

export const Maqam = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4" dir="rtl">
      <h2 className="text-2xl">جا ئزءکارکردگی رپورٹ (براے مقام)</h2>
      <div className="w-full p-4">
        <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          <div className="w-full md:pr-0 mb-2">
            <label htmlFor="" className="mb-2 text-lg">
              مقام کانام
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
          <DivisionTable />
        </div>
        <div className="mb-4">
          <CenteralActivities />
        </div>
        <div className="mb-4">
          <Zila />
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
