export const Loader = () => {
  return (
    <div
      style={{ background: 'rgba(0,0,0,0.6)' }}
      className='w-full h-screen z-50 fixed top-0 left-0 flex items-center justify-center'
    >
      <span className='loading loading-ring loading-lg text-primary'></span>
    </div>
  );
};
