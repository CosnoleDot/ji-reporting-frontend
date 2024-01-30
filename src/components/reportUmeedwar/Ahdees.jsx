import React from "react";
import { InputWithLabel } from "../InputWithLabel";
const ahdees = [
  {
    title: "کل کتنےدن پڑہی",
    type: "number",
    key: "ahdeesTotalDays",
  },
  {
    title: "کون سی کتاب پڑہی",
    type: "text",
    key: "ahdeesBook",
  },
];
export const Ahdees = ({ view }) => {
  return (
    <div className="w-full">
      <h3 className="block w-full text-start font-medium text-sm p-3">حدیث</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {ahdees.map((obj, index) => (
          <div className="w-full md:pr-0 mb-2" key={index}>
            <InputWithLabel
              readOnly={view}
              placeholder={obj.title}
              label={obj.title}
              id={obj?.key}
              name={obj?.key}
              type={obj?.type}
              required={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
