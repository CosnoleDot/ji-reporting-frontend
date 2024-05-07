export const calculateRawabitDecided = () => {
  const elem = document.getElementById("rawabitDecided");
  const rwbMeetings = document.getElementById("rwabitMeetingsGoal");
  const arS = document.getElementById("arkan-start")?.value;
  const arI = document.getElementById("arkan-increase")?.value;
  const arD = document.getElementById("arkan-decrease")?.value;
  console.log(arS,arI,arD)
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
    elem.value = totalArkaan + (totalUmeedwaran * 3 + totalRafaqa * 2);
    if (rwbMeetings) {
      rwbMeetings.value = elem.value * 3;
    }
  }
};

export const ToseeDawat = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">توسیع دعوت</h2>
      <div className="flex flex-wrap w-full items-center justify-start">
        <div className="flex py-2 me-5">
          <label className="block">روابط:</label>
        </div>
        <div className="flex py-2">
          <label className="block">طے شدہ:</label>
          <input
            readOnly
            type="number"
            defaultValue={0}
            required
            name="rawabitDecided"
            id="rawabitDecided"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">موجود:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name="current"
            id="current"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">روابط سےملاقاتوں کاہدف:</label>
          <input
            readOnly
            type="number"
            defaultValue={0}
            required
            name="rwabitMeetingsGoal"
            id="rwabitMeetingsGoal"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">ملاقاتوں کی تعداد:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name="meetings"
            id="meetings"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">تقسیم لٹریچر:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name="literatureDistribution"
            id="literatureDistribution"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">روابط رجسٹر مرتب:</label>
          {view ? (
            <input
              disabled
              type="checkbox"
              name="registeredTosee"
              id="registeredTosee"
              className="checkbox ms-2"
            />
          ) : (
            <input
              type="checkbox"
              name="registeredTosee"
              id="registeredTosee"
              className="checkbox ms-2"
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap w-full items-center justify-start">
        <div className="flex py-2 me-5">
          <label className="block">عام طلبہ:</label>
        </div>
        <div className="flex py-2">
          <label className="block">ملاقاتیں:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name="commonStudentMeetings"
            id="commonStudentMeetings"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">تقسیم لٹریچر:</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name="commonLiteratureDistribution"
            id="commonLiteratureDistribution"
            className="border-b-2 text-center border-dashed"
          />
        </div>
      </div>
    </div>
  );
};
