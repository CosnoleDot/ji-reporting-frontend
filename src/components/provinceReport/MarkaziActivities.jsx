import React from "react";
import { Box } from "../halqa";




export const MarkaziActivities = () => {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full table">
        <thead>
          <tr>
            <Box type={"heading"}>مرکزی طے شدہ سرگرمیاں</Box>
            <Box>طے شدہ</Box>
            <Box>منعقدہ</Box>
            <Box>اوسط حاضری</Box>
            <Box>مرتب</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>ڈویژنل مشاورات</Box>
            <Box>
              <input
                type="number"
                name={`divMushawarat-decided`}
                id={`divMushawarat-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`divMushawarat-done`}
                id={`divMushawarat-done`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`divMushawarat-averageAttendance`}
                id={`divMushawarat-averageAttendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>

            <Box>
              <input
                type="checkbox"
                className="p-1 text-center min-w-full checkbox"
                name={`divMushawarat-registered`}
                id={`divMushawarat-registered`}
              />
            </Box>
          </tr>
          <tr>
            <Box>اجتماع ارکان</Box>
            <Box>
              <input
                type="number"
                name={`ijtArkan-decided`}
                id={`ijtArkan-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`ijtArkan-done`}
                id={`ijtArkan-done`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`ijtArkan-averageAttendance`}
                id={`ijtArkan-averageAttendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>

            <Box>
              <input
                type="checkbox"
                className="p-1 text-center min-w-full checkbox"
                name={`ijtArkan-registered`}
                id={`ijtArkan-registered`}
              />
            </Box>
          </tr>
          <tr>
            <Box>سٹڈی سرکل</Box>
            <Box>
              <input
                type="number"
                name={`studyCircle-decided`}
                id={`studyCircle-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`studyCircle-done`}
                id={`studyCircle-done`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`studyCircle-averageAttendance`}
                id={`studyCircle-averageAttendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>

            <Box>
              <input
                type="checkbox"
                className="p-1 text-center min-w-full checkbox"
                name={`studyCircle-registered`}
                id={`studyCircle-registered`}
              />
            </Box>
          </tr>
          <tr>
            <Box>اجتماع ناظمین</Box>
            <Box>
              <input
                type="number"
                name={`sadurMeeting-decided`}
                id={`sadurMeeting-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`sadurMeeting-done`}
                id={`sadurMeeting-done`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`sadurMeeting-averageAttendance`}
                id={`sadurMeeting-averageAttendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>

            <Box>
              <input
                type="checkbox"
                className="p-1 text-center min-w-full checkbox"
                name={`sadurMeeting-registered`}
                id={`sadurMeeting-registered`}
              />
            </Box>
          </tr>
          <tr>
            <Box>اجتماع امیدواران</Box>
            <Box>
              <input
                type="number"
                name={`ijtUmeedwaran-decided`}
                id={`ijtUmeedwaran-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`ijtUmeedwaran-done`}
                id={`ijtUmeedwaran-done`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`ijtUmeedwaran-averageAttendance`}
                id={`ijtUmeedwaran-averageAttendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>

            <Box>
              <input
                type="checkbox"
                className="p-1 text-center min-w-full checkbox"
                name={`ijtUmeedwaran-registered`}
                id={`ijtUmeedwaran-registered`}
              />
            </Box>
          </tr>
          <tr>
            <Box>صدورمیٹینگ</Box>
            <Box>
              <input
                type="number"
                name={`sadurMeeting-decided`}
                id={`sadurMeeting-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`sadurMeeting-done`}
                id={`sadurMeeting-done`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                type="number"
                name={`sadurMeeting-averageAttendance`}
                id={`sadurMeeting-averageAttendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>

            <Box>
              <input
                type="checkbox"
                className="p-1 text-center min-w-full checkbox"
                name={`sadurMeeting-registered`}
                id={`sadurMeeting-registered`}
              />
            </Box>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};
