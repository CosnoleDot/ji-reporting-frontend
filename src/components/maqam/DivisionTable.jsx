import { InputWithLabel } from "../InputWithLabel";

export const DivisionTable = () => {
  return (
    <div className="w-full " dir="rtl">
      <table className="w-full border border-gray-400 ">
        <div className=" w-full bg-gray-100 p-2 flex justify-between items-start">
          <tr className=" w-full bg-gray-100 mb-3 flex justify-between items-start">
            <td className="text-start text-lg w-full">مرکزی طے شدھ سرگرمیاں</td>
            <td className="text-start text-lg w-full">طےشدھ</td>
            <td className="text-start text-lg w-full">منعقدھ</td>
            <td className="text-center w-full text-lg">اوسط حاضری</td>
          </tr>
        </div>
        <div className="p-2 flex w-full flex-col justify-between items-start">
          <tr className=" w-full bg-gray-100 mb-5 flex justify-between items-start">
            <td>اجتمعِ ارکان</td>
            <td>
              <InputWithLabel label={""} type={"number"} />
            </td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
          </tr>
          <tr className=" w-full bg-gray-100 mb-5 flex justify-between items-start">
            <td>سٹڈی سرکل</td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
          </tr>
          <tr className=" w-full bg-gray-100 mb-5 flex justify-between items-start">
            <td>اجتمع ناظمین</td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
          </tr>
          <tr className=" w-full bg-gray-100 mb-5 flex justify-between items-start">
            <td>اجتمع امیدوار</td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
          </tr>
          <tr className=" w-full bg-gray-100 mb-5 flex justify-between items-start">
            <td>صدورمیٹینگ</td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
            <td>
              <td>
                <InputWithLabel label={""} type={"number"} />
              </td>
            </td>
          </tr>
        </div>
      </table>
    </div>
  );
};
