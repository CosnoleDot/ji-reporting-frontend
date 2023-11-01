import React from "react";

export const EveningDiary = () => {
  return (
    <div className="w-full" dir="rtl">
      <h3 className="text-lg mb-3">روزشب ڈاءری</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label htmlFor="">کتنے ارکان فل کرتے ھیں</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="">کتنےرفقافل کرتے ھیں</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 2"
          />
        </div>
      </div>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label htmlFor="">تبصرہ</label>
          <input
            type="textarea"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
      </div>
      <div className=" w-full lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label htmlFor="">نام ناظم حلقء</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="">تاریخ</label>
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
