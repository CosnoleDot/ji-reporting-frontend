import React from "react";
import { InputWithLabel } from "../InputWithLabel";
const tafseerQuran = [
  {
    title: "کل کتنےدن پڑھی",
    type: "number",
    key: "tafseerTotalDays",
  },
  {
    title: "کون سی سورۃپڑھی",
    type: "text",
    key: "tafseerSurah",
  },
  {
    title: "کل کتنے رکوع پڑھے",
    type: "number",
    key: "tafseerTotalRakoo",
  },
];
export const TafseerQuran = ({ view }) => {
  return (
    <div className="w-full">
      <h3 className="block w-full text-start font-medium text-sm p-3">
        تفسیرِقُرآن
      </h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {tafseerQuran.map((obj, index) => (
          <div className="w-full md:pr-0 mb-2" key={index}>
            <InputWithLabel
              readOnly={view}
              placeholder={obj.title}
              label={obj.title}
              id={obj?.key}
              name={obj?.key}
              type={obj?.type}
              required={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
