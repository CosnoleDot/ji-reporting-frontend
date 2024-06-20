import { useEffect, useState } from "react";
import { sumUpTwoValues } from "../muntakhibMaqamReports";

export const RozOShabDiary = ({ view,compile }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">روزشب ڈائری</h2>
      <div className="flex-col lg:flex-row gap-4 w-full items-center justify-start">
        <div className="flex md:flex-row flex-col w-full gap-1 md:gap-3 pb-2">
          <label className="block md:w-[20%] w-full text-sm md:text-lg mb-0 pt-2">
            کتنے امیدواران فل کرتے ہیں؟
          </label>
          <div className="w-full md:w-[80%] flex overflow-hidden overflow-x-scroll">
            {compile ? (
              <input
                readOnly={true}
                defaultValue={
                  document.getElementById("umeedwaranFilled")?.value
                }
                type="number"
                required
                name={`umeedwaranFilledSum`}
                id={`umeedwaranFilledSum`}
                className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
              />
            ) : (
              <>
                <input
                  readOnly={true}
                  type="number"
                  required
                  name={`umeedwaranFilled`}
                  id={`umeedwaranFilled`}
                  className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("umeedwaranFilled").value
                      ),
                      parseInt(
                        document.getElementById("manualUmeedwaran").value
                      ),
                      "umeedwaranFilledSum"
                    )
                  }
                />
                +
                <input
                  type="number"
                  readOnly={view}
                  required
                  name={`manualUmeedwaran`}
                  id={`manualUmeedwaran`}
                  className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
                  onChange={() =>
                    sumUpTwoValues(
                      parseInt(
                        document.getElementById("umeedwaranFilled").value
                      ),
                      parseInt(
                        document.getElementById("manualUmeedwaran").value
                      ),
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
                  className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
                />{" "}
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 p-2 ">
            کتنےرفقافل کرتے ہیں:
          </label>

          <input
            readOnly={true}
            type="number"
            required
            name={`rafaqaFilled`}
            id={`rafaqaFilled`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
      </div>
    </div>
  );
};
