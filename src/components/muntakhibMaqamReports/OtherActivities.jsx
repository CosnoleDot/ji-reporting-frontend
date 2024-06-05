export const OtherActivities = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">دیگر سرگرمیاں</h2>
      <div className="flex flex-wrap w-full items-center justify-start">
        <div className="flex py-2">
       <label className="block text-sm md:text-lg mb-2 lg:mb-0 p-2 ">
            دعوتی وفود:
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="dawatiWafud"
            id="dawatiWafud"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
       <label className="block text-sm md:text-lg mb-2 lg:mb-0 p-2 ">
            روابط پارٹیز:
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="rawabitParties"
            id="rawabitParties"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
       <label className="block text-sm md:text-lg mb-2 lg:mb-0 p-2 ">شب بیداری:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="shabBedari"
            id="shabBedari"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
       <label className="block text-sm md:text-lg mb-2 lg:mb-0 p-2 ">
            نظام الصلوٰۃ:
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="nizamSalah"
            id="nizamSalah"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>

        <div className="flex gap-4 py-2">
          <label className="block text-sm md:text-lg  mb-2 lg:mb-0">
            کوئ اور سرگرمی:
          </label>
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
