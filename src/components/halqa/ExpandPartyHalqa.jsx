import { useEffect } from "react";
import { InputWithLabel } from "../InputWithLabel";

export const ExpandPartyHalqa = ({ view, rawabit }) => {
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
    { title: "مرتب", key: "registeredTosee" },
  ];

  const calculateRawabit = () => {
    if (rawabit !== undefined) {
      const arkan = parseInt(rawabit["arkan-end"]);
      const umeedwaran = parseInt(rawabit["umeedWaran-end"]);
      const rafaqa = parseInt(rawabit["rafaqa-end"]);
      const totalA = arkan + umeedwaran * 3;
      const totalB = rafaqa * 2;
      return totalA + totalB;
    }
    return {};
  };

  return (
    <div className="w-full mb-4 " dir="rtl">
      <fieldset className="p-3 border">
        <legend className="text-xl font-bold mb-3">توسیع دعوت</legend>
        <div className="w-full md:pr-0 flex justify-start items-center mb-2">
          <label className="text-lg  font-bold" htmlFor="">
            روابط
          </label>
        </div>
        <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          {arr.map((obj, index) => (
            <div className="w-full mb-2" key={index}>
              <InputWithLabel
                readOnly={view}
                type={obj.key === "registeredTosee" ? "checkbox" : "number"}
                label={obj?.title}
                required={true}
                name={obj?.key}
                id={obj?.key}
                value={obj.key === "rawabitDecided" ? calculateRawabit() : ""}
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
      </fieldset>
    </div>
  );
};
