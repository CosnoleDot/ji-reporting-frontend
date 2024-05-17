import { Box } from "./IfradiKuwat";

export const Activity = ({ view }) => {
  return (
    <div className="relative w-full overflow-auto">
      <div className="flex w-full justify-end items-end p-2">
        <label htmlFor="ijtRafaqa-registered">کاروائ رجسٹر</label>
        {view ? (
          <input
            disabled
            type="checkbox"
            name="ijtRafaqa-registered"
            id="ijtRafaqa-registered"
            className="checkbox ms-2"
          />
        ) : (
          <input
            type="checkbox"
            name="ijtRafaqa-registered"
            id="ijtRafaqa-registered"
            className="checkbox ms-2"
          />
        )}
      </div>
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
            <Box>اجتماع رفقا</Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`ijtRafaqa-decided`}
                id={`ijtRafaqa-decided`}
                value={1}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`ijtRafaqa-completed`}
                id={`ijtRafaqa-completed`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
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
                required
              />
            </Box>
          </tr>
          <tr>
            <Box>اجتماع کارکنان</Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`ijtKarkunan-decided`}
                id={`ijtKarkunan-decided`}
                value={1}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`ijtKarkunan-completed`}
                id={`ijtKarkunan-completed`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
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
                required
              />
            </Box>
          </tr>
          <tr>
            <Box>سٹڈی سرکل</Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`studyCircle-decided`}
                id={`studyCircle-decided`}
                value={1}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`studyCircle-completed`}
                id={`studyCircle-completed`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
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
                required
              />
            </Box>
          </tr>
          <tr>
            <Box>درس قُرآن</Box>
            <Box>
              <input
                readOnly={true}
                type="number"
                defaultValue={0}
                required
                name={`darseQuran-decided`}
                id={`darseQuran-decided`}
                value={1}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
                name={`darseQuran-completed`}
                id={`darseQuran-completed`}
                className="p-1 text-center min-w-full"
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type="number"
                defaultValue={0}
                required
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
                required
              />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
