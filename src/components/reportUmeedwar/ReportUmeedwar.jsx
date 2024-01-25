import React, { useState } from "react";
import { GeneralLayout } from "../layoutComponents";
import { InputWithLabel } from "../InputWithLabel";
import { Rawabit1, Rawabit2, Rawabit3 } from "./rawaabit";
import { RegularStudents } from "./RegularStudents";
import { convertDataFormat, toJson } from "../../utils";
const intro = [
  {
    title: "نام",
    type: "text",
    key: "name",
  },
  {
    title: "جمیعت سے تعلق",
    type: "text",
    key: "relation",
  },
  {
    title: "تنظیمی تعلق",
    type: "text",
    key: "organizationRelation",
  },

  {
    title: "موجودہ زمہ داری",
    type: "text",
    key: "presentDuty",
  },
];
const fajarNamaz = [
  {
    title: "کل تعداد",
    type: "text",
    key: "total",
  },
  {
    title: "باجماعت",
    type: "text",
    key: "onTime",
  },
  {
    title: "انفرادی",
    type: "text",
    key: "infradi",
  },

  {
    title: "قضا",
    type: "text",
    key: "left",
  },
];
const otherNamaz = [
  {
    title: "کل تعداد",
    type: "text",
    key: "total",
  },
  {
    title: "باجماعت",
    type: "text",
    key: "onTime",
  },
  {
    title: "انفرادی",
    type: "text",
    key: "infradi",
  },

  {
    title: "قضا",
    type: "text",
    key: "left",
  },
];
const tafseerQuran = [
  {
    title: "کل کتنےدن پڑہی",
    type: "text",
    key: "totalDays",
  },
  {
    title: "کون سی سورۃپڑہی",
    type: "text",
    key: "surah",
  },
  {
    title: "کل کتنے رکوع پڑہے",
    type: "text",
    key: "totalRakoo",
  },
];
const ahdees = [
  {
    title: "کل کتنےدن پڑہی",
    type: "text",
    key: "totalDays",
  },
  {
    title: "کون سی کتاب پڑہی",
    type: "text",
    key: "book",
  },
];
const litrature = [
  {
    title: "کل کتنےدن پڑہا",
    type: "text",
    key: "totalDays",
  },
  {
    title: "کون سی کتاب پڑہی",
    type: "text",
    key: "book",
  },
];
const course = [
  {
    title: "تعلیمی ادارے میں حاضری کتنے دن رہی",
    type: "text",
    key: "attendance",
  },
];
const hifz = [
  {
    title: "کل کتنے دن کیا",
    type: "text",
    key: "totalDays",
  },
  {
    title: "کون سی سورۃحفظ کی",
    type: "text",
    key: "hifzSurah",
  },
];
export const ReportUmeedwar = ({ view }) => {
  const [attended, setAttended] = useState("no");
  const [studyCircle, setStudyCircle] = useState("no");
  const [aanat, setAanat] = useState("no");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonData = convertDataFormat(toJson(formData));
    console.log(jsonData);
  };
  return (
    <GeneralLayout>
      <div dir="rtl" className="p-4">
        <h2 className="block w-full text-center p-3">
          کارکردگی رپورٹ براۓ حلقہ
        </h2>
        <form
          className="flex flex-col items-center justify-start gap-5 p-3 w-full overflow-auto mb-5"
          dir="rtl"
          onSubmit={handleSubmit}
        >
          <div className="w-full md:pr-0 mb-2">
            <InputWithLabel
              // readOnly={view}
              placeholder={"رپورٹ براَےماہ"}
              label={"رپورٹ براَےماہ"}
              id={"month"}
              name={"month"}
              type={"month"}
            />
            <InputWithLabel
              // readOnly={view}
              placeholder={"رپورٹ براَےماہ"}
              label={
                "اس ماہ میں کوئ خصوصی مصروفیت جس کی وجہ سے آپ کئ روٹین متاثر ہوئ ہو"
              }
              id={"disturbingRoutine"}
              name={"disturbingRoutine"}
              type={"textarea"}
            />
          </div>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {intro.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <InputWithLabel
                  readOnly={view}
                  placeholder={obj.title}
                  label={obj.title}
                  id={obj?.key}
                  name={obj?.key}
                  type={obj?.type}
                />
              </div>
            ))}
          </div>
          <h3 className="block w-full text-start font-medium text-sm p-3">
            نمازِفجر
          </h3>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {fajarNamaz.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <InputWithLabel
                  readOnly={view}
                  placeholder={obj.title}
                  label={obj.title}
                  id={obj?.key}
                  name={obj?.key}
                  type={obj?.type}
                />
              </div>
            ))}
          </div>
          <h3 className="block w-full text-start font-medium text-sm p-3">
            دیگرنمازیں{" "}
          </h3>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {otherNamaz.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <InputWithLabel
                  readOnly={view}
                  placeholder={obj.title}
                  label={obj.title}
                  id={obj?.key}
                  name={obj?.key}
                  type={obj?.type}
                />
              </div>
            ))}
          </div>
          <h3 className="block w-full text-start font-medium text-sm p-3">
            تفسیرِقُرآن
          </h3>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {tafseerQuran.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <InputWithLabel
                  readOnly={view}
                  placeholder={obj.title}
                  label={obj.title}
                  id={obj?.key}
                  name={obj?.key}
                  type={obj?.type}
                />
              </div>
            ))}
          </div>
          <h3 className="block w-full text-start font-medium text-sm p-3">
            حدیث
          </h3>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {ahdees.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <InputWithLabel
                  readOnly={view}
                  placeholder={obj.title}
                  label={obj.title}
                  id={obj?.key}
                  name={obj?.key}
                  type={obj?.type}
                />
              </div>
            ))}
          </div>
          <h3 className="block w-full text-start font-medium text-sm p-3">
            لیٹریچر
          </h3>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {litrature.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <InputWithLabel
                  readOnly={view}
                  placeholder={obj.title}
                  label={obj.title}
                  id={obj?.key}
                  name={obj?.key}
                  type={obj?.type}
                />
              </div>
            ))}
          </div>
          <h3 className="block w-full text-start font-medium text-sm p-3">
            کورس
          </h3>
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
                />
              </div>
            ))}
          </div>
          <h3 className="block w-full text-start font-medium text-sm p-3">
            حفظ
          </h3>
          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {hifz.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <InputWithLabel
                  readOnly={view}
                  placeholder={obj.title}
                  label={obj.title}
                  id={obj?.key}
                  name={obj?.key}
                  type={obj?.type}
                />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-start items-center">
            <div className="flex w-full  flex-col justify-start items-start">
              <h3 className="block w-full text-sm p-3">
                اجتماعِ امیدواران میں شرکت کی
              </h3>
              <div className="flex flex-wrap items-center justify-start border border-primary p-2 rounded-lg">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="attended"
                      className="radio checked:bg-blue-500"
                      checked={attended === "yes"}
                      value="yes"
                      onChange={() => setAttended("yes")}
                    />
                    <span className="label-text">yes</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="attended"
                      className="radio checked:bg-blue-500"
                      checked={attended === "no"}
                      value="no"
                      onChange={() => setAttended("no")}
                    />
                    <span className="label-text">no</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="attended"
                      className="radio checked:bg-blue-500"
                      checked={attended === "leave"}
                      value="leave"
                      onChange={() => setAttended("leave")}
                    />
                    <span className="label-text">leave</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex w-full  flex-col justify-start items-start">
              <h2 className="block w-full p-3">سٹڈی سرکل میں شرکت کی</h2>
              <div className="flex flex-wrap items-center justify-start border border-primary p-2 rounded-lg">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="studyCircle"
                      className="radio checked:bg-blue-500"
                      checked={studyCircle === "yes"}
                      value="yes"
                      onChange={() => setStudyCircle("yes")}
                    />
                    <span className="label-text">yes</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="studyCircle"
                      className="radio checked:bg-blue-500"
                      checked={studyCircle === "no"}
                      value="no"
                      onChange={() => setStudyCircle("no")}
                    />
                    <span className="label-text">no</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="studyCircle"
                      className="radio checked:bg-blue-500"
                      checked={studyCircle === "leave"}
                      value="leave"
                      onChange={() => setStudyCircle("leave")}
                    />
                    <span className="label-text">leave</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex w-full  flex-col justify-start items-start">
              <h2 className="block w-full p-3">اعانت کی</h2>
              <div className="flex flex-wrap items-center justify-start border border-primary p-2 rounded-lg">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="aanat"
                      className="radio checked:bg-blue-500"
                      checked={aanat === "yes"}
                      value="yes"
                      onChange={() => setAanat("yes")}
                    />
                    <span className="label-text">yes</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="aanat"
                      className="radio checked:bg-blue-500"
                      checked={aanat === "no"}
                      value="no"
                      onChange={() => setAanat("no")}
                    />
                    <span className="label-text">no</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Rawabit1 />
          </div>
          <div className="w-full">
            <Rawabit2 />
          </div>
          <div className="w-full">
            <Rawabit3 />
          </div>
          <div className="w-full">
            <RegularStudents />
          </div>

          <InputWithLabel
            // readOnly={view}
            placeholder={"..."}
            label={"تبصرہ"}
            id={"umeedwarTabsra"}
            name={"umeedwarTabsra"}
            type={"textarea"}
          />
          <InputWithLabel
            // readOnly={view}
            placeholder={"..."}
            label={"رپورٹ جمع کرانے کی تاریخ"}
            id={"dateOfSubmisstion"}
            name={"dateOfSubmisstion"}
            type={"month"}
          />
          <div className="w-full flex justify-end items-center">
            <button className="btn btn-primary ">Submit</button>
          </div>
        </form>
      </div>
    </GeneralLayout>
  );
};
