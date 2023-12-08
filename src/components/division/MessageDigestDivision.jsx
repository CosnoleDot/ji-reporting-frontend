import { InputWithLabel } from "../InputWithLabel";

export const MessageDigestDivision= ({ view }) => {
  return (
    <div className="w-full" dir="rtl">
      <fieldset className="border p-3">
        <legend className="text-lg mb-3 font-bold">پیغام ڈائجسٹ</legend>
        <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          <div className="w-full mb-3">
            <InputWithLabel
              readOnly={view}
              label={"کل موصولہ"}
              placeholder={"کل موصولہ"}
              required={true}
              type={"number"}
              name={"totalReceived"}
              id={"totalReceived"}
            />
            <InputWithLabel
              readOnly={view}
              label={"فروخت کردہ"}
              placeholder={"فروخت کردہ"}
              required={true}
              type={"number"}
              name={"totalSold"}
              id={"totalSold"}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
};
