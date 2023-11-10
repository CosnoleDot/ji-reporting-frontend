import React from "react";
import { InputWithLabel } from "../InputWithLabel";

export const Zila = () => {
  const headings = ["زﯾﻠﯽ طﮯ ﺷدھ ﺳرﮔرﻣﯾﺎں", "طﮯﺷدھ", "ﻣﻧﻌﻘدھ", "اوﺳط ﺣﺎﺿری"];
  const rows = [
    {
      title: "اﺟﺗﻣﻊ رﻓﻘﺎ",
      numberOfInputFields: 3,
    },
    {
      title: " ﺳﭨڈی ﺳرﮐل",
      numberOfInputFields: 3,
    },
    {
      title: "اﺟﺗﻣﻊ ﮐﺎرﮐﻧﺎن",
      numberOfInputFields: 3,
    },
    {
      title: "درس ﻗرآن ",
      numberOfInputFields: 3,
    },
    {
      title: " ﺷﺎﮨﯾن ﻣﯾﭨﻧﮓ",
      numberOfInputFields: 3,
    },
    {
      title: "ﭘﯾﻐﺎم ﻣﺣﻔل",
      numberOfInputFields: 3,
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-scroll" dir="rtl">
      <table className="w-full border border-gray-400 table">
        <thead>
          <tr className=" flex w-full items-start justify-between bg-gray-100">
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
