export const OtherActivities = ({view}) => {
  return (
    <div className='p-2 py-5 relative w-full overflow-auto'>
      <h2 className='text-black py-3 text-lg'>دیگر سرگرمیاں</h2>
      <div className='flex flex-wrap w-full items-center justify-start'>
        <div className='flex py-2'>
          <label className='block'>دعوتی وفود:</label>
          <input readOnly={view} type='number'  name="dawatiWafud" id="dawatiWafud" className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>روابط پارٹیز:</label>
          <input readOnly={view} type='number' name="rawabitParties" id="rawabitParties" className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>حدیث سرکل:</label>
          <input readOnly={view} type='number' name="hadithCircle" id="hadithCircle" className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>نظام الصلوٰۃ:</label>
          <input readOnly={view} type='number' name="nizamSalah" id="nizamSalah" className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>شب بیداری:</label>
          <input readOnly={view} type='number' name="shabBedari" id="shabBedari" className='border-b-2 text-center border-dashed' />
        </div>
        <div className='flex py-2'>
          <label className='block'>کوئ اور سرگرمی:</label>
          <input readOnly={view} type='text' name="anyOther" id="anyOther" className='border-b-2 border-dashed' />
        </div>
      </div>
    </div>
  );
};
