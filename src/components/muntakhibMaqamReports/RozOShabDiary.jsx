
export const sumUpTwoValues = (val1, val2, final) => {
  document.getElementById(final).value = val1 + val2;
};
export const RozOShabDiary = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">روزشب ڈائری</h2>
      <div className="flex flex-col w-full items-start gap-4 justify-start">
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
                "rafaqaFilledSum"
              )
            }
          />
          +
          <input
            type="number"
            readOnly={view}
            defaultValue={0}
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
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("uploadedUmeedwaran").value),
                parseInt(document.getElementById("manualUmeedwaran").value),
                "rafaqaFilledSum"
              )
            }
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
                parseInt(document.getElementById("manualRafaqa").value),
                "rafaqaFilledSum"
              )
            }
          />
          +
          <input
            type="number"
            readOnly={view}
            defaultValue={0}
            required
            name={`manualRafaqa`}
            id={`manualRafaqa`}
            className="p-1 text-center "
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
            required
            name={`rafaqaFilledSum`}
            id={`rafaqaFilledSum`}
            className="p-1 text-center "
          />
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
