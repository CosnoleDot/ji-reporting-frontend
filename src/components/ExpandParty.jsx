import React from "react";

export const ExpandParty = () => {
  const arr = [
    {
      title: "طے شدہ",
      placeholder: "طے شدہ",
    },
    {
      title: "موجود",
      placeholder: "موجود",
    },
    {
      title: "ملاقاتیں",
      placeholder: "ملاقاتیں",
    },
    {
      title: "تقسیم لٹریچر",
      placeholder: "تقسیم لٹریچر",
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
            <label className="text-lg " htmlFor="">
              {obj.title}
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg mt-3"
              placeholder={obj.placeholder}
            />
          </div>
        ))}
      </div>

      <div className="w-full">
        <h3 className="text-xl mb-3">عام طلبء</h3>
      </div>
      <div className=" w-full lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label className="text-lg mb-3" htmlFor="">
            ملاقاتیں
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg mt-3 mb-3"
            placeholder="ملاقاتیں"
          />
        </div>
        <div className="w-full mb-2">
          <label className="text-lg mb-2" htmlFor="">
            تقسیم لٹریچر
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg mt-5"
            placeholder=" تقسیم لٹریچر"
          />
        </div>
      </div>
    </div>
  );
};
