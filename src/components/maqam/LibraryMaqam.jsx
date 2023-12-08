import React from "react";
import { InputWithLabel } from "../InputWithLabel";

export const LibraryMaqam = ({ view }) => {
  const arr = [
    {
      label: " کل تعداد لائبریریز",
      key: "total-libraries",
      placeholder: "کل تعداد لائبریریز",
    },
    {
      label: "کل تعدادکتب",
      key: "total-books",
      placeholder: "کل تعدادکتب",
    },
    {
      label: "اضافہ کتب",
      key: "increase",
      placeholder: "اضافہ کتب",
    },
    {
      label: "کمی کتب ",
      key: "decrease",
      placeholder: "کمی کتب ",
    },
    {
      label: " کل اجرائے کتب",
      key: "bookRent",
      placeholder: " کل اجرائے کتب",
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
      </fieldset>
    </div>
  );
};
