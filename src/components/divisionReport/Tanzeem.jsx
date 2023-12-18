import { Box } from "../halqa";

export const Tanzeem = ({ view }) => {
  const calcultate = (v) => {
    // (start + increase)- decrease
    const s = document.getElementById(`${v}-start`);
    const i = document.getElementById(`${v}-increase`);
    const d = document.getElementById(`${v}-decrease`);
    document.getElementById(`${v}-end`).value =
      parseInt(s.value) + parseInt(i.value) - parseInt(d.value);
    return parseInt(s.value) + parseInt(i.value) - parseInt(d.value);
  };

  return (
    <div className='relative w-full overflow-auto'>
      <table className='w-full table'>
        <thead>
          <tr>
            <Box type={'heading'}>تنظیم</Box>
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
                readOnly={view}
                type='number'
                name={`rehaishHalqay-start`}
                id={`rehaishHalqay-start`}
                onChange={() => calcultate('rehaishHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`rehaishHalqay-increase`}
                id={`rehaishHalqay-increase`}
                onChange={() => calcultate('rehaishHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`rehaishHalqay-decrease`}
                id={`rehaishHalqay-decrease`}
                onChange={() => calcultate('rehaishHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type='number'
                name={`rehaishHalqay-end`}
                id={`rehaishHalqay-end`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`rehaishHalqay-continue`}
                id={`rehaishHalqay-continue`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`rehaishHalqay-paused`}
                id={`rehaishHalqay-paused`}
                className='p-1 text-center min-w-full'
              />
            </Box>
          </tr>
          <tr>
            <Box>تعلیمی حلقے</Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`taleemHalqay-start`}
                id={`taleemHalqay-start`}
                onChange={() => calcultate('taleemHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`taleemHalqay-increase`}
                id={`taleemHalqay-increase`}
                onChange={() => calcultate('taleemHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`taleemHalqay-decrease`}
                id={`taleemHalqay-decrease`}
                onChange={() => calcultate('taleemHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type='number'
                name={`taleemHalqay-end`}
                id={`taleemHalqay-end`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`taleemHalqay-continue`}
                id={`taleemHalqay-continue`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`taleemHalqay-paused`}
                id={`taleemHalqay-paused`}
                className='p-1 text-center min-w-full'
              />
            </Box>
          </tr>
          <tr>
            <Box>کل حلقے</Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`totalHalqay-start`}
                id={`totalHalqay-start`}
                onChange={() => calcultate('totalHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`totalHalqay-increase`}
                id={`totalHalqay-increase`}
                onChange={() => calcultate('totalHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`totalHalqay-decrease`}
                id={`totalHalqay-decrease`}
                onChange={() => calcultate('totalHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type='number'
                name={`totalHalqay-end`}
                id={`totalHalqay-end`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`totalHalqay-continue`}
                id={`totalHalqay-continue`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`totalHalqay-paused`}
                id={`totalHalqay-paused`}
                className='p-1 text-center min-w-full'
              />
            </Box>
          </tr>
          <tr>
            <Box>رہاشی زیلی حلقے</Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subRehaishHalqay-start`}
                id={`subRehaishHalqay-start`}
                onChange={() => calcultate('subRehaishHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subRehaishHalqay-increase`}
                id={`subRehaishHalqay-increase`}
                onChange={() => calcultate('subRehaishHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subRehaishHalqay-decrease`}
                id={`subRehaishHalqay-decrease`}
                onChange={() => calcultate('subRehaishHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type='number'
                name={`subRehaishHalqay-end`}
                id={`subRehaishHalqay-end`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subRehaishHalqay-continue`}
                id={`subRehaishHalqay-continue`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subRehaishHalqay-paused`}
                id={`subRehaishHalqay-paused`}
                className='p-1 text-center min-w-full'
              />
            </Box>
          </tr>
          <tr>
            <Box>تعلیمی ذیلی حلقے</Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subTaleemHalqay-start`}
                id={`subTaleemHalqay-start`}
                onChange={() => calcultate('subTaleemHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subTaleemHalqay-increase`}
                id={`subTaleemHalqay-increase`}
                onChange={() => calcultate('subTaleemHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subTaleemHalqay-decrease`}
                id={`subTaleemHalqay-decrease`}
                onChange={() => calcultate('subTaleemHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type='number'
                name={`subTaleemHalqay-end`}
                id={`subTaleemHalqay-end`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subTaleemHalqay-continue`}
                id={`subTaleemHalqay-continue`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subTaleemHalqay-paused`}
                id={`subTaleemHalqay-paused`}
                className='p-1 text-center min-w-full'
              />
            </Box>
          </tr>
          <tr>
            <Box>کل ذیلی حلقے</Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subTotalHalqay-start`}
                id={`subTotalHalqay-start`}
                onChange={() => calcultate('subTotalHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subTotalHalqay-increase`}
                id={`subTotalHalqay-increase`}
                onChange={() => calcultate('subTotalHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subTotalHalqay-decrease`}
                id={`subTotalHalqay-decrease`}
                onChange={() => calcultate('subTotalHalqay')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type='number'
                name={`subTotalHalqay-end`}
                id={`subTotalHalqay-end`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subTotalHalqay-continue`}
                id={`subTotalHalqay-continue`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`subTotalHalqay-paused`}
                id={`subTotalHalqay-paused`}
                className='p-1 text-center min-w-full'
              />
            </Box>
          </tr>
          <tr>
            <Box>بزم کے سکول یونٹس</Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmSchoolUnits-start`}
                id={`busmSchoolUnits-start`}
                onChange={() => calcultate('busmSchoolUnits')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmSchoolUnits-increase`}
                id={`busmSchoolUnits-increase`}
                onChange={() => calcultate('busmSchoolUnits')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmSchoolUnits-decrease`}
                id={`busmSchoolUnits-decrease`}
                onChange={() => calcultate('busmSchoolUnits')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type='number'
                name={`busmSchoolUnits-end`}
                id={`busmSchoolUnits-end`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmSchoolUnits-continue`}
                id={`busmSchoolUnits-continue`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmSchoolUnits-paused`}
                id={`busmSchoolUnits-paused`}
                className='p-1 text-center min-w-full'
              />
            </Box>
          </tr>
          <tr>
            <Box>بزم کےرہاشی یونٹس</Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmRehaishUnits-start`}
                id={`busmRehaishUnits-start`}
                onChange={() => calcultate('busmRehaishUnits')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmRehaishUnits-increase`}
                id={`busmRehaishUnits-increase`}
                onChange={() => calcultate('busmRehaishUnits')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmRehaishUnits-decrease`}
                id={`busmRehaishUnits-decrease`}
                onChange={() => calcultate('busmRehaishUnits')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type='number'
                name={`busmRehaishUnits-end`}
                id={`busmRehaishUnits-end`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmRehaishUnits-continue`}
                id={`busmRehaishUnits-continue`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmRehaishUnits-paused`}
                id={`busmRehaishUnits-paused`}
                className='p-1 text-center min-w-full'
              />
            </Box>
          </tr>
          <tr>
            <Box>بزم کے کل یونٹس</Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmTotalUnits-start`}
                id={`busmTotalUnits-start`}
                onChange={() => calcultate('busmTotalUnits')}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmTotalUnits-increase`}
                onChange={() => calcultate('busmTotalUnits')}
                id={`busmTotalUnits-increase`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmTotalUnits-decrease`}
                onChange={() => calcultate('busmTotalUnits')}
                id={`busmTotalUnits-decrease`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={true}
                type='number'
                name={`busmTotalUnits-end`}
                id={`busmTotalUnits-end`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmTotalUnits-continue`}
                id={`busmTotalUnits-continue`}
                className='p-1 text-center min-w-full'
              />
            </Box>
            <Box>
              <input
                readOnly={view}
                type='number'
                name={`busmTotalUnits-paused`}
                id={`busmTotalUnits-paused`}
                className='p-1 text-center min-w-full'
              />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
