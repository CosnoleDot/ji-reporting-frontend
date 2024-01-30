import React from "react";
import { InputWithLabel } from "../InputWithLabel";
const litrature = [
  {
    title: "کل کتنےدن پڑہا",
    type: "number",
    key: "litratureTotalDays",
  },
  {
    title: "کون سی کتاب پڑہی",
    type: "text",
    key: "litratureBook",
  },
];
export const Litrature = ({ view }) => {
  return (
    <div className="w-full">
      <h3 className="block w-full text-start font-medium text-sm p-3">
        لیٹریچر
      </h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {litrature.map((obj, index) => (
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
