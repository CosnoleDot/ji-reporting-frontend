import React from "react";
import { InputWithLabel } from "./InputWithLabel";

export const Library = ({ condition }) => {
  const arr = [
    {
      label: "کل تعداد لائبریریز",
      key: "books",
      placeholder: "کل تعداد لائبریریز",
    },
    {
      label: "ااضافہ کتب",
      key: "increase",
      placeholder: "ااضافہ کتب",
    },
    {
      label: "کمی کتب",
      key: "decrease",
      placeholder: "کمی کتب",
    },
    {
      label: "اکل اجرائے کتب",
      key: "bookRent",
      placeholder: "اکل اجرائے کتب",
    },
  ];
  const arr2 = [
    {
      label: "کل تعداد لائبریریز",
      key: "totalLibraries",
      placeholder: "کل تعداد لائبریریز",
    },
    {
      label: "کل تعدادکتب",
      key: "totalBooks",
      placeholder: "کل تعدادکتب",
    },
    {
      label: "اضافہ کتب",
      key: "totalIncrease",
      placeholder: "اضافہ کتب",
    },
    {
      label: "کمی کتب",
      key: "totalDecrease",
      placeholder: "کمی کتب",
    },
    {
      label: "کل اجرائے کتب",
      key: "totalBookRent",
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
                <InputWithLabel
                  type={"number"}
                  placeholder={obj.placeholder}
                  label={obj.label}
                  id={obj?.key}
                  name={obj?.key}
                />
              </div>
            ))}
          </div>
          <div className=" w-full lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            <div className="w-full md:pr-0 mb-2">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">مرتب</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="registeredLibrary"
                    name="registeredLibrary"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl mb-3 font-bold">لائبریری</h3>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {arr2.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <InputWithLabel
                  type={"number"}
                  placeholder={obj.placeholder}
                  label={obj.label}
                  id={obj?.key}
                  name={obj?.key}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
