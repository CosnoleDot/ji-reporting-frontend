export const Library = () => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">لائبریری</h2>
      <div className="flex flex-wrap w-full items-center justify-start">
        <div className="flex py-2">
          <label className="block">تعداد کتب:</label>
          <input
            type="number"
            name="books"
            id="books"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">ااضافہ:</label>
          <input
            type="number"
            name="increase"
            id="increase"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">کمی:</label>
          <input
            type="number"
            name="decrease"
            id="decrease"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">اجرائے کتب:</label>
          <input
            type="number"
            name="bookRent"
            id="bookRent"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">مرتب:</label>
          <input
            type="checkbox"
            name="registeredLibrary"
            id="registeredLibrary"
            className="checkbox ms-2"
          />
        </div>
      </div>
    </div>
  );
};
