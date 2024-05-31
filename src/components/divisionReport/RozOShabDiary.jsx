import { Box } from "../halqa";
import { sumUpTwoValues } from "../muntakhibMaqamReports";

export const RozOShabDiary = ({ view }) => {
  return (
    <div className="p-2 py-5">
      <h2 className="text-black py-3 text-lg">روزشب ڈائری</h2>
      <div className="flex flex-col w-full items-start gap-4 justify-start">
        <div className="w-full flex justify-start items-center overflow-hidden overflow-x-scroll">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            کتنے امیدواران فل کرتے ہیں؟
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`umeedwaranFilled`}
            id={`umeedwaranFilled`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
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
                parseInt(document.getElementById("umeedwaranFilled").value),
                parseInt(document.getElementById("manualUmeedwaran").value),
                "umeedwaranFilledSum"
              )
            }
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={document.getElementById("umeedwaranFilled")?.value}
            required
            name={`umeedwaranFilledSum`}
            id={`umeedwaranFilledSum`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex w-full overflow-hidden overflow-x-scroll">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            کتنےرفقافل کرتے ہیں:
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`rafaqaFilled`}
            id={`rafaqaFilled`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
          +
          <input
            type="number"
            readOnly={view}
            required
            name={`manualRafaqaFilled`}
            id={`manualRafaqaFilled`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("rafaqaFilled").value),
                parseInt(document.getElementById("manualRafaqaFilled").value),
                "rafaqaFilledSum"
              )
            }
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={document.getElementById("rafaqaFilled")?.value}
            required
            name={`rafaqaFilledSum`}
            id={`rafaqaFilledSum`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        {/* <div className="flex py-2">
                <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">کتنے امیدواران فل کرتے ہیں؟</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name="umeedwaranFilled"
            id="umeedwaranFilled"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2 ">
                <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">کتنےرفقافل کرتے ہیں:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="rafaqaFilled"
            id="rafaqaFilled"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div> */}
      </div>
    </div>
  );
};
