export const ToseeDawat = () => {
    return (
      <div className="p-2 py-5 relative w-full overflow-auto">
        <h2 className="text-black py-3 text-lg">توسیع دعوت</h2>
        <div className="flex flex-wrap w-full items-center justify-start">
          <div className="flex py-2">
            <h3 className="block ml-28 font-bold">روابط:</h3>
            
          </div>
          <div className="flex py-2">
            <label className="block">طے شدہ:</label>
            <input
            readOnly={true}
              type="number"
              name="rawabitDecided"
              id="rawabitDecided"
              className="border-b-2 text-center border-dashed"
            />
          </div>
          <div className="flex py-2">
            <label className="block">موجود:</label>
            <input
            readOnly={true}
              type="number"
              name="current"
              id="current"
              className="border-b-2 text-center border-dashed"
            />
          </div>
          <div className="flex py-2">
            <label className="block">ملاقاتیں:</label>
            <input
            readOnly={true}
              type="number"
              name="meetings"
              id="meetings"
              className="border-b-2 text-center border-dashed"
            />
          </div>
          <div className="flex py-2">
            <label className="block">تقسیم لٹریچر:</label>
            <input
            readOnly={true}
              type="number"
              name="literatureDistribution"
              id="literatureDistribution"
              className="border-b-2 text-center border-dashed"
            />
          </div>
          <div className="flex py-2">
            <label className="block">مرتب:</label>
            <input
            readOnly={true}
              type="checkbox"
              name="registeredTosee"
              id="registeredTosee"
              className="checkbox ms-2"
            />
          </div>
        </div>
        <div className="flex flex-wrap w-full items-center justify-start">
          <div className="flex py-2 me-5">
            <label className="block ml-16 font-bold">عام طلبء:</label>
          </div>
          <div className="flex py-2">
            <label className="block">ملاقاتیں:</label>
            <input
            readOnly={true}
              type="number"
              name="commonStudentMeetings"
              id="commonStudentMeetings"
              className="border-b-2 text-center border-dashed"
            />
          </div>
          <div className="flex py-2">
            <label className="block">تقسیم لٹریچر:</label>
            <input
            readOnly={true}
              type="number"
              name="commonLiteratureDistribution"
              id="commonLiteratureDistribution"
              className="border-b-2 text-center border-dashed"
            />
          </div>
        </div>
      </div>
    );
  };
  