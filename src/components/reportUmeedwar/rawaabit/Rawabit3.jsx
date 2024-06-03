import React, { useState } from "react";
import { InputWithLabel } from "../../InputWithLabel";
import { MdOutlineCancel } from "react-icons/md";
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
    title: "اس ماہ کونسی کتاب پڑھائ ",
    type: "text",
    key: "rbt3BookRead",
  },
  {
    title: "اس ماہ کون سی سورۃکی تفسیر پڑھائ",
    type: "text",
    key: "rbt3SurahTafseer",
  },
  {
    title: "اس ماہ کون سی سورۃحفظ کروائی",
    type: "text",
    key: "rbt3SurahHifz",
  },
  // {
  //   title: "اس ماہ نمازوں کی صورتحال کیسی رہی",
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
      <h2 className="block w-full text-center font-bold mb-3">ربط نمبر۳</h2>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2 flex flex-col flex-wrap">
          {rbt3?.map((obj, index) => (
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

          <div className="w-full flex-col justify-start gap-3 lg:flex-row items-center">
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
            <div className="flex w-full overflow-hidden overflow-x-scroll p-2 justify-start items-center mb-3 min-h-[30px] border rounded-md border-slate-300">
              {rbt3Programs &&
                rbt3Programs?.length > 0 &&
                rbt3Programs?.map((p, index) => (
                  <p
                    className="relative input p-2 m-2 border border-slate-200 underline  underline-bg-slate-100"
                    key={index}
                    readOnly={view}
                  >
                    {p}
                    {!view && (
                      <MdOutlineCancel
                        onClick={() => {
                          const temp = [...rbt3Programs];
                          temp.splice(index, 1);
                          setRbt3Programs([...temp]);
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
                  document.getElementById("p-dialog3").showModal();
                }}
              >
                +Add Program Name
              </button>
            )}
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

          <h3 className="mb-2 block w-full text-start text-sm md:text-lg p-3">
            اس ماہ نمازوں کی صورتحال کیسی رہی
          </h3>
          <textarea
            className="inptut border rounded-md pr-2 w-full"
            placeholder={"..."}
            id={"rbt3NamazCondition"}
            name={"rbt3NamazCondition"}
            type={"textarea"}
            disabled={view}
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
};
