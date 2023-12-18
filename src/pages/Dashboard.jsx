import { useContext, useState } from 'react';
import { GeneralLayout } from '../components';
import { useEffect } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { CiLocationOn } from 'react-icons/ci';
import { FaLocationArrow } from 'react-icons/fa';
import {
  DivisionContext,
  DivisionReportContext,
  HalqaContext,
  HalqaReportContext,
  MaqamContext,
  MaqamReportContext,
  ProvinceReportContext,
} from '../context';
import { UIContext } from '../context/ui';

export const Dashboard = () => {
  const [count, setCount] = useState(0);
  const { nazim } = useContext(UIContext);
  const maqam = useContext(MaqamContext);
  const division = useContext(DivisionContext);
  const unit = useContext(HalqaContext);
  const maqamReports = useContext(MaqamReportContext);
  const divisionReports = useContext(DivisionReportContext);
  const halqaReports = useContext(HalqaReportContext);
  const provinceReports = useContext(ProvinceReportContext);

  useEffect(() => {
    try {
      setCount(
        maqamReports?.length +
          divisionReports?.length +
          halqaReports?.length +
          provinceReports?.length
      );
    } catch (err) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maqamReports, divisionReports, halqaReports]);

  return (
    <GeneralLayout title={'Dashboard'} active={'dashboard'}>
      <div className='relative flex w-full gap-3 items-center p-5 justify-center h-[calc(100vh-65.6px-64px)] overflow-hidden overflow-y-scroll bg-blue-50'>
        <div className='grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8 w-full'>
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-green-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                ></path>
              </svg>
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Nazims</h3>
              <p className='text-3xl'>{nazim.length}</p>
            </div>
          </div>
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-blue-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
                ></path>
              </svg>
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Reports</h3>
              <p className='text-3xl'>
                {/* {loading ? (
                  <span className='loading loading-bars loading-md'></span>
                ) : (
                  count
                )} */}
                {count}
              </p>
            </div>
          </div>
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-indigo-400'>
              <CiLocationOn className='w-12 h-12 text-white' />
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Maqams</h3>
              <p className='text-3xl'>{maqam?.length}</p>
            </div>
          </div>
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-red-400'>
              <FaLocationDot className='h-12 w-12 text-white' />
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Division</h3>
              <p className='text-3xl'>{division?.length}</p>
            </div>
          </div>
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-red-400'>
              <FaLocationArrow className='w-12 h-12 text-white' />
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Units</h3>
              <p className='text-3xl'>{unit?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};
