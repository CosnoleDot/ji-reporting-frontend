import React from "react";
import { InputWithLabel } from "./InputWithLabel";

export const MessageDigest = () => {
  return (
    <div className="w-full" dir="rtl">
      <h3 className="text-lg mb-3 font-bold">پیغام ڈائجسٹ</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full mb-3">
          <InputWithLabel
            label={"کل موصولہ"}
            placeholder={"کل موصولہ"}
            required={true}
            type={"number"}
            name={"totalReceived"}
            id={"totalReceived"}
          />
          <InputWithLabel
            label={"فروخت کردہ"}
            placeholder={"فروخت کردہ"}
            required={true}
            type={"number"}
            name={"totalSold"}
            id={"totalSold"}
          />
        </div>
      </div>
    </div>
  );
};
