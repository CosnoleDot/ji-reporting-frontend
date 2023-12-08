import { useState } from "react";
import { useEffect } from "react";
import { InputWithLabel } from "../InputWithLabel";
const columns = [
  "",
  "  آغاز میں",
  "اضافہ",
  "کمی",
  "اختاتام",
  "سالانہ ہدف",
  "مرتب",
];
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

export const MenTableMaqam = ({ view }) => {
  const [userType, setUserType] = useState("");
  const [endingValue, setEndingValue] = useState({});

  useEffect(() => {
    setUserType(localStorage.getItem("@type"));
  }, [userType]);

  const calcultate = (value) => {
    const i = parseInt(endingValue[`${value}-increase`]);
    const d = parseInt(endingValue[`${value}-decrease`]);
    const s = parseInt(endingValue[`${value}-start`]);
    return (endingValue[`${value}-end`] = i + s - d);
  };

  return (
    <div className="w-full max-w-full overflow-x-scroll mb-4" dir="rtl">
      <fieldset className="border p-3">
        <legend className="text-xl font-bold ">افرادی قوت</legend>
        <table className="w-full  table">
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
            {row.map((row, index) => (
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
                    onChange={(e) =>
                      setEndingValue({
                        ...endingValue,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="flex flex-row w-full">
                  <InputWithLabel
                    readOnly={view}
                    label={""}
                    type={"number"}
                    name={`${row?.key}-increase`}
                    id={`${row?.key}-increase`}
                    onChange={(e) =>
                      setEndingValue({
                        ...endingValue,
                        [e.target.id]: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="flex flex-row w-full">
                  <InputWithLabel
                    readOnly={view}
                    label={""}
                    type={"number"}
                    name={`${row?.key}-decrease`}
                    id={`${row?.key}-decrease`}
                    onChange={(e) =>
                      setEndingValue({
                        ...endingValue,
                        [e.target.id]: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="flex flex-row w-full">
                  <InputWithLabel
                    readOnly={view}
                    label={""}
                    type={"number"}
                    name={`${row?.key}-end`}
                    id={`${row?.key}-end`}
                    value={calcultate(`${row?.key}`)}
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
                {row.key !== "arkan" ? (
                  <td className="flex flex-row w-full max-w-[10rem]">
                    <input
                      type={"checkbox"}
                      name={`${row?.key}-registered`}
                      id={`${row?.key}-registered`}
                    />
                  </td>
                ) : (
                  <>
                    <div className="min-w-[10rem]"></div>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
};
