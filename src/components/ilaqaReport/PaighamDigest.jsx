export const PaighamDigest = ({ view }) => {
  const sumUpTwoValues = (val1, val2, final) => {
    document.getElementById(final).value = val1 + val2;
  };
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg"> ہمقدم ڈائجسٹ</h2>
      <div className="flex-col lg:flex-row w-full items-center justify-start">
        <div className="flex w-full overflow-hidden overflow-x-scroll gap-3 pb-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            کل موصولہ:
          </label>
          <div className="flex">
            <input
              type="number"
              readOnly={view}
              className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
              name="totalReceived"
              id="totalReceived"
              onChange={() =>
                sumUpTwoValues(
                  parseInt(document.getElementById("totalReceived").value),
                  parseInt(document.getElementById("manualReceived").value),
                  "receivedSum"
                )
              }
            />
            +
            <input
              readOnly={view}
              name="manualReceived"
              id="manualReceived"
              type="number"
              className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
              onChange={() =>
                sumUpTwoValues(
                  parseInt(document.getElementById("totalReceived").value),
                  parseInt(document.getElementById("manualReceived").value),
                  "receivedSum"
                )
              }
            />
            =
            <input
              readOnly={true}
              type="number"
              required
              name="receivedSum"
              id="receivedSum"
              className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
            />
          </div>
        </div>
        <div className="flex w-full overflow-hidden overflow-x-scroll gap-3 pb-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            فروخت کردہ:
          </label>
          <div className="flex">
            <input
              type="number"
              readOnly={view}
              className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
              name="totalSold"
              id="totalSold"
              onChange={() =>
                sumUpTwoValues(
                  parseInt(document.getElementById("totalSold").value),
                  parseInt(document.getElementById("manualSold").value),
                  "soldSum"
                )
              }
            />
            +
            <input
              readOnly={view}
              name="manualSold"
              id="manualSold"
              type="number"
              className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
              onChange={() =>
                sumUpTwoValues(
                  parseInt(document.getElementById("totalSold").value),
                  parseInt(document.getElementById("manualSold").value),
                  "soldSum"
                )
              }
            />
            =
            <input
              readOnly={true}
              type="number"
              required
              name="soldSum"
              id="soldSum"
              className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
            />
          </div>
        </div>
        <div className="flex w-full overflow-hidden overflow-x-scroll gap-3 pb-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            ڈائجسٹ موصول کرنے کا ماہانہ ہدف:
          </label>
          <div className="flex">
            <input
              type="number"
              readOnly={view}
              className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
              name="monthlyReceivingGoal"
              id="monthlyReceivingGoal"
              onChange={() =>
                sumUpTwoValues(
                  parseInt(
                    document.getElementById("monthlyReceivingGoal").value
                  ),
                  parseInt(
                    document.getElementById("manualMonthlyReceivingGoal").value
                  ),
                  "monthlyReceivingGoalSum"
                )
              }
            />
            +
            <input
              readOnly={view}
              name="manualMonthlyReceivingGoal"
              id="manualMonthlyReceivingGoal"
              type="number"
              className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
              onChange={() =>
                sumUpTwoValues(
                  parseInt(
                    document.getElementById("monthlyReceivingGoal").value
                  ),
                  parseInt(
                    document.getElementById("manualMonthlyReceivingGoal").value
                  ),
                  "monthlyReceivingGoalSum"
                )
              }
            />
            =
            <input
              readOnly={true}
              type="number"
              required
              name="monthlyReceivingGoalSum"
              id="monthlyReceivingGoalSum"
              className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
