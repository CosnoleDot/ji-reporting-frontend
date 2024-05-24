export const sumUpTwoValues = (val1, val2, final) => {
  document.getElementById(final).value = val1 + val2;
};
export const RozOShabDiary = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">روزشب ڈائری</h2>
      <div className="flex flex-col w-full items-start gap-4 justify-start">
        <div className="flex-col lg:flex-row ">
          <label className="block text-sm md:text-lg mb-2 sm:mb-4">
            کتنے امیدواران فل کرتے ہیں؟
          </label>
          <input
            readOnly={true}
            type="number"
            required
            name={`uploadedUmeedwaran`}
            id={`uploadedUmeedwaran`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("uploadedUmeedwaran").value),
                parseInt(document.getElementById("manualUmeedwaran").value),
                "rafaqaFilledSum"
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
                parseInt(document.getElementById("uploadedUmeedwaran").value),
                parseInt(document.getElementById("manualUmeedwaran").value),
                "umeedwaranFilledSum"
              )
            }
          />
          =
          <input
            readOnly={true}
            type="number"
            required
            defaultValue={document.getElementById("uploadedUmeedwaran")?.value}
            name={`umeedwaranFilledSum`}
            id={`umeedwaranFilledSum`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex-col lg:flex-row ">
          <label className="block text-sm md:text-lg mb-2 sm:mb-4">
            کتنےرفقافل کرتے ہیں:
          </label>
          <input
            readOnly={true}
            type="number"
            required
            name={`uploadedRafaqa`}
            id={`uploadedRafaqa`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("uploadedRafaqa").value),
                parseInt(document.getElementById("manualRafaqa").value),
                "rafaqaFilledSum"
              )
            }
          />
          +
          <input
            type="number"
            readOnly={view}
            required
            name={`manualRafaqa`}
            id={`manualRafaqa`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("uploadedRafaqa").value),
                parseInt(document.getElementById("manualRafaqa").value),
                "rafaqaFilledSum"
              )
            }
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={document.getElementById("uploadedRafaqa")?.value}
            required
            name={`rafaqaFilledSum`}
            id={`rafaqaFilledSum`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
      </div>
    </div>
  );
};
