import { Box } from "./IfradiKuwat";

export const Activity = ({view}) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full table">
        <thead>
          <tr>
            <Box type={"heading"}>طے شدہ سرگرمیاں</Box>
            <Box>طےشدہ</Box>
            <Box>منعقدہ</Box>
            <Box>حاضری</Box>
            <Box>عنوان</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>احتمع رفقا</Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`ijtRafaqa-decided`}
                id={`ijtRafaqa-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`ijtRafaqa-completed`}
                id={`ijtRafaqa-completed`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`ijtRafaqa-attendance`}
                id={`ijtRafaqa-attendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="text"
                name={`ijtRafaqa-title`}
                id={`ijtRafaqa-title`}
                className="p-1 min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>اجتماع کارکنان</Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`ijtKarkunan-decided`}
                id={`ijtKarkunan-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`ijtKarkunan-completed`}
                id={`ijtKarkunan-completed`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`ijtKarkunan-attendance`}
                id={`ijtKarkunan-attendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="text"
                name={`ijtKarkunan-title`}
                id={`ijtKarkunan-title`}
                className="p-1 min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>سٹڈی سرکل</Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`studyCircle-decided`}
                id={`studyCircle-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`studyCircle-completed`}
                id={`studyCircle-completed`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`studyCircle-attendance`}
                id={`studyCircle-attendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="text"
                name={`studyCircle-title`}
                id={`studyCircle-title`}
                className="p-1 min-w-full"
              />
            </Box>
          </tr>
          <tr>
            <Box>درس قُرآن</Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`darseQuran-decided`}
                id={`darseQuran-decided`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`darseQuran-completed`}
                id={`darseQuran-completed`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="number"
                name={`darseQuran-attendance`}
                id={`darseQuran-attendance`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
              readOnly={view}
                type="text"
                name={`darseQuran-title`}
                id={`darseQuran-title`}
                className="p-1 min-w-full"
              />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
