import { InputWithLabel } from "../InputWithLabel";

export const ExpandPartyMaqam = ({ view }) => {
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
  return (
    <div className="w-full " dir="rtl">
      <fieldset className="border p-3">
        <legend className="text-xl font-bold mb-3">توسیع دعوت</legend>
        <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          <div className="w-full md:pr-0 flex justify-start items-center">
            <label className="text-lg mb-2 font-bold" htmlFor="">
              روابط
            </label>
          </div>
          {arr.map((obj, index) => (
            <div className="w-full mb-2" key={index}>
              <InputWithLabel
                readOnly={view}
                type={obj.key === "registeredTosee" ? "checkbox" : "number"}
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
      </fieldset>
    </div>
  );
};
