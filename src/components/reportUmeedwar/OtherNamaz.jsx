import React, { useEffect, useState } from "react";
import { InputWithLabel } from "../InputWithLabel";
const otherNamaz = [
  {
    title: "کل تعداد",
    type: "number",
    key: "otherPrayersTotal",
  },
  {
    title: "باجماعت",
    type: "number",
    key: "otherPrayersOnTime",
  },
  {
    title: "انفرادی",
    type: "number",
    key: "otherPrayersInfradi",
  },

  {
    title: "قضا",
    type: "number",
    key: "otherPrayersQaza",
  },
];
export const OtherNamaz = ({ view }) => {
  const [days, setDays] = useState("");
  const getTotalDaysInPreviousMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1); // Move to previous month
    date.setDate(0); // Set to the last day of the previous month
    setDays(date.getDate() * 4);
  };

  useEffect(() => {
    getTotalDaysInPreviousMonth();
  }, []);
  return (
    <div className="w-full">
      <h3 className="block w-full text-start text-lg md:text-xl p-3">
        دیگرنمازیں
      </h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {otherNamaz.map((obj, index) => (
          <div className="w-full md:pr-0 mb-2" key={index}>
            <InputWithLabel
              readOnly={view || obj?.key === "otherPrayersTotal"}
              placeholder={obj.title}
              label={obj.title}
              id={obj?.key}
              name={obj?.key}
              type={obj?.type}
              value={obj?.key === "otherPrayersTotal" ? days : ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
