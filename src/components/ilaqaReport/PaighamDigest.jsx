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
              name="totalReceived"
              id="totalReceived"
            />
            +
            <input
              readOnly={view}
              name="manualReceived"
              id="manualReceived"
              type="number"
              placeholder="ذیلی حلقہ جات"
              className="border-b-2 text-center border-dashed"
            />
            =
            <input
              readOnly={true}
              type="number"
              defaultValue={
                parseInt(document.getElementById("manualReceived")?.value) +
                parseInt(document.getElementById("totalReceived")?.value)
              }
              required
              name="receivedSum"
              id="receivedSum"
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
              name="totalSold"
              id="totalSold"
            />
            +
            <input
              readOnly={view}
              name="manualSold"
              id="manualSold"
              type="number"
              placeholder="ذیلی حلقہ جات"
              className="border-b-2 text-center border-dashed"
            />
            =
            <input
              readOnly={true}
              type="number"
              defaultValue={
                parseInt(document.getElementById("totalSold")?.value) +
                parseInt(document.getElementById("manualSold")?.value)
              }
              required
              name="soldSum"
              id="soldSum"
              className="border-b-2 text-center border-dashed"
            />
          </div>
        </div>
        <div className="flex py-2 ml-4">
          <label className="block p-1">ڈایجسٹ موصول کرنے کا ماہانہ ہدف:</label>
          <div className="flex">
            <input
              type="number"
              readOnly={view}
              placeholder="حلقہ جات"
              className="border-b-2 p-1 text-center border-dashed"
              name="monthlyReceivingGoal"
              id="monthlyReceivingGoal"
            />
            +
            <input
              readOnly={view}
              name="manualMonthlyReceivingGoal"
              id="manualMonthlyReceivingGoal"
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
                  document.getElementById("monthlyReceivingGoal")?.value
                ) +
                parseInt(
                  document.getElementById("manualMonthlyReceivingGoal")?.value
                )
              }
              required
              name="monthlyReceivingGoalSum"
              id="monthlyReceivingGoalSum"
              className="border-b-2 text-center border-dashed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
