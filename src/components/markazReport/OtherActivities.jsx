export const OtherActivities = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">دیگر سرگرمیاں</h2>
      <div className="flex flex-col py-2">
        <h2 className="block text-black py-3 text-lg"> تربیت گاہ:</h2>
        <div className="flex py-2">
          <label className="block">تربیت گاہوں کے انعقاد کا ہدف:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`tarbiyatGaah`}
            id={`tarbiyatGaah`}
            className="p-1 text-center "
          />
          +
          <input
            type="number"
            readOnly={view}
            defaultValue={0}
            required
            name={`tarbiyatGaahGoalManual`}
            id={`tarbiyatGaahGoalManual`}
            className="p-1 text-center "
            oninput="calculateSum()"
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={
              parseInt(document.getElementById("tarbiyatGaah")?.value) +
              parseInt(document.getElementById("tarbiyatGaahGoalManual")?.value)
            }
            required
            name={`tarbiyatGaahEstSum`}
            id={`tarbiyatGaahEstSum`}
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
            name={`tarbiyatGaah`}
            id={`tarbiyatGaah`}
            className="p-1 text-center "
          />
          +
          <input
            type="number"
            readOnly={view}
            defaultValue={0}
            required
            name={`tarbiyatGaahEstManual`}
            id={`tarbiyatGaahEstManual`}
            className="p-1 text-center "
            oninput="calculateSum()"
          />
          =
          <input
            readOnly={view}
            type="number"
            defaultValue={
              parseInt(document.getElementById("tarbiyatGaah")?.value) +
              parseInt(document.getElementById("tarbiyatGaahEstManual")?.value)
            }
            required
            name={`tarbiyatGaahEstSum`}
            id={`tarbiyatGaahEstSum`}
            classNam
          />
        </div>
      </div>
      <div className="flex flex-wrap w-full items-center justify-start">
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