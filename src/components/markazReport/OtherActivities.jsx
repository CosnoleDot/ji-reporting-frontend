export const OtherActivities = ({ view }) => {
  const sumUpTwoValues = (val1, val2, final) => {
    document.getElementById(final).value = val1 + val2;
  };

  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">دیگر سرگرمیاں</h2>
      <div className="flex flex-col py-2">
        <h2 className="block text-black py-3 text-lg"> تربیت گاہ:</h2>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            تربیت گاہ:
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`tarbiyatGaah`}
            id={`tarbiyatGaah`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex flex-col lg:flex-row py-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            تربیت گاہوں کے انعقاد کا ہدف:
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("tarbiyatGaahGoal").value),
                parseInt(
                  document.getElementById("tarbiyatGaahGoalManual").value
                ),
                "tarbiyatGaahGoalSum"
              )
            }
            name={`tarbiyatGaahGoal`}
            id={`tarbiyatGaahGoal`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
          +
          <input
            type="number"
            readOnly={view}
            required
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("tarbiyatGaahGoal").value),
                parseInt(
                  document.getElementById("tarbiyatGaahGoalManual").value
                ),
                "tarbiyatGaahGoalSum"
              )
            }
            name={`tarbiyatGaahGoalManual`}
            id={`tarbiyatGaahGoalManual`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={document.getElementById("tarbiyatGaahGoal")?.value}
            required
            name={`tarbiyatGaahGoalSum`}
            id={`tarbiyatGaahGoalSum`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex flex-col lg:flex-row py-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            تربیت گاہوں کے انعقاد کا تعداد:
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("tarbiyatGaahHeld").value),
                parseInt(
                  document.getElementById("tarbiyatGaahHeldManual").value
                ),
                "tarbiyatGaahHeldSum"
              )
            }
            name={`tarbiyatGaahHeld`}
            id={`tarbiyatGaahHeld`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
          +
          <input
            type="number"
            readOnly={view}
            required
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("tarbiyatGaahHeld").value),
                parseInt(
                  document.getElementById("tarbiyatGaahHeldManual").value
                ),
                "tarbiyatGaahHeldSum"
              )
            }
            name={`tarbiyatGaahHeldManual`}
            id={`tarbiyatGaahHeldManual`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={document.getElementById("tarbiyatGaahHeld")?.value}
            required
            name={`tarbiyatGaahHeldSum`}
            id={`tarbiyatGaahHeldSum`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
      </div>
      <div className="flex-col lg:flex-row w-full items-center justify-start">
        <div className="flex py-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            تنظیمی دورہ:
          </label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name="tanzeemiRound"
            id="tanzeemiRound"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
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
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
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
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
            شب بیداری:
          </label>
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
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
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

        <div className="flex py-2">
          <label className="block text-sm md:text-lg mb-2 lg:mb-0 pt-2">
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
