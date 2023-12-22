import { useEffect } from 'react';

export function GeneralInfo({ setMonth, me, area, view }) {
  useEffect(() => {
    if (me && !view) {
      if (document.getElementById('name')) {
        document.getElementById('name').value = me?.userAreaId?.name;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);
  return (
    <div className='grid w-full grid-cols-1 lg:grid-cols-2'>
      <div className='flex justify-start items-center gap-2 w-full p-2'>
        <label htmlFor='halqa_name'>{`${area} کا نام`}</label>
        <input
          className='border-b-2 border-dashed'
          type='text'
          name='name'
          id='name'
          readOnly
        />
      </div>
      <div className='flex justify-start items-center gap-2 w-full p-2'>
        <label htmlFor='month'>برائے ماہ</label>
        <input
          className='border-b-2 border-dashed'
          type='month'
          name='month'
          id='month'
          defaultValue='2023-12'
          onChange={(e) => (setMonth ? setMonth(e.target.value) : null)}
          disabled={view}
        />
      </div>
    </div>
  );
}
