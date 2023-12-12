export const Box = ({ children, type }) => {
  return (
    <td
      className={`border text-center p-2 ${
        type === 'heading' ? 'text-lg text-black' : ''
      }`}
    >
      {children}
    </td>
  );
};
export const IfradiKuwat = () => {
  return (
    <div className='relative w-full overflow-auto'>
      <table className='w-full table'>
        <thead>
          <tr>
            <Box type={'heading'}>افرادی قوت</Box>
            <Box>آغاز میں</Box>
            <Box>اضافہ</Box>
            <Box>کمی</Box>
            <Box>اختاتام</Box>
            <Box>سالانہ ہدف</Box>
            <Box>مرتب</Box>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Box>ارکان</Box>
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
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>-</Box>
          </tr>
          <tr>
            <Box>امیدواران</Box>
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
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='checkbox' className='p-1 text-center min-w-full checkbox' />
            </Box>
          </tr>
          <tr>
            <Box>رفقا</Box>
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
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='checkbox' className='p-1 text-center min-w-full checkbox' />
            </Box>
          </tr>
          <tr>
            <Box>کارکنان</Box>
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
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='number' className='p-1 text-center min-w-full' />
            </Box>
            <Box>
              <input type='checkbox' className='p-1 text-center min-w-full checkbox' />
            </Box>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
