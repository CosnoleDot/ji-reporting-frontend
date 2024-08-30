export const LoadingScreen = ({ value, count }) => {
  return (
    <>
      {value && (
        <div className='reports w-full h-full gap-3 z-20 fixed top-0 left-0 bg-white flex flex-col items-center justify-center'>
          <img className='w-24' src='/logo.png' alt='LOGO IJT' />
          <span className='font-bold'>اسلامی جمعیت طلبہ</span>
          <progress
            className='progress progress-info w-56 co text-primary'
            value={count || 0}
            max='100'
          ></progress>
          <span className='uppercase text-sm'>
            ({parseInt(count)}%) {value}
          </span>
          <div className='w-full flex justify-center items-start gap-3'>
            <span className='text-slate-800'>Powered By:</span>
            <span className='flex items-center justify-start gap-1'>
              <img src='/cd.png' alt='CD LOGO' className='w-5 h-5' /> ConsoleDot
            </span>
          </div>
        </div>
      )}
    </>
  );
};
