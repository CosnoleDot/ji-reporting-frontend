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
export const MenTable = () => {
  const userType = localStorage.getItem("@type");
  return (
    <div className="w-full" dir="rtl">
      <table className="w-full border border-gray-400 rounded-lg table  overflow-x-scroll">
        <thead className="bg-gray-100">
          <tr className="flex flex-row w-full ">
            {columns.map((column, index) => (
              <td key={index} className=" p-2 text-center w-full">
                {column}
              </td>
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
                      label={""}
                      type={"number"}
                      name={`${row?.key}-start`}
                      id={`${row?.key}-start`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      label={""}
                      type={"number"}
                      name={`${row?.key}-increase`}
                      id={`${row?.key}-increase`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      label={""}
                      type={"number"}
                      name={`${row?.key}-decrease`}
                      id={`${row?.key}-decrease`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
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
                      label={""}
                      type={"number"}
                      name={`${row?.key}-start`}
                      id={`${row?.key}-start`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      label={""}
                      type={"number"}
                      name={`${row?.key}-increase`}
                      id={`${row?.key}-increase`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
                      label={""}
                      type={"number"}
                      name={`${row?.key}-decrease`}
                      id={`${row?.key}-decrease`}
                    />
                  </td>
                  <td className="flex flex-row w-full">
                    <InputWithLabel
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
