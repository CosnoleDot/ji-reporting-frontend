export const PaighamDigest = ({ view }) => {
  return (
    <div className='p-2 py-5 relative w-full overflow-auto'>
      <h2 className='text-black py-3 text-lg'>پیغام ڈائجسٹ</h2>
      <div className='flex flex-wrap w-full items-center justify-start'>
        <div className='flex py-2 ml-4'>
          <label className='block'>کل موصولہ:</label>
          <div className="flex">
          <input
            type='number'
            placeholder="حلقہ جات"
            required
            className='border-b-2 text-center border-dashed'
            id="asd"
          />
          +
          <input
            id="asd2"
            type='number'
            placeholder="ذیلی حلقہ جات"
            required
            className='border-b-2 text-center border-dashed'
          />
          =
          <input
            readOnly={true}
            type='number'
            
            defaultValue={parseInt(document.getElementById('asd')?.value) + parseInt(document.getElementById('asd2')?.value )}
            required
            name='totalReceived'
            id='totalReceived'
            className='border-b-2 text-center border-dashed'
          />
          </div>
        </div>
        <div className='flex py-2 ml-4'>
          <label className='block p-1'> فروخت کردہ:</label>
          <div className="flex">
          <input
            type='number'
            placeholder="حلقہ جات"
            required
            className='border-b-2 p-1 text-center border-dashed'
            id="asf"
          />
          +
          <input
            id="asf2"
            type='number'
            placeholder="ذیلی حلقہ جات"
            required
            className='border-b-2 text-center border-dashed'
          />
          =
          <input
            readOnly={true}
            type='number'
            defaultValue={parseInt(document.getElementById('asf')?.value) + parseInt(document.getElementById('asf2')?.value) }
            required
            name='totalSold'
            id='totalSold'
            className='border-b-2 text-center border-dashed'
          />
           </div>
        </div>
      </div>
    </div>
  );
};
