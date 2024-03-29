import { useContext } from "react";
import { HalqaContext } from "../../context";

export const Library = () => {
  const halqa = useContext(HalqaContext);
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">لائبریری</h2>
      <div className="flex flex-wrap w-full items-center justify-start">
        <div className="flex py-2">
          <label className="block"> کل تعداد لائبریریز:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={halqa.length}
            required
            name="totalLibraries"
            id="totalLibraries"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">کل تعدادکتب:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="totalBooks"
            id="totalBooks"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">اضافہ کتب:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="totalIncrease"
            id="totalIncrease"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">کمی کتب :</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="totalDecrease"
            id="totalDecrease"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2">
          <label className="block">کل اجرائے کتب:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="totalBookRent"
            id="totalBookRent"
            className="border-b-2 text-center border-dashed"
          />
        </div>
      </div>
    </div>
  );
};
