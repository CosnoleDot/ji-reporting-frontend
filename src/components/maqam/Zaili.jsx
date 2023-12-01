import React from "react";
import { InputWithLabel } from "../InputWithLabel";

export const Zaili = () => {
  const headings = ["زﯾﻠﯽ طﮯ ﺷدھ ﺳرﮔرﻣﯾﺎں", "طﮯﺷدھ", "ﻣﻧﻌﻘدھ", "اوﺳط ﺣﺎﺿری"];
  const rows = [
    {
      key: "ijtRafaqa",
      title: "اﺟﺗﻣﻊ رﻓﻘﺎ",
    },
    {
      key: "studyCircleMentioned",
      title: " ﺳﭨڈی ﺳرﮐل",
    },
    { key: "ijtKarkunan", title: "اﺟﺗﻣﻊ ﮐﺎرﮐﻧﺎن" },
    { key: "darseQuran", title: "درس ﻗرآن " },
    { key: "shaheenMeeting", title: " ﺷﺎﮨﯾن ﻣﯾﭨﻧﮓ" },
    { key: "paighamEvent", title: "ﭘﯾﻐﺎم ﻣﺣﻔل" },
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

              <td className="flex flex-row w-full">
                <InputWithLabel
                  label={""}
                  type={"number"}
                  name={`${row?.key}-decided`}
                  id={`${row?.key}-decided`}
                />
              </td>
              <td className="flex flex-row w-full">
                <InputWithLabel
                  label={""}
                  type={"number"}
                  name={`${row?.key}-done`}
                  id={`${row?.key}-done`}
                />
              </td>
              <td className="flex flex-row w-full">
                <InputWithLabel
                  label={""}
                  type={"number"}
                  name={`${row?.key}-averageAttendance`}
                  id={`${row?.key}-averageAttendance`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
