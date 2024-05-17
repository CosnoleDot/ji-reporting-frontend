export const OtherActivities = ({ view }) => {
  const sumUpTwoValues = (val1, val2, final) => {
    document.getElementById(final).value = val1 + val2;
  };
//   let a =document.getElementById('tarbiyatGaahGoalSum')?.value;
//   let b = document.getElementById('tarbiyatGaahHeldSum')?.value
//   a= parseInt(document.getElementById('tarbiyatGaahGoal')?.value) + parseInt(document.getElementById('tarbiyatGaahGoalManual')?.value);
//  b = parseInt(document.getElementById('tarbiyatGaahHeld')?.value) + parseInt(document.getElementById('tarbiyatGaahHeldManual')?.value);
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">دیگر سرگرمیاں</h2>
      <div className="flex flex-col py-2">
        <h2 className="block text-black py-3 text-lg"> تربیت گاہ:</h2>
        <div className="flex py-2">
          <label className="block">تربیت گاہ:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`tarbiyatGaah`}
            id={`tarbiyatGaah`}
            className="p-1 text-center "
          />
        </div>
        <div className="flex py-2">
          <label className="block">تربیت گاہوں کے انعقاد کا ہدف:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("tarbiyatGaahGoal").value),
                parseInt(document.getElementById("tarbiyatGaahGoalManual").value),
                "tarbiyatGaahGoalSum"
              )
            }
            name={`tarbiyatGaahGoal`}
            id={`tarbiyatGaahGoal`}
            className="p-1 text-center "
          />
          +
          <input
            type="number"
            readOnly={view}
            placeholder="ذیلی حلقہ"
            required
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("tarbiyatGaahGoal").value),
                parseInt(document.getElementById("tarbiyatGaahGoalManual").value),
                "tarbiyatGaahGoalSum"
              )
            }
            name={`tarbiyatGaahGoalManual`}
            id={`tarbiyatGaahGoalManual`}
            className="p-1 text-center "
            
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={
              document.getElementById("tarbiyatGaahGoal")?.value
            }
            required
            name={`tarbiyatGaahGoalSum`}
            id={`tarbiyatGaahGoalSum`}
            className="p-1 text-center "
          />
        </div>
        <div className="flex py-2">
          <label className="block">تربیت گاہوں کے انعقاد کا تعداد:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("tarbiyatGaahHeld").value),
                parseInt(document.getElementById("tarbiyatGaahHeldManual").value),
                "tarbiyatGaahHeldSum"
              )
            }
            name={`tarbiyatGaahHeld`}
            id={`tarbiyatGaahHeld`}
            className="p-1 text-center "
          />
          +
          <input
            type="number"
            readOnly={view}
            placeholder="ذیلی حلقہ"
            required
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("tarbiyatGaahHeld").value),
                parseInt(document.getElementById("tarbiyatGaahHeldManual").value),
                "tarbiyatGaahHeldSum"
              )
            }
            name={`tarbiyatGaahHeldManual`}
            id={`tarbiyatGaahHeldManual`}
            className="p-1 text-center "
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={
              document.getElementById("tarbiyatGaahHeld")?.value
            }
            required
            name={`tarbiyatGaahHeldSum`}
            id={`tarbiyatGaahHeldSum`}
            classNam
          />
        </div>
      </div>
      <div className="flex flex-wrap w-full items-center justify-start">
      <div className="flex py-2">
          <label className="block">تنظیمی دورہ:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name="tanzeemiRound"
            id="tanzeemiRound"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">دعوتی وفود:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="dawatiWafud"
            id="dawatiWafud"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">روابط پارٹیز:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="rawabitParties"
            id="rawabitParties"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">شب بیداری:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="shabBedari"
            id="shabBedari"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">نظام الصلوٰۃ:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="nizamSalah"
            id="nizamSalah"
            className="border-b-2 text-center border-dashed"
          />
        </div>

        <div className="flex py-2">
          <label className="block">کوئ اور سرگرمی:</label>
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
