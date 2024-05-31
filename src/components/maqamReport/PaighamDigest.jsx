export const PaighamDigest = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg"> ہمقدم ڈائجسٹ</h2>
      <div className="flex-col lg:flex-row w-full items-center justify-start">
        <div className="flex py-2 ml-4">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            کل موصولہ:
          </label>
          <input
            readOnly={view}
            type="number"
            required
            name="totalReceived"
            id="totalReceived"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2 ml-4">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            فروخت کردہ:
          </label>
          <input
            readOnly={view}
            type="number"
            required
            name="totalSold"
            id="totalSold"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2 ml-4">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            ڈائجسٹ موصول کرنے کا ماہانہ ہدف:
          </label>
          <input
            readOnly={view}
            type="number"
            required
            name="monthlyReceivingGoal"
            id="monthlyReceivingGoal"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
      </div>
    </div>
  );
};
