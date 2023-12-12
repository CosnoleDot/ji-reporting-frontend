export function GeneralInfo({ me }) {
  return (
    <div className='grid w-full grid-cols-1 lg:grid-cols-2'>
      <div className='grid grid-cols-2 w-full p-2'>
        <label htmlFor='halqa_name'>حلقہ کا نام</label>
        <input
          className='border-b-2 border-dashed'
          type='text'
          name='halqa_name'
          id='halqa_name'
          defaultValue={me?.userAreaId?.name || ""}
          readOnly
        />
      </div>
      <div className='grid grid-cols-2 w-full p-2'>
        <label htmlFor='month'>براے ماھ</label>
        <input
          className='border-b-2 border-dashed'
          type='month'
          name='month'
          id='month'
        />
      </div>
    </div>
  );
}
