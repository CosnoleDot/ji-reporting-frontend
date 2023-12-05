import { useState } from 'react';
import { GeneralLayout } from '../components';
import instance from '../api/instrance';
import { useEffect } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { CiLocationOn } from 'react-icons/ci';
import { FaLocationArrow } from 'react-icons/fa';

export const Dashboard = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const getAllReports = async () => {
    setLoading(true);
    if (localStorage.getItem('@token')) {
      if (localStorage.getItem('@type') !== 'province') {
        const req = await instance.get(
          `/reports/${localStorage.getItem('@type')}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('@token')}`,
            },
          }
        );
        setCount(req.data.data.length);
      } else {
        const halqa = await instance.get(`/reports/halqa`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        const maqam = await instance.get(`/reports/maqam`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        const division = await instance.get(`/reports/division`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        setCount(
          halqa.data.data.length +
            maqam.data.data.length +
            division.data.data.length
        );
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllReports();
  }, []);
  return (
    <GeneralLayout title={'Dashboard'} active={'dashboard'}>
      <div className='relative flex w-full gap-3 items-center p-5 justify-center h-[calc(100vh-65.6px-64px)] overflow-hidden overflow-y-scroll bg-blue-50'>
        {/* <div className='grid grid-cols-2 w-full gap-3'>
          <div className='p-5 w-full bg-slate-200 rounded-xl'>
            <h1 className='font-bold text-lg'>Total Reports</h1>
            <h2 className='underline text-2xl'>
              {loading ? (
                <span className='loading loading-ring loading-md text-blue-400'></span>
              ) : (
                `${count} Report(s)`
              )}
            </h2>
          </div>
          <div className='p-5 w-full bg-slate-200 rounded-xl'>
            <h1 className='font-bold text-lg'>Next Report:</h1>
            <h2 className='underline text-2xl'>
              {moment('January 01, 2024')
                .fromNow()
                .toString()
                .split('')
                .map((_, index) => (index === 0 ? _.toUpperCase() : _))
                .join('')}
            </h2>
          </div>
          <div className='p-5 w-full bg-slate-200 rounded-xl'>
            <h1 className='font-bold text-lg'>Total Divisions:</h1>
            <h2 className='underline text-2xl'>2 Division(s)</h2>
          </div>
          <div className='p-5 w-full bg-slate-200 rounded-xl'>
            <h1 className='font-bold text-lg'>Total Maqams:</h1>
            <h2 className='underline text-2xl'>2 Maqam(s)</h2>
          </div>
          <div className='p-5 w-full bg-slate-200 rounded-xl'>
            <h1 className='font-bold text-lg'>Total Units:</h1>
            <h2 className='underline text-2xl'>2 Unit(s)</h2>
          </div>
          <div className='p-5 w-full bg-slate-200 rounded-xl'>
            <h1 className='font-bold text-lg'>Total Nazims:</h1>
            <h2 className='underline text-2xl'>2 Nazim(s)</h2>
          </div>
        </div> */}
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
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                ></path>
              </svg>
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Nazims</h3>
              <p className='text-3xl'>12,768</p>
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
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
                ></path>
              </svg>
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Reports</h3>
              <p className='text-3xl'>
                {loading ? (
                  <span className='loading loading-bars loading-md'></span>
                ) : (
                  `${count} Report(s)`
                )}
              </p>
            </div>
          </div>
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-indigo-400'>
              <CiLocationOn className='w-12 h-12 text-white' />
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Maqams</h3>
              <p className='text-3xl'>142,334</p>
            </div>
          </div>
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-red-400'>
              <FaLocationDot className='h-12 w-12 text-white' />
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Division</h3>
              <p className='text-3xl'>34.12%</p>
            </div>
          </div>
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
            <div className='p-4 bg-red-400'>
              <FaLocationArrow className='w-12 h-12 text-white' />
            </div>
            <div className='px-4 text-gray-700'>
              <h3 className='text-sm tracking-wider'>Total Units</h3>
              <p className='text-3xl'>34.12%</p>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};
