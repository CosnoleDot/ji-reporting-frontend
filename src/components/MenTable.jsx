import React from "react";
import { InputWithLabel } from "./InputWithLabel";

const columns = [" افرادی قوت", "  آغاز میں", "اضافہ", "کمی", "سالانہ ہدف"];
const row = [
  { label: "ارکان", key: "arkan" },
  {
    label: "امیدواران",
    key: "umeedWaran",
  },
  { label: "رفقا", key: "rafaqa" },
  {
    label: "کارکنان",
    key: "karkunan",
  },
  { label: "شاھین", key: "shaheen" },
  { label: "ممبرز", key: "members" },
];
const row2 = [
  { label: "ارکان", key: "arkan" },
  {
    label: "امیدواران",
    key: "umeedWaran",
  },
  { label: "رفقا", key: "rafaqa" },
  {
    label: "کارکنان",
    key: "karkunan",
  },
];
export const MenTable = ({ view }) => {
  const userType = localStorage.getItem("@type");
  return (
    <div className="w-full max-w-full overflow-x-scroll" dir="rtl">
      <table className="w-full border border-gray-400 rounded-lg table ">
        <thead>
          <tr className="flex w-full items-start justify-between bg-gray-100">
            {columns?.map((heading, index) => (
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
          {userType === "maqam" || userType === "division"
            ? row.map((row, index) => (
                <tr
                  className="flex w-full items-center justify-between bg-gray-100"
                  key={index}
                >
                  <td className="flex flex-row w-full ">{row.label}</td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      readOnly={view}
                      label={""}
                      type={"number"}
                      name={`${row?.key}-start`}
                      id={`${row?.key}-start`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      readOnly={view}
                      label={""}
                      type={"number"}
                      name={`${row?.key}-increase`}
                      id={`${row?.key}-increase`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      readOnly={view}
                      label={""}
                      type={"number"}
                      name={`${row?.key}-decrease`}
                      id={`${row?.key}-decrease`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      readOnly={view}
                      label={""}
                      type={"number"}
                      name={`${row?.key}-annual`}
                      id={`${row?.key}-annual`}
                    />
                  </td>
                </tr>
              ))
            : row2.map((row, index) => (
                <tr
                  className="flex w-full items-center justify-between bg-gray-100"
                  key={index}
                >
                  <td className="flex flex-row w-full ">{row.label}</td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      readOnly={view}
                      label={""}
                      type={"number"}
                      name={`${row?.key}-start`}
                      id={`${row?.key}-start`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      readOnly={view}
                      label={""}
                      type={"number"}
                      name={`${row?.key}-increase`}
                      id={`${row?.key}-increase`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      readOnly={view}
                      label={""}
                      type={"number"}
                      name={`${row?.key}-decrease`}
                      id={`${row?.key}-decrease`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      readOnly={view}
                      label={""}
                      type={"number"}
                      name={`${row?.key}-annual`}
                      id={`${row?.key}-annual`}
                    />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {userType !== "division" && (
        <div className=" w-full lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          <div className="w-full md:pr-0 mb-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">مرتب</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  id="registeredWorker"
                  name="registeredWorker"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
