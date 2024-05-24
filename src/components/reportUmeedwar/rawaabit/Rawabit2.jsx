import React, { useState } from "react";
import { InputWithLabel } from "../../InputWithLabel";
import { MdOutlineCancel } from "react-icons/md";
const rbt2 = [
  {
    title: "نام",
    type: "text",
    key: "rbt2Name",
  },
  {
    title: "موبائل نمبر",
    type: "tel",
    key: "rbt2Mobile",
  },
  {
    title: "اس ماہ اس ربط سے کتنی ملاقاتیں کیں",
    type: "number",
    key: "rbt2TotalVisitings",
  },

  {
    title: "اس ماہ کونسی کتاب پڑھائ ",
    type: "text",
    key: "rbt2BookRead",
  },
  {
    title: "اس ماہ کون سی سورۃکی تفسیر پڑھائ",
    type: "text",
    key: "rbt2SurahTafseer",
  },
  {
    title: "اس ماہ کون سی سورۃحفظ کروائی",
    type: "text",
    key: "rbt2SurahHifz",
  },
  // {
  //   title: "اس ماہ نمازوں کی صورتحال کیسی رہی",
  //   type: "textarea",
  //   key: "rbt2NamazCondition",
  // },
];
export const Rawabit2 = ({
  view,
  setRbt2Programs,
  rbt2Programs,
  programsList,
}) => {
  const [programName2, setProgramName2] = useState("");

  const handleAddProgram = (e) => {
    e.preventDefault();
    setRbt2Programs([...rbt2Programs, programName2]);
    setProgramName2("");
    document.getElementById("p-dialog2").close();
  };

  return (
    <div>
      <h2 className="block w-full text-center font-bold mb-3">ربط نمبر۲</h2>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2 flex flex-col flex-wrap">
          {rbt2.map((obj, index) => (
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
            اس ماہ جمعیت کے کون کون سے پروگرامات میں شریک کروایا
          </h3>

          <div className="w-full flex-col lg:flex-row justify-start gap-3  items-center">
            <dialog id="p-dialog2" className="p-4 ">
              <label htmlFor="rbt2Programs" className="mb-3 block">
                Program Name
              </label>
              <input
                className="input border rounded-md p-2 w-full mb-3"
                placeholder="..."
                id="rbt2Programs"
                name="rbt2Programs"
                disabled={view}
                value={programName2}
                onChange={(e) => setProgramName2(e.target.value)} // Update programName2 on input change
              />
              <button
                className="btn btn-primary"
                onClick={handleAddProgram} // Use handleAddProgram to add programName2 to rbt2Programs array
              >
                Done
              </button>
            </dialog>
            <div className="flex w-full justify-start items-center mb-3 min-h-[30px] border rounded-md border-slate-300">
              {rbt2Programs &&
                rbt2Programs.length > 0 &&
                rbt2Programs.map((p, index) => (
                  <p
                    className="relative input p-2 m-2 border border-slate-200 underline  underline-bg-slate-100"
                    key={index}
                    readOnly={view}
                  >
                    {p}
                    {!view && (
                      <MdOutlineCancel
                        onClick={() => {
                          const temp = [...rbt2Programs];
                          temp.splice(index, 1);
                          setRbt2Programs([...temp]);
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
                  document.getElementById("p-dialog2").showModal();
                }}
              >
                +Add Program Name
              </button>
            )}
          </div>
          <div className="flex justify-start items-center gap-2">
            {!view &&
              rbt2Programs &&
              programsList?.[1]?.map((l, index) => (
                <input
                  key={index}
                  defaultValue={l}
                  className="input border-slate-600 p-4"
                  placeholder={rbt2Programs[index] || ""}
                  onChange={(e) => {
                    const updatedPrograms = [...rbt2Programs];
                    updatedPrograms[index] = e.target.value;
                    setRbt2Programs(updatedPrograms);
                  }}
                />
              ))}
          </div>

          <h3 className="mb-2 block w-full text-start text-sm md:text-lg p-3">
            اس ماہ نمازوں کی صورتحال کیسی رہی
          </h3>
          <textarea
            className="inptut border rounded-md pr-2 w-full"
            placeholder={"..."}
            id={"rbt2NamazCondition"}
            name={"rbt2NamazCondition"}
            type={"textarea"}
            disabled={view}
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
};
