import React from "react";

const data = ["Value1", "Value2", "Value3", "Value4", "Value5", "Value6"];

const columns = [
  " افرادی قوت",
  "  آغاز میں",
  "اضافہ",
  "کمی",
  "اختتام",
  "سالانہ ہدف",
];

export const MenTable = () => {
  return (
    <div className="w-full p-4 overflow-x-scroll" dir="rtl">
      <table className="w-full border border-gray-400 rounded-lg table">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-400 p-2 text-start">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.map((column, columnIndex) => (
              <td
                key={columnIndex}
                className="border border-gray-400 p-2 text-start"
              >
                {column}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
