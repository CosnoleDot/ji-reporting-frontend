export const RozOShabDiary = () => {
    return (
      <div className="p-2 py-5 relative w-full overflow-auto">
        <h2 className="text-black py-3 text-lg">روزشب ڈائری</h2>
        <div className="flex flex-wrap w-full items-start justify-start flex-col">
          
          <div className="flex py-2 ml-4">
            <label className="block"> کتنے امیدواران فل کرتے ھیں:</label>
            <input
              type="number"
              name="umeedwaranFilled"
              id="umeedwaranFilled"
              className="border-b-2 text-center border-dashed"
            />
          </div>
          <div className="flex py-2 ">
            <label className="block">کتنےرفقافل کرتے ھیں:</label>
            <input
              type="number"
              name="rafaqaFilled"
              id="rafaqaFilled"
              className="border-b-2 text-center border-dashed"
            />
          </div>
          
        </div>
        
      </div>
    );
  };