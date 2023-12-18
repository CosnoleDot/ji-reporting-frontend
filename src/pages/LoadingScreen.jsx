export const LoadingScreen = ({ value, count }) => {
  return (
    <>
      {value && (
        <div className='reports w-full h-full gap-3 fixed top-0 left-0 bg-white flex flex-col items-center justify-center'>
          <img className='w-24' src='/logo.png' alt='LOGO IJT' />
          <span className='font-bold'>اسلامی جمعیت طلبہ</span>
          <progress
            className='progress progress-info w-56'
            value={count || 0}
            max='100'
          ></progress>
          <span className='uppercase text-sm'>
            ({parseInt(count)}%) {value}
          </span>
        </div>
      )}
    </>
  );
};
