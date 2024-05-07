export const PaighamDigest = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">پیغام ڈائجسٹ</h2>
      <div className="flex flex-wrap w-full items-center justify-start">
        <div className="flex py-2 ml-4">
          <label className="block">کل موصولہ:</label>
          <div className="flex">
            <input
              type="number"
              readOnly={view}
              placeholder="حلقہ جات"
              className="border-b-2 text-center border-dashed"
              name="totalHalqaReceived"
              id="totalHalqaReceived"
            />
            +
            <input
              readOnly={view}
              name="totalZeliHalqaReceived"
              id="totalZeliHalqaReceived"
              type="number"
              placeholder="ذیلی حلقہ جات"
              className="border-b-2 text-center border-dashed"
            />
            =
            <input
              readOnly={true}
              type="number"
              defaultValue={
                parseInt(
                  document.getElementById("totalZeliHalqaReceived")?.value
                ) +
                parseInt(document.getElementById("totalHalqaReceived")?.value)
              }
              required
              name="totalReceived"
              id="totalReceived"
              className="border-b-2 text-center border-dashed"
            />
          </div>
        </div>
        <div className="flex py-2 ml-4">
          <label className="block p-1"> فروخت کردہ:</label>
          <div className="flex">
            <input
              type="number"
              readOnly={view}
              placeholder="حلقہ جات"
              className="border-b-2 p-1 text-center border-dashed"
              name="totalHalqaSold"
              id="totalHalqaSold"
            />
            +
            <input
              readOnly={view}
              name="totalZeliHalqaSold"
              id="totalZeliHalqaSold"
              type="number"
              placeholder="ذیلی حلقہ جات"
              className="border-b-2 text-center border-dashed"
            />
            =
            <input
              readOnly={true}
              type="number"
              defaultValue={
                parseInt(document.getElementById("totalHalqaSold")?.value) +
                parseInt(document.getElementById("totalZeliHalqaSold")?.value)
              }
              required
              name="totalSold"
              id="totalSold"
              className="border-b-2 text-center border-dashed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
