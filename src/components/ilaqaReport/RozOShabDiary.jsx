export const RozOShabDiary = ({ view }) => {
  const sumUpTwoValues = (val1, val2, final) => {
    document.getElementById(final).value = val1 + val2;
  };
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">روزشب ڈائری</h2>
      <div className="flex-col lg:flex-row w-full items-center justify-start">
        <div className="flex w-full overflow-hidden overflow-x-scroll gap-3 pb-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            کتنے امیدواران فل کرتے ہیں؟
          </label>
          <input
            readOnly={true}
            type="number"
            required
            name={`uploadedUmeedwaran`}
            id={`uploadedUmeedwaran`}
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("uploadedUmeedwaran").value),
                parseInt(document.getElementById("manualUmeedwaran").value),
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
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
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
            name={`umeedwaranFilledSum`}
            id={`umeedwaranFilledSum`}
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex w-full overflow-hidden overflow-x-scroll gap-3 pb-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            کتنےرفقافل کرتے ہیں:
          </label>
          <input
            readOnly={true}
            type="number"
            required
            name={`uploadedRafaqa`}
            id={`uploadedRafaqa`}
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("uploadedRafaqa").value),
                parseInt(document.getElementById("manualRafaqaFilled").value),
                "rafaqaFilledSum"
              )
            }
          />
          +
          <input
            type="number"
            readOnly={view}
            required
            name={`manualRafaqaFilled`}
            id={`manualRafaqaFilled`}
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("uploadedRafaqa").value),
                parseInt(document.getElementById("manualRafaqaFilled").value),
                "rafaqaFilledSum"
              )
            }
          />
          =
          <input
            readOnly={true}
            type="number"
            required
            name={`rafaqaFilledSum`}
            id={`rafaqaFilledSum`}
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};
