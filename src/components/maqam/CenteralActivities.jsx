import React from "react";

import { InputWithLabel } from "../InputWithLabel";

export const CenteralActivities = () => {
  const headings = [
    "تنظیم",
    "آغازمیں",
    "اضافء",
    "کمی",
    "اختتام",
    "فعال",
    "غیرفعال",
  ];
  const rows = [
    {
      title: "رھاشی حلقے",
      numberOfInputFields: 6,
    },
    {
      title: " ﺗﻌﻠﯾﻣﯽ ﺣﻠﻘﮯ",
      numberOfInputFields: 6,
    },
    {
      title: "ﮐل ﺣﻠﻘﮯ",
      numberOfInputFields: 6,
    },
    {
      title: "رھاشی ذﯾﻠﯽ حلقے",
      numberOfInputFields: 6,
    },
    {
      title: "ﮐل ذﯾﻠﯽ حلقے",
      numberOfInputFields: 6,
    },
    {
      title: "رھاشی حلقے",
      numberOfInputFields: 6,
    },
    {
      title: "ﺑزم ﮐﮯ ﺳﮑول ﯾوﻧﭨس",
      numberOfInputFields: 6,
    },
    {
      title: "ﺑزم ﮐﮯ رھﺎﺷﯽ ﯾوﻧﭨس",
      numberOfInputFields: 6,
    },
    {
      title: "ﺑزم ﮐﮯ ﮐل ﯾوﻧﭨس",
      numberOfInputFields: 6,
    },
  ];
  return (
    <div className="w-full max-w-full overflow-x-scroll " dir="rtl">
      <table className="w-full border border-gray-400 ">
        <div className=" flex w-full items-start justify-between bg-gray-100 p-2">
          <tr className=" mb-3 flex w-full items-start justify-between bg-gray-100">
            {headings.map((heading) => (
              <td className="w-full text-start text-lg">{heading}</td>
            ))}
          </tr>
        </div>
        <div className="flex w-full min-w-[700px] flex-col items-start justify-between  p-2">
          {rows.map((row, index) => (
            <tr
              className=" mb-5 flex w-full items-start justify-between bg-gray-100"
              key={index}
            >
              <td className="w-[8rem]">{row.title}</td>
              {Array.from({ length: row.numberOfInputFields }, (_, index) => (
                <td key={index}>
                  <InputWithLabel label={""} type={"number"} />
                </td>
              ))}
            </tr>
          ))}
        </div>
      </table>
    </div>
  );
};
