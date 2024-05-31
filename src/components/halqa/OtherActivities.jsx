export const OtherActivities = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">دیگر سرگرمیاں</h2>
      <div className="flex-col lg:flex-row w-full items-center justify-start">
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">دعوتی وفود:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="dawatiWafud"
            id="dawatiWafud"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">روابط پارٹیز:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="rawabitParties"
            id="rawabitParties"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">حدیث سرکل:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="hadithCircle"
            id="hadithCircle"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">نظام الصلوٰۃ:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="nizamSalah"
            id="nizamSalah"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">شب بیداری:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="shabBedari"
            id="shabBedari"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">کوئ اور سرگرمی:</label>
          <input
            readOnly={view}
            type="text"
            required
            name="anyOther"
            id="anyOther"
            className="border-b-2 border-dashed"
          />
        </div>
      </div>
    </div>
  );
};
