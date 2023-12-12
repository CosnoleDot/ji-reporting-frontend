import React from "react";
import { InputWithLabel } from "../InputWithLabel";

export const LibraryHalqa = ({ view }) => {
  const arr = [
    {
      label: "تعداد کتب",
      key: "books",
      placeholder: "تعداد کتب",
    },
    {
      label: "ااضافہ ",
      key: "increase",
      placeholder: "ااضافہ ",
    },
    {
      label: "کمی ",
      key: "decrease",
      placeholder: "کمی ",
    },
    {
      label: " اجرائے کتب",
      key: "bookRent",
      placeholder: " اجرائے کتب",
    },
  ];

  return (
    <div className="w-full mb-4" dir="rtl">
      <fieldset className="border p-3">
        <legend className="text-xl mb-3 font-bold">لائبریری</legend>
        <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          {arr.map((obj, index) => (
            <div className="w-full md:pr-0 mb-2" key={index}>
              <InputWithLabel
                readOnly={view}
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
      </fieldset>
    </div>
  );
};
