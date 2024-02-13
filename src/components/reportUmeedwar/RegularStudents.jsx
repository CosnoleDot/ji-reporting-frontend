import React from "react";
import { InputWithLabel } from "../InputWithLabel";

export const RegularStudents = () => {
  return (
    <div className="w-full">
      <h2 className="w-full text-center font-bold">عام طلبہ</h2>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <InputWithLabel
            // readOnly={view}
            placeholder={"..."}
            label={"کتنے عام طلبہ سے ملاقاتیں کیں"}
            id={"genralStudentsCount"}
            name={"genralStudentsCount"}
            type={"number"}
            required={true}
          />
          <InputWithLabel
            // readOnly={view}
            placeholder={"..."}
            label={" عام طلبہ سے کل کتنی ملاقاتیں کیں"}
            id={"genralStudentsTotalMeetups"}
            name={"genralStudentsTotalMeetups"}
            type={"number"}
            required={true}
          />
          <InputWithLabel
            // readOnly={view}
            placeholder={"..."}
            label={" عام طلبہ میں کتنا لیٹریچرتقسیم کیا"}
            id={"genralStudentsTotalLitratureDivided"}
            name={"genralStudentsTotalLitratureDivided"}
            type={"number"}
            required={true}
          />
        </div>
      </div>
    </div>
  );
};
