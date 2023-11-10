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
      title: "تعلیمی ذیلی حلقے",
      numberOfInputFields: 6,
    },
    {
      title: "کل ذیلی حلقے",
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
      <table className="w-full border border-gray-400 table">
        <thead>
          <tr className="flex w-full items-start justify-between bg-gray-100">
            {headings.map((heading, index) => (
              <th
                className="w-[10rem] text-start text-lg sm:text-sm"
                key={index}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              className="flex w-full items-center justify-between bg-gray-100"
              key={index}
            >
              <td className="w-[10rem]  text-start text-lg sm:text-sm">
                {row.title}
              </td>
              {Array.from({ length: row.numberOfInputFields }, (_, index) => (
                <td key={index}>
                  <InputWithLabel label={""} type={"number"} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
