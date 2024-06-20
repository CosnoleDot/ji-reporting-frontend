export const Library = ({ view ,compile}) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">لائبریری</h2>
      <div className="flex-col lg:flex-row w-full items-center justify-start">
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">تعداد کتب:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="books"
            id="books"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">اضافہ:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="increase"
            id="increase"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">کمی:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="decrease"
            id="decrease"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        <div className="flex py-2">
          <label className="block text-sm md:text-lg">اجرائے کتب:</label>
          <input
            readOnly={view}
            type="number"
            required
            name="bookRent"
            id="bookRent"
            className="border-b-2 text-center border-dashed mb-2 lg:mb-0 max-w-[6rem] md:max-w-lg"
          />
        </div>
        {!compile && <div className="flex py-2">
          <label className="block text-sm md:text-lg">
            لائبریری رجسٹر مرتب:
          </label>
          {view ? (
            <input
              disabled
              type="checkbox"
              name="registeredLibrary"
              id="registeredLibrary"
              className="checkbox ms-2"
            />
          ) : (
            <input
              type="checkbox"
              name="registeredLibrary"
              id="registeredLibrary"
              className="checkbox ms-2"
            />
          )}
        </div>}
      </div>
    </div>
  );
};
