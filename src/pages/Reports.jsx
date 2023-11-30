import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { GeneralLayout } from "../components";

export const months = [
  {
    title: "January",
    value: 1,
  },
  {
    title: "February",
    value: 2,
  },
  {
    title: "March",
    value: 3,
  },
  {
    title: "April",
    value: 4,
  },
  {
    title: "May",
    value: 5,
  },
  {
    title: "June",
    value: 6,
  },
  {
    title: "July",
    value: 7,
  },
  {
    title: "August",
    value: 8,
  },
  {
    title: "September",
    value: 9,
  },
  {
    title: "October",
    value: 10,
  },
  {
    title: "November",
    value: 11,
  },
  {
    title: "December",
    value: 12,
  },
];
export const Reports = () => {
  return (
    <GeneralLayout active={"reports"}>
      <div className="relative flex flex-col gap-3 items-center p-5 justify-center h-[calc(100vh-65.6px-64px)]">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-bold text-xl hidden lg:block xl:block">
            Reports
          </h3>
          <div className="join">
            <select className="select select-bordered join-item">
              <option disabled selected>
                Month
              </option>
              {months.map((month, index) => (
                <option value={month.value} key={index}>
                  {month.title}
                </option>
              ))}
            </select>
            <select className="select select-bordered join-item">
              <option disabled selected>
                Year
              </option>
              {Array(10)
                .fill(1)
                .map((_, index) => (
                  <option key={index}>{2023 + index}</option>
                ))}
            </select>
            <div className="indicator">
              {/* <span className='indicator-item badge badge-secondary'>new</span> */}
              <button className="btn join-item">Search</button>
            </div>
          </div>
          <button className="btn">
            <FaPlus />{" "}
            <span className="hidden lg:block xl:block">New Report</span>
          </button>
        </div>
        <div className="relative overflow-y-scroll gap-3 w-full items-center p-5 justify-center h-[calc(100vh-65.6px-64px-48px)]">
          {[1, 2, 3, 4, 5].map(() => (
            <div className="card-body flex items-center justify-between w-full p-5 mb-1 bg-slate-200 rounded-xl flex-row">
              <div className="flex flex-col items-start justify-center">
                <span className="text-lg font-semibold">Jan, 2023</span>
                <span>Last Modified: Jan 02, 2023</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button className="btn">
                  <FaEye />
                </button>
                <button className="btn">
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GeneralLayout>
  );
};
