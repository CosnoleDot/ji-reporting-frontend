import { FaCheck, FaTimes } from "react-icons/fa";

export const Notifications = () => {
  return (
    <div className="card-body h-[320px] overflow-y-scroll">
      {[1, 2, 3, 4].map(() => (
        <div className="p-3 hover:bg-slate-300 flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-start">
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1159/1159740.png"
                  alt="logo"
                />
              </div>
            </div>
            <div className="flex flex-col px-3">
              <span className="font-semibold">Abdul Raheem</span>
              <span>abdulraheem@consoledot.com</span>
            </div>
          </div>
          <div className="flex items-center justify-end lg:justify-start gap-3 py-2">
            <button className="p-2 bg-slate-200 rounded-lg">
              <FaCheck />
            </button>
            <button className="p-2 bg-slate-200 rounded-lg">
              <FaTimes />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
