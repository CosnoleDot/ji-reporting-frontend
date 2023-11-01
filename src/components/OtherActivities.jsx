import React from "react";

export const OtherActivities = () => {
  return (
    <div className="w-full" dir="rtl">
      <h3 className="text-lg mb-3">دیگر سرگرمیاں</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label htmlFor="" className="text-lg mb-2">دعوتی وفود</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="" className="text-lg mb-2">روابط پارٹیز</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 2"
          />
        </div>
      </div>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label htmlFor="" className="text-lg mb-2"> حادیث سرکل</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="" className="text-lg mb-2"> نظام الصلٰتہ</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 2"
          />
        </div>
      </div>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label htmlFor="" className="text-lg mb-2"> شب بیداری</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="" className="text-lg mb-2"> کوءی اور سرگرمی</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 2"
          />
        </div>
      </div>
    </div>
  );
};
