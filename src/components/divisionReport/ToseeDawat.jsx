import { useEffect } from "react";
import { calculateRawabitDecided } from "../halqa";

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
    const value = totalArkaan + (totalUmeedwaran * 3 + totalRafaqa * 2);
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
      const value = totalArkaan + (totalUmeedwaran * 3 + totalRafaqa * 2);
      elem.value = value;
      if (rwbMeetings) {
        const valueRawabitMeetings = value * 3;
        rwbMeetings.value = valueRawabitMeetings;
      }
    }
  });
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">توسیع دعوت</h2>
      <div className="flex flex-col  w-full items-start justify-start">
        <div className="flex py-2">
          <h3 className="block ml-28 font-bold">روابط:</h3>
        </div>
        <div className="flex py-2">
          <label className="block">طے شدہ:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={calculateRawabitDecided()}
            required
            name="rawabitDecided"
            id="rawabitDecided"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">روابط سےملاقاتوں کاہدف:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="rwabitMeetingsGoal"
            id="rwabitMeetingsGoal"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div style={{ display: "flex" }}>
          <label className="block">موجود:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`current`}
            id={`current`}
            className="border-b-2 text-center border-dashed "
          />
          +
          <input
            type="number"
            defaultValue={0}
            required
            readOnly={view}
            name={`currentManual`}
            id={`currentManual`}
            className="border-b-2 text-center border-dashed "
            oninput="calculateSum()"
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={
              parseInt(document.getElementById("current")?.value) +
              parseInt(document.getElementById("currentManual")?.value)
            }
            required
            name={`currentSum`}
            id={`currentSum`}
            className="border-b-2 text-center border-dashed "
          />
        </div>
        <div style={{ display: "flex" }}>
          <label className="block">ملاقاتوں کی تعداد:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`meetings`}
            id={`meetings`}
            className="border-b-2 text-center border-dashed "
          />
          +
          <input
            type="number"
            defaultValue={0}
            required
            readOnly={view}
            name={`meetingsManual`}
            id={`meetingsManual`}
            className="border-b-2 text-center border-dashed "
            oninput="calculateSum()"
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={
              parseInt(document.getElementById("meetings")?.value) +
              parseInt(document.getElementById("meetingsManual")?.value)
            }
            required
            name={`meetingsSum`}
            id={`meetingsSum`}
            className="border-b-2 text-center border-dashed "
          />
        </div>
        <div style={{ display: "flex" }}>
          <label className="block">تقسیم لٹریچر:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name={`litrature`}
            id={`litrature`}
            className="border-b-2 text-center border-dashed "
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-start justify-start">
        <div className="flex py-2 me-5">
          <label className="block ml-16 font-bold">عام طلبہ:</label>
        </div>
        <div style={{ display: "flex" }}>
          <label className="block">تقسیم لٹریچر:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name={`commonLiteratureDistribution`}
            id={`commonLiteratureDistribution`}
            className="border-b-2 text-center border-dashed "
          />
        </div>
        <div style={{ display: "flex" }}>
          <label className="block">ملاقاتیں:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name={`commonStudentMeetings`}
            id={`commonStudentMeetings`}
            className="border-b-2 text-center border-dashed "
          />
        </div>
      </div>
    </div>
  );
};
