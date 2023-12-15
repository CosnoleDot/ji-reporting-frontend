import { useContext } from 'react';
import {
  Activity,
  GeneralInfo,
  GeneralLayout,
  IfradiKuwat,
  Library,
  OtherActivities,
  RozOShabDiary,
  ToseeDawat,
} from '../components';
import { MeContext } from '../context';

export const Halqa = () => {
  const me = useContext(MeContext);
  return (
    <GeneralLayout>
      <div className='reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll'>
        <h2 className='block w-full text-center p-3'>
          کارکردگی رپورٹ براۓ حلقہ
        </h2>
        <form
          className='flex flex-col items-center justify-start gap-5 p-3 w-full overflow-auto'
          onSubmit={(e) => e.preventDefault()}
          dir='rtl'
        >
          <GeneralInfo me={me} />
          <IfradiKuwat />
          <Activity />
          <OtherActivities />
          <ToseeDawat />
          <Library />
          <RozOShabDiary />
          <div className='w-full flex p-2'>
            <label htmlFor='comment'>تبصرھ</label>
            <input
              type='text'
              name='comment'
              className='border-b-2 border-dashed w-full'
              id='comment'
            />
          </div>
          <div className='w-full flex flex-col items-end gap-3 p-2'>
            <div>
              <label htmlFor='nazim'>نام ناظمِ:</label>
              <input
                type='text'
                className='border-b-2 border-dashed text-center'
                id='nazim'
                defaultValue={me?.name || ''}
                readOnly
              />
            </div>
          </div>
        </form>
      </div>
    </GeneralLayout>
  );
};
