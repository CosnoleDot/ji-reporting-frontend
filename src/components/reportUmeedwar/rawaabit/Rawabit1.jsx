import React, { useState } from "react";
import { InputWithLabel } from "../../InputWithLabel";
const rbt1 = [
  {
    title: "نام",
    type: "text",
    key: "rbt1Name",
  },
  {
    title: "موبائل نمبر",
    type: "tel",
    key: "rbt1Mobile",
  },
  {
    title: "اس ماہ اس ربط سے کتنی ملاقاتیں کیں",
    type: "number",
    key: "rbt1TotalVisitings",
  },

  {
    title: "اس ماہ کونسی کتاب پڑھاہی ",
    type: "text",
    key: "rbt1BookRead",
  },
  {
    title: "اس ماہ کون سی سورۃکی تفسیر پڑھائ",
    type: "text",
    key: "rbt1SurahTafseer",
  },
  {
    title: "اس ماہ کون سی سورۃحفظ کروائ",
    type: "text",
    key: "rbt1SurahHifz",
  },
  // {
  //   title: "اس ماہ نمازوں کی صورتحال کیسی رھی",
  //   type: "textarea",
  //   key: "rbt1NamazCondition",
  // },
];
export const Rawabit1 = ({
  view,
  setRbt1Programs,
  rbt1Programs,
  programsList,
}) => {
  const [programName1, setProgramName1] = useState("");

  const handleAddProgram = (e) => {
    e.preventDefault();
    setRbt1Programs([...rbt1Programs, programName1]);
    setProgramName1("");
    document.getElementById("p-dialog").close();
  };

  return (
    <div>
      <h2 className="block w-full text-center font-bold mb-3">ربط نمبر۱</h2>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2 flex flex-col flex-wrap">
          {rbt1.map((obj, index) => (
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
                  document.getElementById("p-dialog").showModal();
                }}
              >
                +Add
              </button>
            )}
            <dialog id="p-dialog" className="p-4">
              <label htmlFor="rbt1Programs" className="mb-3 block">
                Program Name
              </label>
              <input
                className="input border rounded-md p-2 w-full mb-3"
                placeholder="..."
                id="rbt1Programs"
                name="rbt1Programs"
                disabled={view}
                value={programName1}
                onChange={(e) => setProgramName1(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddProgram}>
                Done
              </button>
            </dialog>
          </div>

          <div className="flex justify-start items-center mb-3">
            {rbt1Programs &&
              rbt1Programs.length > 0 &&
              rbt1Programs.map((p, index) => (
                <p
                  className="input underline decoration-dotted underline-bg-slate-200"
                  key={index}
                  readOnly={view}
                >
                  {p}
                </p>
              ))}
          </div>
          <div className="flex justify-start items-center gap-2">
            {!view &&
              rbt1Programs &&
              programsList?.[0]?.map((l, index) => (
                <input
                  key={index}
                  className="input border-slate-600 p-4"
                  defaultValue={l}
                  placeholder={rbt1Programs[index] || ""}
                  onChange={(e) => {
                    const updatedPrograms = [...rbt1Programs];
                    updatedPrograms[index] = e.target.value;
                    setRbt1Programs(updatedPrograms);
                  }}
                />
              ))}
          </div>

          <h3 className="mb-2">اس ماہ نمازوں کی صورتحال کیسی رھی</h3>
          <textarea
            className="inptut border rounded-md pr-2 w-full"
            placeholder={"..."}
            id={"rbt1NamazCondition"}
            name={"rbt1NamazCondition"}
            type={"textarea"}
            disabled={view}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
