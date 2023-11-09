import React from "react";

export const MessageDigest = () => {
  const arr = [
    {
      title: "کل موصولہ",
      placeholder: "Input 1",
    },
    {
      title: "فروخت کردہ ",
      placeholder: "Input 2",
    },
  ];
  return (
    <div className="w-full" dir="rtl">
      <h3 className="text-lg mb-3 font-bold">پیغام ڈائجسٹ</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {arr.map((obj, index) => (
          <div className="w-full mb-2" key={index}>
            <label htmlFor="">{obj.title}</label>
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
