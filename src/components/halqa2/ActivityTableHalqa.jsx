import { InputWithLabel } from "../InputWithLabel";

const columns = ["", "طےشدہ ", "منعقدہ", "حاضری", "عنوان", "مرتب"];

export const ActivityTableHalqa = ({ view }) => {
  const rows = [
    {
      key: "ijtRafaqa",
      title: "احتمع رفقا",
    },
    {
      key: "studyCircle",
      title: "سٹڈی سرکل",
    },
    { key: "ijtKarkunan", title: "اجتماع کارکنان" },
    { key: "darseQuran", title: " درس قُرآن" },
    { key: "registered" },
  ];
  return (
    <div className="w-full max-w-full overflow-x-scroll mb-4" dir="rtl">
      <fieldset className="border p-3"> 
        <legend className="text-xl font-bold p-1">طے شدہ سرگرمیاں</legend>
        <table className="w-full table">
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

                <td className="flex flex-row w-full max-w-[10rem]">
                  <input
                    type={"checkbox"}
                    name={`${row?.key}-registered`}
                    id={`${row?.key}-registered`}
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
