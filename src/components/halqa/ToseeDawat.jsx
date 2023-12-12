export const ToseeDawat = () => {
  return (
    <div className='p-2 py-5 relative w-full overflow-auto'>
      <h2 className='text-black py-3 text-lg'>توسیع دعوت</h2>
      <div className='flex flex-wrap w-full items-center justify-start'>
        <div className='flex py-2'>
          <label className='block'>روابط:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>موجود:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>ملاقاتیں:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>تقسیم لٹریچر:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>مرتب:</label>
          <input type='checkbox' className='checkbox ms-2' />
        </div>
      </div>
      <div className='flex flex-wrap w-full items-center justify-start'>
        <div className='flex py-2 me-5'>
          <label className='block'>عام طلبء:</label>
        </div>
        <div className='flex py-2'>
          <label className='block'>ملاقاتیں:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>تقسیم لٹریچر:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
      </div>
    </div>
  );
};
