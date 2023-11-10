import React from "react";

export const Library = ({ condition }) => {
  const arr = [
    {
      title: "کل تعداد لائبریریز",
      placeholder: "کل تعداد لائبریریز",
    },
    {
      title: "ااضافہ کتب",
      placeholder: "ااضافہ کتب",
    },
    {
      title: "کمی کتب",
      placeholder: "کمی کتب",
    },
    {
      title: "اکل اجرائے کتب",
      placeholder: "اکل اجرائے کتب",
    },
  ];
  const arr2 = [
    {
      title: "کل تعداد لائبریریز",
      placeholder: "کل تعداد لائبریریز",
    },
    {
      title: "کل تعدادکتب",
      placeholder: "کل تعدادکتب",
    },
    {
      title: "اضافہ کتب",
      placeholder: "اضافہ کتب",
    },
    {
      title: "کمی کتب",
      placeholder: "کمی کتب",
    },
    {
      title: "کل اجرائے کتب",
      placeholder: "کل اجرائے کتب",
    },
  ];

  return (
    <div className="w-full" dir="rtl">
      {condition === true ? (
        <div>
          <h3 className="text-xl mb-3 font-bold">لائبریری</h3>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {arr.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <label htmlFor="" className="text-lg mb-2">
                  {obj.title}
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg mt-3 mb-3"
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
      ) : (
        <div>
          {" "}
          <h3 className="text-xl mb-3 font-bold">لائبریری</h3>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {arr2.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <label htmlFor="" className="text-lg mb-2">
                  {obj.title}
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg mt-3 mb-3"
                  placeholder={obj.placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
