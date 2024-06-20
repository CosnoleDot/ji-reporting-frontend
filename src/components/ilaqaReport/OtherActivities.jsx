export const OtherActivities = ({ view ,compile}) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">دیگر سرگرمیاں</h2>
      <div className="flex flex-wrap w-full items-center justify-start">
        <div className="flex py-2">
          <label className="block">دعوتی وفود:</label>
          <input
            readOnly={true}
            type="number"
            required
            name="dawatiWafud"
            id="dawatiWafud"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
          <label className="block">روابط پارٹیز:</label>
          <input
            readOnly={true}
            type="number"
            required
            name="rawabitParties"
            id="rawabitParties"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
          <label className="block">شب بیداری:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="shabBedari"
            id="shabBedari"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
          <label className="block">نظام الصلوٰۃ:</label>
          <input
            readOnly={true}
            type="number"
            required
            name="nizamSalah"
            id="nizamSalah"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>

        {!compile && <div className="flex py-2">
          <label className="block">کوئ اور سرگرمی:</label>
          <input
            readOnly={view}
            type="text"
            required
            name="anyOther"
            id="anyOther"
            className="border-b-2 border-dashed"
          />
        </div>}
      </div>
    </div>
  );
};
