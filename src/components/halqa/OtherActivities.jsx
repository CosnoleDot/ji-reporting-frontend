export const OtherActivities = () => {
  return (
    <div className='p-2 py-5 relative w-full overflow-auto'>
      <h2 className='text-black py-3 text-lg'>دیگر سرگرمیاں</h2>
      <div className='flex flex-wrap w-full items-center justify-start'>
        <div className='flex py-2'>
          <label className='block'>دعوتی وفود:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>روابط پارٹیز:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>حدیث سرکل:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>نظام الصلٰتہ:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>شب بیداری:</label>
          <input type='number' className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>کوئ اور سرگرمی:</label>
          <input type='text' className='border-b-2 border-dashed' />
        </div>
      </div>
    </div>
  );
};