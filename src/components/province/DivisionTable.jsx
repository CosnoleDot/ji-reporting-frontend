import React from "react";

import { InputWithLabel } from "../InputWithLabel";

export const DivisionTable = ({ view }) => {
  const headings = ["ﻣرﮐزی طﮯ ﺷدھ ﺳرﮔرﻣﯾﺎں", "طﮯﺷدھ", "ﻣﻧﻌﻘدھ", "اوﺳط ﺣﺎﺿری"];
  const rows = [
    {
      title: "ڈویژنل مشاورات",
      key: "divMushawarat",
    },
    {
      title: "اﺟﺗﻣﻊ ارﮐﺎن",
      key: "ijtArkan",
    },
    {
      title: " ﺳﭨڈی ﺳرﮐل",
      key: "studyCircle",
    },
    {
      title: "اﺟﺗﻣﻊ ﻧﺎظﻣﯾن",
      key: "ijtNazmeen",
    },
    {
      title: "اﺟﺗﻣﻊ اﻣﯾدوار ",
      key: "ijtUmeedwaran",
    },
    {
      title: " ﺻدورﻣﯾﭨﯾﻧﮓ",
      key: "sadurMeeting",
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
          {rows.map((row, index) =>
            row?.key === "ijtArkan" ? (
              localStorage.getItem("@type") !== "division" ? (
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
                      name={`${row?.key}-done`}
                      id={`${row?.key}-done`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      readOnly={view}
                      label={""}
                      type={"number"}
                      name={`${row?.key}-averageAttendance`}
                      id={`${row?.key}-averageAttendance`}
                    />
                  </td>
                </tr>
              ) : (
                <></>
              )
            ) : row?.key === "divMushawarat" ? (
              localStorage.getItem("@type") === "province" ? (
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
                      name={`${row?.key}-done`}
                      id={`${row?.key}-done`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      readOnly={view}
                      label={""}
                      type={"number"}
                      name={`${row?.key}-averageAttendance`}
                      id={`${row?.key}-averageAttendance`}
                    />
                  </td>
                </tr>
              ) : (
                <></>
              )
            ) : (
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
                    name={`${row?.key}-done`}
                    id={`${row?.key}-done`}
                  />
                </td>
                <td className="flex flex-row w-full">
                  <InputWithLabel
                    readOnly={view}
                    label={""}
                    type={"number"}
                    name={`${row?.key}-averageAttendance`}
                    id={`${row?.key}-averageAttendance`}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
