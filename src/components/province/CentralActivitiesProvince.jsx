import { InputWithLabel } from "../InputWithLabel";

const headings = ["", "طے شدہ", "منعقدہ", "اوسط حاضری", "مرتب"];
const rows = [
  {
    title: "ڈویژنل مشاورات",
    key: "divMushawarat",
  },
  {
    title: "اجتماع ارکان",
    key: "ijtArkan",
  },
  {
    title: "سٹڈی سرکل",
    key: "studyCircle",
  },
  {
    title: "اجتماع ناظمین",
    key: "ijtNazmeen",
  },
  {
    title: "اجتماع امیدواران",
    key: "ijtUmeedwaran",
  },
  {
    title: "صدورمیٹینگ",
    key: "sadurMeeting",
  },
  { key: "registered" },
];
export const CentralActivitiesProvince = ({ view }) => {
  return (
    <div className="w-full max-w-full overflow-x-scroll " dir="rtl">
      <fieldset className="border p-3">
        <legend className="text-xl font-bold p-1">مرکزی طےشدہ سرگرمیاں</legend>
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
