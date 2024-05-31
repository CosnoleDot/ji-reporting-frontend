export const Baitulmal = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">بیت المال</h2>
      <div className="flex-col lg:flex-row w-full items-center justify-start">
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">ماہانہ آمدن:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="monthlyIncome"
            id="monthlyIncome"
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">ماہانہ خرچ:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="monthlyExpenditure"
            id="monthlyExpenditure"
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">بدست:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="savings"
            id="savings"
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">خسارہ:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="loss"
            id="loss"
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};
