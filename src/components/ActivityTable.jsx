import React from "react";
import { InputWithLabel } from "./InputWithLabel";

const headings = ["تعشد سرگرمیا", "تعشد ", "منقیدہ", "حاضری", "عنوان"];

export const ActivityTable = ({ view }) => {
  const userType = localStorage.getItem("@type");
  const rows = [
    {
      key: "ijtRafaqa",
      title: "اﺟﺗﻣﻊ رﻓﻘﺎ",
    },
    {
      key: userType === "maqam" ? "studyCircleMentioned" : "studyCircle",
      title: " ﺳﭨڈی ﺳرﮐل",
    },
    { key: "ijtKarkunan", title: "اﺟﺗﻣﻊ ﮐﺎرﮐﻧﺎن" },
    { key: "darseQuran", title: "درس ﻗرآن " },
  ];
  return (
    <div className="w-full p-4" dir="rtl">
      <table className="w-full border border-gray-400 rounded-lg">
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
              <td className="w-full  text-start text-lg sm:text-sm">
                {row.title}
              </td>

              <td className="flex flex-row w-full">
                <InputWithLabel
                  readOnly={view}
                  label={""}
                  type={"number"}
                  name={`${row?.key}-decided`}
                  id={`${row?.key}-decided`}
                />
              </td>
              <td className="flex flex-row w-full">
                <InputWithLabel
                  readOnly={view}
                  label={""}
                  type={"number"}
                  name={`${row?.key}-completed`}
                  id={`${row?.key}-completed`}
                />
              </td>
              <td className="flex flex-row w-full">
                <InputWithLabel
                  readOnly={view}
                  label={""}
                  type={"number"}
                  name={`${row?.key}-attendance`}
                  id={`${row?.key}-attendance`}
                />
              </td>
              <td className="flex flex-row w-full">
                <InputWithLabel
                  readOnly={view}
                  label={""}
                  type={"text"}
                  name={`${row?.key}-title`}
                  id={`${row?.key}-title`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
