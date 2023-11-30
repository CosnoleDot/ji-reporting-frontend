import { useState } from 'react';
import { GeneralLayout } from '../components';
import instance from '../api/instrance';
import { useEffect } from 'react';

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
    <GeneralLayout active={'dashboard'}>
      <div className='relative flex lg:flex-row flex-col gap-3 items-center p-5 justify-center h-[calc(100vh-65.6px-64px)]'>
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
        {localStorage.getItem('@type') !== 'province' && (
          <div className='p-5 w-full bg-slate-200 rounded-xl'>
            <h1 className='font-bold text-lg'>Next Report:</h1>
            <h2 className='underline text-2xl'>December 01, 2023</h2>
          </div>
        )}
      </div>
    </GeneralLayout>
  );
};
