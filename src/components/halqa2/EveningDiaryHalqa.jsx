import { InputWithLabel } from "../InputWithLabel";

const arr = [
  {
    title: "کتنے ارکان فل کرتے ھیں",
    placeholder: "کتنے ارکان فل کرتے ھیں",
    key: "umeedwaranFilled",
  },
  {
    title: "کتنےرفقافل کرتے ھیں",
    placeholder: "کتنےرفقافل کرتے ھیں",
    key: "rafaqaFilled",
  },
];
export const EveningDiaryHalqa = ({ view }) => {
  return (
    <div className="w-full mb-4" dir="rtl">
      <fieldset className="p-3 border">
        <legend className="text-xl  font-bold p-1">روزشب ڈائری</legend>
        <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          {arr.map((obj, index) => (
            <div className="w-full md:pr-0 mb-2" key={index}>
              <InputWithLabel
                readOnly={view}
                label={obj?.title}
                type={"number"}
                className="w-full border p-2 rounded-lg mt-3 mb-3"
                placeholder={obj?.placeholder}
                name={obj?.key}
                id={obj?.key}
              />
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};
