import { useEffect, useState } from "react";
import { sumUpTwoValues } from "../muntakhibMaqamReports";

export const RozOShabDiary = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">روزشب ڈائری</h2>
      <div className="flex flex-wrap gap-4 w-full items-center justify-start">

        <div style={{ display: "flex" }}>
          <label className="block min-w-[40%]">
            کتنے امیدواران فل کرتے ہیں؟
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`umeedwaranFilled`}
            id={`umeedwaranFilled`}
            className="border-b-2 text-center border-dashed "
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("umeedwaranFilled").value),
                parseInt(document.getElementById("manualUmeedwaran").value),
                "umeedwaranFilledSum"
              )
            }
          />
          +
          <input
            type="number"
            readOnly={view}
            placeholder="ذیلی حلقہ"
            required
            name={`manualUmeedwaran`}
            id={`manualUmeedwaran`}
            className="border-b-2 text-center border-dashed "
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("umeedwaranFilled").value),
                parseInt(document.getElementById("manualUmeedwaran").value),
                "umeedwaranFilledSum"
              )
            }
          />
          =
          <input
            readOnly={true}
            defaultValue={
              document.getElementById("umeedwaranFilled")?.value
            }
            type="number"
            required
            name={`umeedwaranFilledSum`}
            id={`umeedwaranFilledSum`}
            className="border-b-2 text-center border-dashed "
          />
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <label className="block min-w-[40%]">کتنےرفقافل کرتے ہیں:</label>

          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`rafaqaFilled`}
            id={`rafaqaFilled`}
            className="border-b-2 text-center border-dashed "
          />

          {/* +
          <input
            type="number"
            readOnly={view}
            defaultValue={0}
            required
            name={`manualRafaqa`}
            id={`manualRafaqa`}
            className="border-b-2 text-center border-dashed "
            oninput="calculateSum()"
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={
              parseInt(document.getElementById("uploadedRafaqa")?.value) +
              parseInt(document.getElementById("manualRafaqa")?.value)
            }
            required
            name={`rafaqaFilledSum`}
            id={`rafaqaFilledSum`}
            className="border-b-2 text-center border-dashed "
          /> */}
        </div>
        {/* <div className="flex py-2">
          <label className="block min-w-[40%]">کتنے امیدواران فل کرتے ہیں؟</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name="umeedwaranFilled"
            id="umeedwaranFilled"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2 ">
          <label className="block min-w-[40%]">کتنےرفقافل کرتے ہیں:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="rafaqaFilled"
            id="rafaqaFilled"
            className="border-b-2 text-center border-dashed"
          />
        </div> */}
      </div>
    </div>
  );
};
