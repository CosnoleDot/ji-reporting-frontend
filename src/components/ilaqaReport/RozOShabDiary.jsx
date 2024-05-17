export const RozOShabDiary = ({ view }) => {
  const sumUpTwoValues = (val1, val2, final) => {
    document.getElementById(final).value = val1 + val2;
  };
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">روزشب ڈائری</h2>
      <div className="flex flex-wrap w-full items-center justify-start">
        <div style={{ display: "flex" }}>
          <label className="block min-w-[40%]">
            کتنے امیدواران فل کرتے ہیں؟
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`uploadedUmeedwaran`}
            id={`uploadedUmeedwaran`}
            className="p-1 text-center "
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
            placeholder="ذیلی حلقہ"
            required
            name={`manualUmeedwaran`}
            id={`manualUmeedwaran`}
            className="p-1 text-center "
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
            className="p-1 text-center "
          />
        </div>
        <div style={{ display: "flex" }}>
          <label className="block min-w-[40%]">کتنےرفقافل کرتے ہیں:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`uploadedRafaqa`}
            id={`uploadedRafaqa`}
            className="p-1 text-center "
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
            placeholder="ذیلی حلقہ"
            required
            name={`manualRafaqaFilled`}
            id={`manualRafaqaFilled`}
            className="p-1 text-center "
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
            className="p-1 text-center "
          />
        </div>
      </div>
    </div>
  );
};
