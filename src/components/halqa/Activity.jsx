import { Box } from './IfradiKuwat';

export const Activity = () => {
  return (
    <div className='relative w-full overflow-auto'>
      <table className='w-full table'>
        <thead>
          <tr>
            <Box type={'heading'}>طے شدہ سرگرمیاں</Box>
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
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='text' className='p-1 min-w-full' />
            </Box>
          </tr>
          <tr>
            <Box>اجتمع کارکنان</Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='text' className='p-1 min-w-full' />
            </Box>
          </tr>
          <tr>
            <Box>سٹڈی سرکل</Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='text' className='p-1 min-w-full' />
            </Box>
          </tr>
          <tr>
            <Box>درس قُرآن</Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='text' className='p-1 min-w-full' />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
