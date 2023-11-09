import React from "react";
import { InputWithLabel } from "../InputWithLabel";

export const Zila = () => {
  return (
    <div className="w-full sm:overflow-x-scroll" dir="rtl">
      <table className="w-full border border-gray-400 ">
        <div className=" w-full bg-gray-100 p-2 flex justify-between items-start">
          <tr className=" w-full bg-gray-100 mb-3 flex justify-between items-start">
            <td className="text-start text-lg w-full">زیلی طے شدھ سرگرمیاں</td>
            <td className="text-start text-lg w-full">طےشدھ</td>
            <td className="text-start text-lg w-full">منعقدھ</td>
            <td className="text-center text-lg w-full">اوسط حاضری</td>
          </tr>
        </div>
        <div className="p-2 flex w-full flex-col justify-between items-start min-w-[700px]">
          <tr className=" w-full bg-gray-100 mb-5 flex justify-between items-start">
            <td>اجتمعِ رفقا </td>
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
            <td>اجتمع کارکنان </td>
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
            <td>درس قرآن </td>
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
            <td> شاہین میٹنگ </td>
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
            <td> پیغام محفل </td>
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
