import React from "react";

import { InputWithLabel } from "../InputWithLabel";

export const DivisionTable = () => {
  const headings = ["ﻣرﮐزی طﮯ ﺷدھ ﺳرﮔرﻣﯾﺎں", "طﮯﺷدھ", "ﻣﻧﻌﻘدھ", "اوﺳط ﺣﺎﺿری"];
  const rows = [
    {
      title: "اﺟﺗﻣﻊ ارﮐﺎن",
      numberOfInputFields: 3,
    },
    {
      title: " ﺳﭨڈی ﺳرﮐل",
      numberOfInputFields: 3,
    },
    {
      title: "اﺟﺗﻣﻊ ﻧﺎظﻣﯾن",
      numberOfInputFields: 3,
    },
    {
      title: "اﺟﺗﻣﻊ اﻣﯾدوار ",
      numberOfInputFields: 3,
    },
    {
      title: " ﺻدورﻣﯾﭨﯾﻧﮓ",
      numberOfInputFields: 3,
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
