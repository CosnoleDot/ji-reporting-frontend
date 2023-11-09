import React from "react";

const data = ["Value1", "Value2", "Value3", "Value4", "Value5", "Value6"];

const columns = [
  " افرادی قوت",
  "  آغاز میں",
  "اختتام معیاد",
  "سالانہ ہدف",
  "اَرکان",
  "امیدوار",
];

export const MenTable = () => {
  return (
    <div className="w-full p-4" dir="rtl">
      <table className="w-full border border-gray-400 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-400 p-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.map((column, columnIndex) => (
              <td key={columnIndex} className="border border-gray-400 p-2">
                {column}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {/* <div className="mt-4">
        <label className="block">
          <input type="radio" className="mr-2" name="radio-group" />
          پہلا ریڈیو بٹن
        </label>
        <label className="block">
          <input type="radio" className="mr-2" name="radio-group" />
          دوسری ریڈیو بٹن
        </label>
      </div> */}
    </div>
  );
};
