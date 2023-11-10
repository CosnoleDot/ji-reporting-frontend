import React from "react";

export const EveningDiary = () => {
  const arr = [
    {
      title: "کتنے ارکان فل کرتے ھیں",
      placeholder: "کتنے ارکان فل کرتے ھیں",
    },
    {
      title: "کتنےرفقافل کرتے ھیں",
      placeholder: "کتنےرفقافل کرتے ھیں",
    },
    {
      title: "تبصرہ",
      placeholder: "تبصرہ",
    },
    {
      title: "نام ناظم حلقء",
      placeholder: "نام ناظم حلقء",
    },
    {
      title: "تاریخ",
      placeholder: "تاریخ",
    },
  ];
  return (
    <div className="w-full" dir="rtl">
      <h3 className="text-xl mb-3 font-bold">روزشب ڈاءری</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {arr.map((obj, index) => (
          <div className="w-full md:pr-0 mb-2" key={index}>
            <label htmlFor="">{obj.title}</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg mt-3 mb-3"
              placeholder={obj.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
