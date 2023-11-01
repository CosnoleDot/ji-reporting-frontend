import React from "react";

export const ExpandParty = () => {
  return (
    <div className="w-full" dir="rtl">
      <h3 className="text-lg mb-3">توسیع دعوت</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label className="text-lg mb-2" htmlFor="">
            روابط
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label className="text-lg mb-2" htmlFor="">
            موجود
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 2"
          />
        </div>
      </div>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label className="text-lg mb-2" htmlFor="">
            ملاقاتیں
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label className="text-lg mb-2" htmlFor="">
            روابط رجسٹر
          </label>
          <div className="mt-4 flex">
            <label className="text-md mb-1 block">
              <input type="radio" className="mr-2" name="radio-group" />
              مرتب
            </label>
            <label className="text-md mb-1 block">
              <input type="radio" className="mr-2" name="radio-group" />
              غیرمرتب
            </label>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h3 className="text-xl">عام طلبء</h3>
      </div>
      <div className=" w-full lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label className="text-lg mb-2" htmlFor="">
            ملاقاتیں
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label className="text-lg mb-2" htmlFor="">
            تقسیم لٹریچر
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 2"
          />
        </div>
      </div>
    </div>
  );
};
