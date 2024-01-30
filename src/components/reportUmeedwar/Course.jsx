import React from "react";
import { InputWithLabel } from "../InputWithLabel";
const course = [
  {
    title: "تعلیمی ادارے میں حاضری کتنے دن رہی",
    type: "number",
    key: "institutionAttendance",
  },
];
export const Course = ({ view }) => {
  return (
    <div className="w-full">
      <h3 className="block w-full text-start font-medium text-sm p-3">کورس</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        {course.map((obj, index) => (
          <div className="w-full md:pr-0 mb-2" key={index}>
            <InputWithLabel
              readOnly={view}
              placeholder={obj.title}
              label={obj.title}
              id={obj?.key}
              name={obj?.key}
              type={obj?.type}
              required={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
