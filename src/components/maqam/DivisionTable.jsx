import React from "react";

import { InputWithLabel } from "../InputWithLabel";

export const DivisionTable = () => {
  const headings = ["ﻣرﮐزی طﮯ ﺷدھ ﺳرﮔرﻣﯾﺎں", "طﮯﺷدھ", "ﻣﻧﻌﻘدھ", "اوﺳط ﺣﺎﺿری"];
  const rows = [
    {
      title: "اﺟﺗﻣ ارﮐﺎن",
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
      <table className="w-full border border-gray-400 ">
        <div className=" flex w-full items-start justify-between bg-gray-100 p-2">
          <tr className=" mb-3 flex w-full items-start justify-between bg-gray-100">
            {headings.map((heading, index) => (
              <td className="w-full text-start text-lg" key={index}>
                {heading}
              </td>
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
