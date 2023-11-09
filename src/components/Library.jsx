import React from "react";

export const Library = () => {
  const arr = [
    {
      title: "کل تعداد لائبریریز",
      placeholder: "Input 1",
    },
    {
      title: "ااضافہ کتب",
      placeholder: "Input 1",
    },
  ];
  const arr1 = [
    {
      title: "کمی کتب",
      placeholder: "Input 1",
    },
    {
      title: "اکل اجرائے کتب",
      placeholder: "Input 1",
    },
  ];
  return (
    <div className="w-full" dir="rtl">
      <h3 className="text-xl mb-3 font-bold">لائبریری</h3>
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
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {arr1.map((obj, index) => (
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
      <div className="w-full mb-2">
        <label htmlFor="" className="text-lg mb-2">
          لاِئبریری رجسٹر
        </label>
        <div className="mt-4 flex">
          <label className="block">
            <input type="radio" className="mr-2" name="radio-group" />
            مرتب
          </label>
          <label className="block">
            <input type="radio" className="mr-2" name="radio-group" />
            غیرمرتب
          </label>
        </div>
      </div>
    </div>
  );
};
