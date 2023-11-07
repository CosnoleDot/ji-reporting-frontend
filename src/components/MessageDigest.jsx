import React from "react";

export const MessageDigest = () => {
  return (
    <div className="w-full" dir="rtl">
      <h3 className="text-lg mb-3">پیغام ڈائجسٹ</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label htmlFor="">کل مو </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="">فروخت کردہ </label>
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
