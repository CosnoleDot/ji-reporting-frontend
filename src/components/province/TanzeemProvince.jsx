import { InputWithLabel } from "../InputWithLabel";

export const TanzeemProvince = ({ view }) => {
  const headings = ["", "آغازمیں", "اِضافہ", "کمی", "اختتام پر", "فعال", "غیرفعال"];
  const rows = [
    {
      key: "rehaishHalqay",
      label: "رہائشی حلقے",
    },
    {
      key: "taleemHalqay",
      label: "تعلیمی حلقے",
    },
    {
      key: "totalHalqay",
      label: "کل حلقے",
    },
    {
      key: "subRehaishHalqay",
      label: "رہاشی زیلی حلقے",
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
      label: "بزم کے سکول یونٹس",
    },
    {
      key: "busmRehaishUnits",
      label: "بزم کےرہاشی یونٹس",
    },
    {
      key: "busmTotalUnits",
      label: "بزم کے کل یونٹس",
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-scroll " dir="rtl">
      <fieldset className="border p-3">
        <legend className="text-xl font-bold">تنظیم</legend>
        <table className="w-full table">
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
                    readOnly={view}
                    label={""}
                    type={"number"}
                    name={`${row.key}-start`}
                    id={`${row.key}-start`}
                  />
                </td>
                <td className="flex flex-row w-full">
                  <InputWithLabel
                    readOnly={view}
                    label={""}
                    type={"number"}
                    name={`${row.key}-increase`}
                    id={`${row.key}-increase`}
                  />
                </td>
                <td className="flex flex-row w-full">
                  <InputWithLabel
                    readOnly={view}
                    label={""}
                    type={"number"}
                    name={`${row.key}-decrease`}
                    id={`${row.key}-decrease`}
                  />
                </td>
                <td className="flex flex-row w-full">
                  <InputWithLabel
                    readOnly={view}
                    label={""}
                    type={"number"}
                    name={`${row.key}-end`}
                    id={`${row.key}-end`}
                  />
                </td>
                <td className="flex flex-row w-full">
                  <InputWithLabel
                    readOnly={view}
                    label={""}
                    type={"number"}
                    name={`${row.key}-continue`}
                    id={`${row.key}-continue`}
                  />
                </td>
                <td className="flex flex-row w-full">
                  <InputWithLabel
                    readOnly={view}
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
      </fieldset>
    </div>
  );
};
