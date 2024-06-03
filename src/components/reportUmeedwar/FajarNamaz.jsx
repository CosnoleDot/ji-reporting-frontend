import React, { useEffect, useState } from "react";
import { InputWithLabel } from "../InputWithLabel";
const fajarNamaz = [
  {
    title: "کل تعداد",
    type: "number",
    key: "fajarTotal",
  },
  {
    title: "باجماعت",
    type: "number",
    key: "fajarOnTime",
  },
  {
    title: "انفرادی",
    type: "number",
    key: "fajarInfradi",
  },

  {
    title: "قضا",
    type: "number",
    key: "fajarQaza",
  },
];
export const FajarNamaz = ({ view }) => {
  const [days, setDays] = useState("");
  const getTotalDaysInPreviousMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1); // Move to previous month
    date.setDate(0); // Set to the last day of the previous month
    setDays(date.getDate());
  };

  useEffect(() => {
    getTotalDaysInPreviousMonth();
  }, []);
  return (
    <div className="w-full">
      <h3 className="block w-full text-start text-lg md:text-xl p-3">
        نمازِفجر
      </h3>
      <div className=" w-full lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {fajarNamaz?.map((obj, index) => (
          <div className="w-full md:pr-0 mb-2" key={index}>
            <InputWithLabel
              readOnly={view || obj?.key === "fajarTotal"}
              placeholder={obj.title}
              label={obj.title}
              id={obj?.key}
              name={obj?.key}
              type={obj?.type}
              required={true}
              value={obj?.key === "fajarTotal" ? days : ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
