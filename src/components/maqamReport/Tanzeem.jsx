import React from "react";

import { InputWithLabel } from "../InputWithLabel";
import { Box } from "./IfradiKuwat";

export const Tanzeem = ({ view , data}) => {
  const calcultate= (v)=>{
    // (start + increase)- decrease
    const s = parseInt(data[`${v}-start`]);
    const i = parseInt(data[`${v}-increase`]);
    const d = parseInt(data[`${v}-decrease`]);
    return (s+i)-d;
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full table">
        <thead>
          <tr>
            <Box type={"heading"}>تنظیم</Box>
            <Box>آغازمیں</Box>
            <Box>اِضافہ</Box>
            <Box>کمی</Box>
            <Box>اختتام پر</Box>
            <Box>فعال</Box>
            <Box>غیرفعال</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>رہائشی حلقے</Box>
            <Box>
              <input
                type="number"
                name={`rehaishHalqay-start`}
                id={`rehaishHalqay-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`rehaishHalqay-increase`}
                id={`rehaishHalqay-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`rehaishHalqay-decrease`}
                id={`rehaishHalqay-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`rehaishHalqay-end`}
                id={`rehaishHalqay-end`}
                value={calcultate('rehaishHalqay')}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`rehaishHalqay-continue`}
                id={`rehaishHalqay-continue`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`rehaishHalqay-paused`}
                id={`rehaishHalqay-paused`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>تعلیمی حلقے</Box>
            <Box>
              <input
                type="number"
                name={`taleemHalqay-start`}
                id={`taleemHalqay-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`taleemHalqay-increase`}
                id={`taleemHalqay-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`taleemHalqay-decrease`}
                id={`taleemHalqay-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`taleemHalqay-end`}
                id={`taleemHalqay-end`}
                value={calcultate('taleemHalqay')}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`taleemHalqay-continue`}
                id={`taleemHalqay-continue`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`taleemHalqay-paused`}
                id={`taleemHalqay-paused`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>کل حلقے</Box>
            <Box>
              <input
                type="number"
                name={`totalHalqay-start`}
                id={`totalHalqay-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`totalHalqay-increase`}
                id={`totalHalqay-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`totalHalqay-decrease`}
                id={`totalHalqay-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`totalHalqay-end`}
                id={`totalHalqay-end`}
                value={calcultate('totalHalqay')}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`totalHalqay-continue`}
                id={`totalHalqay-continue`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`totalHalqay-paused`}
                id={`totalHalqay-paused`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>رہاشی زیلی حلقے</Box>
            <Box>
              <input
                type="number"
                name={`subRehaishHalqay-start`}
                id={`subRehaishHalqay-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subRehaishHalqay-increase`}
                id={`subRehaishHalqay-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subRehaishHalqay-decrease`}
                id={`subRehaishHalqay-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subRehaishHalqay-end`}
                id={`subRehaishHalqay-end`}
                value={calcultate('subRehaishHalqay')}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subRehaishHalqay-continue`}
                id={`subRehaishHalqay-continue`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subRehaishHalqay-paused`}
                id={`subRehaishHalqay-paused`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>تعلیمی ذیلی حلقے</Box>
            <Box>
              <input
                type="number"
                name={`subTaleemHalqay-start`}
                id={`subTaleemHalqay-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subTaleemHalqay-increase`}
                id={`subTaleemHalqay-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subTaleemHalqay-decrease`}
                id={`subTaleemHalqay-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subTaleemHalqay-end`}
                id={`subTaleemHalqay-end`}
                value={calcultate('subTaleemHalqay')}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subTaleemHalqay-continue`}
                id={`subTaleemHalqay-continue`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subTaleemHalqay-paused`}
                id={`subTaleemHalqay-paused`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>کل ذیلی حلقے</Box>
            <Box>
              <input
                type="number"
                name={`subTotalHalqay-start`}
                id={`subTotalHalqay-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subTotalHalqay-increase`}
                id={`subTotalHalqay-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subTotalHalqay-decrease`}
                id={`subTotalHalqay-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subTotalHalqay-end`}
                id={`subTotalHalqay-end`}
                value={calcultate('subTotalHalqay')}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subTotalHalqay-continue`}
                id={`subTotalHalqay-continue`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`subTotalHalqay-paused`}
                id={`subTotalHalqay-paused`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>بزم کے سکول یونٹس</Box>
            <Box>
              <input
                type="number"
                name={`busmSchoolUnits-start`}
                id={`busmSchoolUnits-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmSchoolUnits-increase`}
                id={`busmSchoolUnits-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmSchoolUnits-decrease`}
                id={`busmSchoolUnits-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmSchoolUnits-end`}
                id={`busmSchoolUnits-end`}
                value={calcultate('busmSchoolUnits')}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmSchoolUnits-continue`}
                id={`busmSchoolUnits-continue`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmSchoolUnits-paused`}
                id={`busmSchoolUnits-paused`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>بزم کےرہاشی یونٹس</Box>
            <Box>
              <input
                type="number"
                name={`busmRehaishUnits-start`}
                id={`busmRehaishUnits-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmRehaishUnits-increase`}
                id={`busmRehaishUnits-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmRehaishUnits-decrease`}
                id={`busmRehaishUnits-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmRehaishUnits-end`}
                id={`busmRehaishUnits-end`}
                value={calcultate('busmRehaishUnits')}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmRehaishUnits-continue`}
                id={`busmRehaishUnits-continue`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmRehaishUnits-paused`}
                id={`busmRehaishUnits-paused`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>بزم کے کل یونٹس</Box>
            <Box>
              <input
                type="number"
                name={`busmTotalUnits-start`}
                id={`busmTotalUnits-start`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmTotalUnits-increase`}
                id={`busmTotalUnits-increase`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmTotalUnits-decrease`}
                id={`busmTotalUnits-decrease`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmTotalUnits-end`}
                id={`busmTotalUnits-end`}
                value={calcultate('busmTotalUnits')}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmTotalUnits-continue`}
                id={`busmTotalUnits-continue`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`busmTotalUnits-paused`}
                id={`busmTotalUnits-paused`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
