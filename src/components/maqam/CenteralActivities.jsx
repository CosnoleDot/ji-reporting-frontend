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
      key: "rehaishHalqay",
      label: "رھاشی حلقے",
    },
    {
      key: "taleemHalqay",
      label: " ﺗﻌﻠﯾﻣﯽ ﺣﻠﻘﮯ",
    },
    {
      key: "totalHalqay",
      label: "ﮐل ﺣﻠﻘﮯ",
    },
    {
      key: "subRehaishHalqay",
      label: "رھاشی ذﯾﻠﯽ حلقے",
    },
    {
      key: "subTaleemHalqay",
      label: "تعلیمی ذیلی حلقے",
    },
    {
      key: "subTotalHalqay",
      label: "کل ذیلی حلقے",
    },
    {
      key: "busmSchoolUnits",
      label: "ﺑزم ﮐﮯ ﺳﮑول ﯾوﻧﭨس",
    },
    {
      key: "busmRehaishUnits",
      label: "ﺑزم ﮐﮯ رھﺎﺷﯽ ﯾوﻧﭨس",
    },
    {
      key: "busmTotalUnits",
      label: "ﺑزم ﮐﮯ ﮐل ﯾوﻧﭨس",
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
              <td className="flex flex-row w-full ">{row.label}</td>
              <td className="flex flex-row w-full">
                <InputWithLabel
                  label={""}
                  type={"number"}
                  name={`${row.key}-start`}
                  id={`${row.key}-start`}
                />
              </td>
              <td className="flex flex-row w-full">
                <InputWithLabel
                  label={""}
                  type={"number"}
                  name={`${row.key}-increase`}
                  id={`${row.key}-increase`}
                />
              </td>
              <td className="flex flex-row w-full">
                <InputWithLabel
                  label={""}
                  type={"number"}
                  name={`${row.key}-decrease`}
                  id={`${row.key}-decrease`}
                />
              </td>
              <td className="flex flex-row w-full">
                <InputWithLabel
                  label={""}
                  type={"number"}
                  name={`${row.key}-continue`}
                  id={`${row.key}-continue`}
                />
              </td>
              <td className="flex flex-row w-full">
                <InputWithLabel
                  label={""}
                  type={"number"}
                  name={`${row.key}-paused`}
                  id={`${row.key}-paused`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
