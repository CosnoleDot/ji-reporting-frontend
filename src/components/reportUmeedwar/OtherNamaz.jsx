import React from "react";
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
  return (
    <div className="w-full">
      <h3 className="block w-full text-start font-medium text-sm p-3">
        دیگرنمازیں{" "}
      </h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {otherNamaz.map((obj, index) => (
          <div className="w-full md:pr-0 mb-2" key={index}>
            <InputWithLabel
              readOnly={view}
              placeholder={obj.title}
              label={obj.title}
              id={obj?.key}
              name={obj?.key}
              type={obj?.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
