import React from "react";
import {
  ActivityTable,
  EveningDiary,
  ExpandParty,
  Library,
  MenTable,
} from "../components";
import { OtherActivities } from "../components/OtherActivities";

export const Halqa = () => {
  const arr = [
    {
      title: "دعوتی وفود",

      placeholder: "Input 1",
    },
    {
      title: "روابط پارٹیز",

      placeholder: "Input 1",
    },
    {
      title: " حادیث سرکل",

      placeholder: "Input 1",
    },
    {
      title: "نظام الصلٰتہ",

      placeholder: "Input 1",
    },
    {
      title: "شب بیداری",

      placeholder: "Input 1",
    },
    {
      title: "کوءی اور سرگرمی",

      placeholder: "Input 1",
    },
  ];
  return (
    <div
      className="flex flex-col justify-center items-center p-4 font-notoUrdu"
      dir="rtl"
    >
      <h2 className="text-2xl">کار کردگی رپورٹ (براے حلقء)</h2>
      <div className="w-full p-4">
        <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          <div className="w-full md:pr-0 mb-2">
            <label htmlFor="" className="mb-2 text-lg">
              حلقء کانام
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg mt-2"
              placeholder="Input 1"
            />
          </div>
          <div className="w-full mb-2">
            <label htmlFor="" className="mb-2 text-lg">
              براے ماھ
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg mt-2"
              placeholder="Input 2"
            />
          </div>
        </div>
      </div>
      <MenTable />
      <ActivityTable />
      <OtherActivities arr={arr} />
      <ExpandParty />
      <Library condition={true} />
      <EveningDiary />
    </div>
  );
};
