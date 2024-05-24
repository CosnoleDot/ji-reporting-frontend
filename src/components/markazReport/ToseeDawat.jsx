export const ToseeDawat = ({}) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">توسیع دعوت</h2>
      <div className="flex flex-col  w-full items-start justify-start">
        <div className="flex py-2">
          <h3 className="block ml-28 font-bold">روابط:</h3>
        </div>
        <div className="flex py-2">
                 <label className="block text-sm md:text-lg mb-2 lg:mb-0">طے شدہ:</label>
          <input
            readOnly={true}
            type="number"
            required
            name="rawabitDecided"
            id="rawabitDecided"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
       <div className="flex-col lg:flex-row">
                 <label className="block text-sm md:text-lg mb-2 lg:mb-0">موجود:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`current`}
            id={`current`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
        <div className="flex py-2">
                 <label className="block text-sm md:text-lg mb-2 lg:mb-0">روابط سےملاقاتوں کاہدف:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            value={
              parseInt(document.getElementById("rawabitDecided")?.value) * 3
            }
            name="rwabitMeetingsGoal"
            id="rwabitMeetingsGoal"
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>

       <div className="flex-col lg:flex-row">
                 <label className="block text-sm md:text-lg mb-2 lg:mb-0">ملاقاتوں کی تعداد:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`meetings`}
            id={`meetings`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
       <div className="flex-col lg:flex-row">
                 <label className="block text-sm md:text-lg mb-2 lg:mb-0">تقسیم لٹریچر:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`literatureDistribution`}
            id={`literatureDistribution`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-start justify-start">
        <div className="flex py-2 me-5">
          <label className="block ml-16 font-bold">عام طلبہ:</label>
        </div>
       <div className="flex-col lg:flex-row">
                 <label className="block text-sm md:text-lg mb-2 lg:mb-0">تقسیم لٹریچر:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`commonLiteratureDistribution`}
            id={`commonLiteratureDistribution`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
       <div className="flex-col lg:flex-row">
                 <label className="block text-sm md:text-lg mb-2 lg:mb-0"> ملاقاتیں :</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`commonStudentMeetings`}
            id={`commonStudentMeetings`}
            className="border-b-2 text-center border-dashed  max-w-[6rem] md:max-w-lg mb-2 lg:mb-0"
          />
        </div>
      </div>
    </div>
  );
};
