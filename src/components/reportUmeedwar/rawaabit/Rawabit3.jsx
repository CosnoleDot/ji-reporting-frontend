import React, { useState } from "react";
import { InputWithLabel } from "../../InputWithLabel";
const rbt3 = [
  {
    title: "نام",
    type: "text",
    key: "rbt3Name",
  },
  {
    title: "موبائل نمبر",
    type: "tel",
    key: "rbt3Mobile",
  },
  {
    title: "اس ماہ اس ربط سے کتنی ملاقاتیں کیں",
    type: "number",
    key: "rbt3TotalVisitings",
  },

  {
    title: "اس ماہ کونسی کتاب پڑھاہی ",
    type: "text",
    key: "rbt3BookRead",
  },
  {
    title: "اس ماہ کون سی سورۃکی تفسیر پڑھائ",
    type: "text",
    key: "rbt3SurahTafseer",
  },
  {
    title: "اس ماہ کون سی سورۃحفظ کروائ",
    type: "text",
    key: "rbt3SurahHifz",
  },
  // {
  //   title: "اس ماہ نمازوں کی صورتحال کیسی رھی",
  //   type: "textarea",
  //   key: "rbt3NamazCondition",
  // },
];
export const Rawabit3 = ({
  view,
  setRbt3Programs,
  rbt3Programs,
  programsList,
}) => {
  const [programName3, setProgramName3] = useState("");

  const handleAddProgram = (e) => {
    e.preventDefault();
    setRbt3Programs([...rbt3Programs, programName3]);
    setProgramName3("");
    document.getElementById("p-dialog3").close();
  };

  return (
    <div>
      <h2 className="block w-full text-center font-bold mb-3">ربط نمر۳</h2>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2 flex flex-col flex-wrap">
          {rbt3.map((obj, index) => (
            <InputWithLabel
              key={index}
              readOnly={view}
              placeholder={"Type..|"}
              label={obj.title}
              id={obj?.key}
              name={obj?.key}
              type={obj?.type}
              required={true}
            />
          ))}
          <h3 className="mb-2">
            اس ماہ جمیعت کے کون کون سے پروگرامات میں شریک کروایا
          </h3>

          <div className="w-full flex justify-end items-center">
            {!view && (
              <button
                className="btn btn-primary mb-3 max-w-[10rem]"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("p-dialog3").showModal();
                }}
              >
                +Add
              </button>
            )}
            <dialog id="p-dialog3" className="p-4 ">
              <label htmlFor="rbt3Programs" className="mb-3 block">
                Program Name
              </label>
              <input
                className="input border rounded-md p-2 w-full mb-3"
                placeholder="..."
                id="rbt3Programs"
                name="rbt3Programs"
                disabled={view}
                value={programName3}
                onChange={(e) => setProgramName3(e.target.value)} // Update programName3 on input change
              />
              <button
                className="btn btn-primary"
                onClick={handleAddProgram} // Use handleAddProgram to add programName3 to rbt3Programs array
              >
                Done
              </button>
            </dialog>
          </div>

          <div className="flex justify-start items-center mb-3">
            {rbt3Programs &&
              rbt3Programs.length > 0 &&
              rbt3Programs.map((p, index) => (
                <p
                  className="input underline underline-bg-slate-200"
                  key={index}
                  readOnly={view}
                >
                  {p}
                </p>
              ))}
          </div>
          <div className="flex justify-start items-center gap-2">
            {!view &&
              rbt3Programs &&
              programsList?.[2]?.map((l, index) => (
                <input
                  key={index}
                  className="input border-slate-600 p-4"
                  placeholder={rbt3Programs[index] || ""}
                  defaultValue={l}
                  onChange={(e) => {
                    const updatedPrograms = [...rbt3Programs];
                    updatedPrograms[index] = e.target.value;
                    setRbt3Programs(updatedPrograms);
                  }}
                />
              ))}
          </div>

          <h3 className="mb-2">اس ماہ نمازوں کی صورتحال کیسی رھی</h3>
          <textarea
            className="inptut border rounded-md pr-2 w-full"
            placeholder={"..."}
            id={"rbt3NamazCondition"}
            name={"rbt3NamazCondition"}
            type={"textarea"}
            disabled={view}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
