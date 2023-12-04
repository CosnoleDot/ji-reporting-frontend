import React from "react";
import { InputWithLabel } from "./InputWithLabel";
const arr = [
  {
    title: "دعوتی وفود",
    name: "dawatiWafud",
  },
  {
    title: "روابط پارٹیز",
    name: "rawabitParties",
  },

  {
    title: "نظام الصلٰتہ",
    name: "nazimSalah",
  },
  {
    title: "شب بیداری",
    name: "shabBedari",
  },
  {
    title: "کوءی اور سرگرمی",
    name: "anyOther",
  },
  {
    title: "حادیث سرکل",
    name: "hadithCircle",
  },
];
export const OtherActivities = ({ view }) => {
  return (
    <div className="w-full " dir="rtl">
      <h3 className="w-full text-lg mb-3 font-bold ">دیگر سرگرمیاں</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {arr.map((obj, index) =>
          obj.name === "hadithCircle" ? (
            localStorage.getItem("@type") === "halqa" ? (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <InputWithLabel
                  readOnly={view}
                  placeholder={obj.title}
                  label={obj.title}
                  id={obj?.name}
                  name={obj?.name}
                  type={"number"}
                />
              </div>
            ) : (
              <></>
            )
          ) : (
            <div className="w-full md:pr-0 mb-2" key={index}>
              <InputWithLabel
                readOnly={view}
                placeholder={obj.title}
                label={obj.title}
                id={obj?.name}
                name={obj?.name}
                type={"number"}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
