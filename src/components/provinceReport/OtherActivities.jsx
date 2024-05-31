import { sumUpTwoValues } from "../muntakhibMaqamReports";

export const OtherActivities = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">دیگر سرگرمیاں</h2>
      <div className="flex flex-col py-2">
        <h2 className="block text-black py-3 text-lg"> تربیت گاہ:</h2>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">تربیت گاہ:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name={`tarbiyatGaah`}
            id={`tarbiyatGaah`}
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex sm:mb-2 py-2 overflow-hidden overflow-x-scroll w-full">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            تربیت گاہوں کے انعقاد کا ہدف:
          </label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name={`tarbiyatGaahGoal`}
            id={`tarbiyatGaahGoal`}
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex sm:mb-2 py-2 overflow-hidden overflow-x-scroll w-full">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            تربیت گاہوں کے انعقاد کا تعداد:
          </label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name={`tarbiyatGaahHeld`}
            id={`tarbiyatGaahHeld`}
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">تنظیمی دورہ:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            name="tanzeemiRound"
            id="tanzeemiRound"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0"
            required
          />
        </div>
      </div>
      <div className="flex-col lg:flex-row w-full items-center justify-start">
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">دعوتی وفود:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="dawatiWafud"
            id="dawatiWafud"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">روابط پارٹیز:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="rawabitParties"
            id="rawabitParties"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">شب بیداری:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="shabBedari"
            id="shabBedari"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">نظام الصلوٰۃ:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="nizamSalah"
            id="nizamSalah"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0"
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
