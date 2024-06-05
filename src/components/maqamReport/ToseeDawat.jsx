import { useEffect, useState } from "react";
import { sumUpTwoValues } from "../muntakhibMaqamReports";

export const maqamRawabitDecided = () => {
  const elem = document.getElementById("rawabitDecided");
  const rwbMeetings = document.getElementById("rwabitMeetingsGoal");
  const arS = document.getElementById("arkan-start")?.value;
  const arI = document.getElementById("arkan-increase")?.value;
  const arD = document.getElementById("arkan-decrease")?.value;
  const totalArkaan = parseInt(arS) + parseInt(arI) - parseInt(arD);
  const umS = document.getElementById("umeedWaran-start")?.value;
  const umI = document.getElementById("umeedWaran-increase")?.value;
  const umD = document.getElementById("umeedWaran-decrease")?.value;
  const totalUmeedwaran = parseInt(umS) + parseInt(umI) - parseInt(umD);
  const raS = document.getElementById("rafaqa-start")?.value;
  const raI = document.getElementById("rafaqa-increase")?.value;
  const raD = document.getElementById("rafaqa-decrease")?.value;
  const totalRafaqa = parseInt(raS) + parseInt(raI) - parseInt(raD);
  if (elem) {
    const value = (totalArkaan + totalUmeedwaran) * 3 + totalRafaqa * 2;
    elem.value = value;
    if (rwbMeetings) {
      const valueRawabitMeetings = value * 3;
      rwbMeetings.value = valueRawabitMeetings;
    }
  }
};
export const ToseeDawat = ({ view }) => {
  useEffect(() => {
    const elem = document.getElementById("rawabitDecided");
    const rwbMeetings = document.getElementById("rwabitMeetingsGoal");
    const arS = document.getElementById("arkan-start")?.value;
    const arI = document.getElementById("arkan-increase")?.value;
    const arD = document.getElementById("arkan-decrease")?.value;
    const totalArkaan = parseInt(arS) + parseInt(arI) - parseInt(arD);
    const umS = document.getElementById("umeedWaran-start")?.value;
    const umI = document.getElementById("umeedWaran-increase")?.value;
    const umD = document.getElementById("umeedWaran-decrease")?.value;
    const totalUmeedwaran = parseInt(umS) + parseInt(umI) - parseInt(umD);
    const raS = document.getElementById("rafaqa-start")?.value;
    const raI = document.getElementById("rafaqa-increase")?.value;
    const raD = document.getElementById("rafaqa-decrease")?.value;
    const totalRafaqa = parseInt(raS) + parseInt(raI) - parseInt(raD);
    if (elem) {
      const value = (totalArkaan + totalUmeedwaran) * 3 + totalRafaqa * 2;
      elem.value = value;
      if (rwbMeetings) {
        const valueRawabitMeetings = value * 3;
        rwbMeetings.value = valueRawabitMeetings;
      }
    }
  });
  const [cSum, setCSum] = useState();
  const [mSum, setMSum] = useState();
  useEffect(() => {
    const uFilled = parseInt(document.getElementById("current").value);
    const mFilled = parseInt(document.getElementById("currentManual").value);
    const meetM = parseInt(document.getElementById("meetingsManual").value);
    const meet = parseInt(document.getElementById("meetings").value);
    if ((uFilled, mFilled)) {
      setCSum(uFilled + mFilled);
    }
    if ((meet, meetM)) {
      setMSum(meet + meetM);
    }
  }, [cSum, mSum]);
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">توسیع دعوت</h2>
      <div className="flex flex-col  w-full items-start justify-start">
        <div className="flex py-2 mb-2 ">
          <h3 className=" block text-sm md:text-lg ml-28 font-bold">روابط:</h3>
        </div>
        <div className="flex py-2 mb-2 ">
          <label className=" block text-sm md:text-lg">طے شدہ:</label>
          <input
            readOnly={true}
            type="number"
            required
            name="rawabitDecided"
            id="rawabitDecided"
            className="border-b-2 text-center border-dashed   mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex gap-3 mb-2 overflow-hidden overflow-x-scroll w-full">
          <label className=" block text-sm md:text-lg">موجود:</label>
          <input
            readOnly={true}
            type="number"
            required
            name={`current`}
            id={`current`}
            className="border-b-2 text-center border-dashed  mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg "
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("current").value),
                parseInt(document.getElementById("currentManual").value),
                "currentSum"
              )
            }
          />
          +
          <input
            type="number"
            required
            readOnly={view}
            name={`currentManual`}
            id={`currentManual`}
            className="border-b-2 text-center border-dashed   mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg "
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("current").value),
                parseInt(document.getElementById("currentManual").value),
                "currentSum"
              )
            }
          />
          =
          <input
            readOnly={true}
            defaultValue={document.getElementById("current")?.value}
            type="number"
            required
            name={`currentSum`}
            id={`currentSum`}
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg "
            value={cSum}
          />
        </div>
        <div className="flex py-2 mb-2 ">
          <label className=" block text-sm md:text-lg">
            روابط سےملاقاتوں کاہدف:
          </label>
          <input
            readOnly={true}
            type="number"
            required
            name="rwabitMeetingsGoal"
            id="rwabitMeetingsGoal"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>

        <div className="flex md:flex-row flex-col w-full gap-1 md:gap-3 pb-2">
          <label className="block md:w-[20%] w-full text-sm md:text-lg mb-0 pt-2">
            ملاقاتوں کی تعداد:
          </label>
          <div className="w-full md:w-[80%] flex overflow-hidden overflow-x-scroll">
            <input
              readOnly={true}
              type="number"
              required
              name={`meetings`}
              id={`meetings`}
              className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg "
              onChange={() =>
                sumUpTwoValues(
                  parseInt(document.getElementById("meetings").value),
                  parseInt(document.getElementById("meetingsManual").value),
                  "meetingsSum"
                )
              }
            />
            +
            <input
              type="number"
              required
              readOnly={view}
              name={`meetingsManual`}
              id={`meetingsManual`}
              className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg "
              onChange={() =>
                sumUpTwoValues(
                  parseInt(document.getElementById("meetings").value),
                  parseInt(document.getElementById("meetingsManual").value),
                  "meetingsSum"
                )
              }
            />
            =
            <input
              readOnly={true}
              type="number"
              defaultValue={document.getElementById("meetings")?.value}
              required
              name={`meetingsSum`}
              id={`meetingsSum`}
              className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg "
              value={mSum}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 mb-2">
          <label className=" block text-sm md:text-lg">تقسیم لٹریچر:</label>
          <input
            readOnly={view}
            type="number"
            required
            name={`litrature`}
            id={`litrature`}
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg "
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-start justify-start">
        <div className="flex py-2 mb-2">
          <label className=" block text-sm md:text-lg ml-16 font-bold">
            عام طلبہ:
          </label>
        </div>
        <div className="flex gap-3 mb-2">
          <label className=" block text-sm md:text-lg">تقسیم لٹریچر:</label>
          <input
            readOnly={view}
            type="number"
            required
            name={`commonLiteratureDistribution`}
            id={`commonLiteratureDistribution`}
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg "
          />
        </div>
        <div className="flex gap-3 mb-2">
          <label className=" block text-sm md:text-lg">ملاقاتیں :</label>
          <input
            readOnly={view}
            type="number"
            required
            name={`commonStudentMeetings`}
            id={`commonStudentMeetings`}
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg "
          />
        </div>
      </div>
    </div>
  );
};
