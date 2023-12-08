import { InputWithLabel } from "../InputWithLabel";

const arr = [
  {
    title: "دعوتی وفود",
    key: "dawatiWafud",
  },
  {
    title: "روابط پارٹیز",
    key: "rawabitParties",
  },

  {
    title: "حدیث سرکل",
    key: "hadithCircle",
  },
  {
    title: "نظام الصلٰتہ",
    key: "nazimSalah",
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
export const OtherActivitiesHalqa = ({ view }) => {
  return (
    <div className="w-full mb-4 " dir="rtl">
      <fieldset className="border p-3">
        <legend className="w-full text-lg  font-bold ">دیگر سرگرمیاں</legend>
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
      </fieldset>
    </div>
  );
};
