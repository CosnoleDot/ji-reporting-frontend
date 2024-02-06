export const PaighamDigest = ({ view }) => {
  return (
    <div className='p-2 py-5 relative w-full overflow-auto'>
      <h2 className='text-black py-3 text-lg'>پیغام ڈائجسٹ</h2>
      <div className='flex flex-wrap w-full items-center justify-start'>
        <div className='flex py-2 ml-4'>
          <label className='block'>کل موصولہ:</label>
          <input
            readOnly={view}
            type='number'
            defaultValue={0}
            required
            name='totalReceived'
            id='totalReceived'
            className='border-b-2 text-center border-dashed'
          />
        </div>
        <div className='flex py-2 ml-4'>
          <label className='block'> فروخت کردہ:</label>
          <input
            readOnly={view}
            type='number'
            defaultValue={0}
            required
            name='totalSold'
            id='totalSold'
            className='border-b-2 text-center border-dashed'
          />
        </div>
      </div>
    </div>
  );
};
