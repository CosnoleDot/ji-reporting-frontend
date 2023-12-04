import React from "react";
import { InputWithLabel } from "./InputWithLabel";

export const ExpandParty = ({ view }) => {
  const arr = [
    {
      title: "طے شدہ",
      key: "rawabitDecided",
    },
    {
      title: "موجود",
      key: "current",
    },
    {
      title: "ملاقاتیں",
      key: "meetings",
    },
    {
      title: "تقسیم لٹریچر",
      key: "literatureDistribution",
    },
  ];
  return (
    <div className="w-full " dir="rtl">
      <h3 className="text-xl font-bold mb-3">توسیع دعوت</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label className="text-lg mb-2 font-bold" htmlFor="">
            روابط
          </label>
        </div>
        {arr.map((obj, index) => (
          <div className="w-full mb-2" key={index}>
            <InputWithLabel
              readOnly={view}
              type={"number"}
              label={obj?.title}
              required={true}
              name={obj?.key}
              id={obj?.key}
            />
          </div>
        ))}
      </div>

      <div className="w-full">
        <h3 className="text-xl mb-3">عام طلبء</h3>
      </div>
      <div className=" w-full lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <InputWithLabel
            readOnly={view}
            label={"ملاقاتیں"}
            placeholder={"ملاقاتیں"}
            required={true}
            type={"number"}
            id={"commonStudentMeetings"}
            name={"commonStudentMeetings"}
          />
        </div>
        <div className="w-full mb-2">
          <InputWithLabel
            readOnly={view}
            label={"تقسیم لٹریچر"}
            placeholder={"تقسیم لٹریچر"}
            required={true}
            type={"number"}
            id={"commonLiteratureDistribution"}
            name={"commonLiteratureDistribution"}
          />
        </div>
      </div>
      {localStorage.getItem("@type") !== "division" && (
        <div className=" w-full lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          <div className="w-full md:pr-0 mb-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">مرتب</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  id="registeredTosee"
                  name="registeredTosee"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
