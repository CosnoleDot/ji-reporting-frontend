export const Library = () => {
  return (
    <div className='p-2 py-5 relative w-full overflow-auto'>
      <h2 className='text-black py-3 text-lg'>لائبریری</h2>
      <div className='flex flex-wrap w-full items-center justify-start'>
        <div className='flex py-2'>
          <label className='block'> کل تعداد لائبریریز:</label>
          <input
            readOnly={true}
            type='number'
            name='totalLibraries'
            id='totalLibraries'
            className='border-b-2 text-center border-dashed'
          />
        </div>
        <div className='flex py-2'>
          <label className='block'>کل تعدادکتب:</label>
          <input
            readOnly={true}
            type='number'
            name='totalBooks'
            id='totalBooks'
            className='border-b-2 text-center border-dashed'
          />
        </div>
        <div className='flex py-2'>
          <label className='block'>اضافہ کتب:</label>
          <input
            readOnly={true}
            type='number'
            name='totalIncrease'
            id='totalIncrease'
            className='border-b-2 text-center border-dashed'
          />
        </div>
        <div className='flex py-2'>
          <label className='block'>کمی کتب :</label>
          <input
            readOnly={true}
            type='number'
            name='totalDecrease'
            id='totalDecrease'
            className='border-b-2 text-center border-dashed'
          />
        </div>
        <div className='flex py-2'>
          <label className='block'>کل اجرائے کتب:</label>
          <input
            readOnly={true}
            type='number'
            name='totalBookRent'
            id='totalBookRent'
            className='border-b-2 text-center border-dashed'
          />
        </div>
        {/* <div className="flex py-2">
            <label className="block">مرتب:</label>
            <input readOnly={ true }
              type="checkbox"
              name="registeredTosee"
              id="registeredTosee"
              className="checkbox ms-2"
            />
          </div> */}
      </div>
    </div>
  );
};
