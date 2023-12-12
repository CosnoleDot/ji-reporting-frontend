import React from "react";
import { InputWithLabel } from "../InputWithLabel";
const arr = [
  { title: "تربیت گاہ", key: "terbiyatGah" },
  {
    title: "دعوتی وفود",
    key: "dawatiWafud",
  },
  {
    title: "روابط پارٹیز",
    key: "rawabitParties",
  },

  {
    title: "نظام الصلٰتہ",
    key: "nizamSalah",
  },
  {
    title: "شب بیداری",
    key: "shabBedari",
  },
  {
    title: "کوئ اور سرگرمی",
    key: "anyOther",
  },
];
export const OtherActivitiesProvince = ({ view }) => {
  return (
    <div className="w-full " dir="rtl">
      <h3 className="w-full text-lg mb-3 font-bold ">دیگر سرگرمیاں</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {arr.map((obj, index) => (
          <div className="w-full md:pr-0 mb-2" key={index}>
            <InputWithLabel
              readOnly={view}
              placeholder={obj.title}
              label={obj.title}
              id={obj?.key}
              name={obj?.key}
              type={"number"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
