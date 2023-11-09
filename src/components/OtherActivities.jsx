import React from "react";

export const OtherActivities = ({ arr }) => {
  return (
    <div className="w-full" dir="rtl">
      <h3 className="text-lg mb-3 font-bold">دیگر سرگرمیاں</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {arr.map((obj, index) => (
          <div className="w-full md:pr-0 mb-2" key={index}>
            <label htmlFor="" className="text-lg mb-2">
              {obj.title}
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder={obj.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
