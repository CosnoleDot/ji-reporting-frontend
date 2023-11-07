import React from "react";

const headings = ["تعشد سرگرمیا", "تعشد ", "منقیدہ", "حاضری", "عنوان", "تعداد"];

const data = [
  {
    id: 1,
    taeshudasargarmiya: "Value1",
    taeshudamunaqida: "Value2",
    hazri: "Value3",
    unwan: "Value4",
    tadaad: "Value5",
  },
  {
    id: 2,
    taeshudasargarmiya: "Value6",
    taeshudamunaqida: "Value7",
    hazri: "Value8",
    unwan: "Value9",
    tadaad: "Value10",
  },
  // Add more data objects here
];

export const ActivityTable = () => {
  return (
    <div className="w-full p-3" dir="rtl">
      <table className="w-full border border-gray-400 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {headings.map((heading, index) => (
              <th key={index} className="border border-gray-400 p-2">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {headings.map((heading, index) => (
                <td key={index} className="border border-gray-400 p-2">
                  {row[heading.toLowerCase().replace(" ", "")]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
