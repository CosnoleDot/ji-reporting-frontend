import React from "react";
import { Box } from "./IfradiKuwat";

export const MarkaziActivities = ({ view }) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full table">
        <thead>
          <tr>
            <Box type={"heading"}>علاقے کی طے شدہ سرگرمیاں</Box>
            <Box>طے شدہ</Box>
            <Box>منعقدہ</Box>
            <Box>اوسط حاضری</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>سٹڈی سرکل</Box>
            <Box>
              <input
                type="number"
                required
                name={`studyCircle-decided`}
                id={`studyCircle-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`studyCircle-done`}
                id={`studyCircle-done`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`studyCircle-averageAttendance`}
                id={`studyCircle-averageAttendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>اجتماع ناظمین/تنظیمی کمیٹی</Box>
            <Box>
              <input
                type="number"
                required
                name={`ijtNazmeen-decided`}
                id={`ijtNazmeen-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`ijtNazmeen-done`}
                id={`ijtNazmeen-done`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`ijtNazmeen-averageAttendance`}
                id={`ijtNazmeen-averageAttendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>اجتماع امیدواران</Box>
            <Box>
              <input
                type="number"
                required
                name={`ijtUmeedwaran-decided`}
                id={`ijtUmeedwaran-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`ijtUmeedwaran-done`}
                id={`ijtUmeedwaran-done`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`ijtUmeedwaran-averageAttendance`}
                id={`ijtUmeedwaran-averageAttendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>صدورمیٹنگ</Box>
            <Box>
              <input
                type="number"
                required
                name={`sadurMeeting-decided`}
                id={`sadurMeeting-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`sadurMeeting-done`}
                id={`sadurMeeting-done`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                required
                name={`sadurMeeting-averageAttendance`}
                id={`sadurMeeting-averageAttendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
