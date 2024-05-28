import React, { useState } from "react";
import { InputWithLabel } from "../../InputWithLabel";
import { MdOutlineCancel } from "react-icons/md";
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
    title: "اس ماہ کونسی کتاب پڑھائ ",
    type: "text",
    key: "rbt1BookRead",
  },
  {
    title: "اس ماہ کون سی سورۃکی تفسیر پڑھائ",
    type: "text",
    key: "rbt1SurahTafseer",
  },
  {
    title: "اس ماہ کون سی سورۃحفظ کروائی",
    type: "text",
    key: "rbt1SurahHifz",
  },
  // {
  //   title: "اس ماہ نمازوں کی صورتحال کیسی رہی",
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
              label={obj.title}
              id={obj?.key}
              name={obj?.key}
              type={obj?.type}
              required={true}
            />
          ))}

          <h3 className="mb-2 block w-full text-start text-sm md:text-lg p-3">
            اس ماہ نمازوں کی صورتحال کیسی رہی
          </h3>
          <textarea
            className="inptut border rounded-md pr-2 w-full"
            placeholder={"..."}
            id={"rbt1NamazCondition"}
            name={"rbt1NamazCondition"}
            type={"textarea"}
            disabled={view}
            required
          ></textarea>
          <h3 className="mb-2 block w-full text-start text-sm md:text-lg p-3">
            اس ماہ جمعیت کے کون کون سے پروگرامات میں شریک کروایا
          </h3>

          <div className="w-full flex-col lg:flex-row justify-start gap-3  items-center">
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

            <div className="flex w-full overflow-hidden overflow-x-scroll p-2 justify-start items-center mb-3 min-h-[30px] border rounded-md border-slate-300">
              {rbt1Programs &&
                rbt1Programs.length > 0 &&
                rbt1Programs.map((p, index) => (
                  <p
                    className="relative input p-2 m-2 border border-slate-200 underline  underline-bg-slate-100"
                    key={index}
                    readOnly={view}
                  >
                    {p}
                    {!view && (
                      <MdOutlineCancel
                        onClick={() => {
                          const temp = [...rbt1Programs];
                          temp.splice(index, 1);
                          setRbt1Programs([...temp]);
                        }}
                        className="absolute -top-2 -left-2 cursor-pointer"
                      />
                    )}
                  </p>
                ))}
            </div>
            {!view && (
              <button
                className="btn w-full md:w-auto btn-primary mb-3 max-w-full capitalize"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("p-dialog").showModal();
                }}
              >
                +Add Program Name
              </button>
            )}
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
        </div>
      </div>
    </div>
  );
};
