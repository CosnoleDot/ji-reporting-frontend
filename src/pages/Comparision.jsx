import { useState } from 'react';
import { GeneralLayout, Loader } from '../components';
import { useToastState } from '../context';
import instance from '../api/instrance';
import { useEffect } from 'react';
import { ReportChart } from '../components/ReportChart';
import { FaTimes, FaChevronCircleRight, FaTimesCircle } from 'react-icons/fa';
import { months } from './Reports';

const Dates = ({
  durationMonths,
  setDurationMonths,
  showDates,
  durationType,
  durationYears,
  setDurationYears,
}) => {
  const [year, setYear] = useState(2023);
  return (
    <div className='fixed top-0 left-0 z-1 w-full h-screen bg-white'>
      <div className='flex z-50 w-full p-3 items-center border-b justify-between'>
        <h1 className='text-xl font-bold'>Dates</h1>
        <button className='btn' onClick={() => showDates(false)}>
          <FaTimes />
        </button>
      </div>
      {durationType === 'month' && (
        <div className='flex items-start justify-start w-full h-[calc(100vh-72.8px-64px)]'>
          <div className='w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll'>
            <input
              type='number'
              id='yearInput'
              name='yearInput'
              placeholder='YYYY'
              min='1900'
              max='2100'
              step='1'
              className='input-bordered input w-full'
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            {months.map((i, index) => (
              <div
                key={index}
                className='flex p-3 hover:bg-slate-200 items-center justify-between'
                onClick={() =>
                  setDurationMonths([
                    ...durationMonths,
                    { title: i?.title, year },
                  ])
                }
              >
                <span>
                  {i?.title}, {year}
                </span>
                <FaChevronCircleRight />
              </div>
            ))}
          </div>
          <div className='w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll'>
            {durationMonths.map((i, index) => (
              <div
                key={index}
                onClick={() =>
                  setDurationMonths([
                    ...durationMonths.slice(0, index),
                    ...durationMonths.slice(index + 1, durationMonths.length),
                  ])
                }
                className='flex p-3 hover:bg-slate-200 items-center justify-between'
              >
                <span>
                  {i?.title}, {i?.year}
                </span>
                <FaTimesCircle />
              </div>
            ))}
          </div>
        </div>
      )}
      {durationType === 'year' && (
        <div className='flex items-start justify-start w-full h-[calc(100vh-72.8px-64px)]'>
          <div className='w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll'>
            {Array(10)
              .fill(1)
              .map((_, index) => (
                <div
                  key={index}
                  className='flex p-3 hover:bg-slate-200 items-center justify-between'
                  onClick={() =>
                    setDurationYears([...durationYears, 2023 + index])
                  }
                >
                  <span>{2023 + index}</span>
                  <FaChevronCircleRight />
                </div>
              ))}
          </div>
          <div className='w-full h-[calc(100vh-72.8px-64px)] overflow-hidden overflow-y-scroll'>
            {durationYears.map((i, index) => (
              <div
                key={index}
                onClick={() =>
                  setDurationYears([
                    ...durationYears.slice(0, index),
                    ...durationYears.slice(index + 1, durationYears.length),
                  ])
                }
                className='flex p-3 hover:bg-slate-200 items-center justify-between'
              >
                <span>{i}</span>
                <FaTimesCircle />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Comparision = () => {
  const [loading, setLoading] = useState(true);
  const [durationMonths, setDurationMonths] = useState([]);
  const [durationType, setDurationType] = useState('');
  const [reportType, setReportType] = useState('');
  const [dates, showDates] = useState(false);
  const [durationYears, setDurationYears] = useState([]);
  const [areas, setAreas] = useState({
    maqam: [],
    division: [],
    halqa: [],
  });
  const { dispatch } = useToastState();
  const getHalqas = async () => {
    setLoading(true);
    try {
      const req = await instance('/locations/halqa', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setAreas((prev) => ({ ...prev, halqa: [...req.data?.data] }));
      }
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
  };
  const getMaqams = async () => {
    setLoading(true);
    try {
      const req = await instance('/locations/maqam', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setAreas((prev) => ({ ...prev, maqam: [...req.data?.data] }));
      }
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
  };
  const getDivisions = async () => {
    setLoading(true);
    try {
      const req = await instance('/locations/division', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setAreas((prev) => ({ ...prev, division: [...req.data?.data] }));
      }
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
  };
  const getAll = async () => {
    if (localStorage.getItem('@type') === 'province') {
      await getDivisions();
      await getMaqams();
    }
    await getHalqas();
  };
  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(areas);
  }, [areas]);
  return (
    <GeneralLayout title={'Comparison'} active={'comparison'}>
      <div className='relative flex flex-col gap-3 h-[calc(100vh-66px-64px)] w-full p-3'>
        <div className='flex items-center justify-center gap-3 border-b border-t py-3 overflow-hidden overflow-x-scroll'>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className='select select-bordered'
          >
            <option value='' disabled>
              Report Type
            </option>
            <option value='halqa'>Halqa</option>
            {localStorage.getItem('@type') === 'province' && (
              <>
                <option value='maqam'>Maqam</option>
                <option value='division'>Division</option>
              </>
            )}
          </select>
          <select defaultValue={''} className='select select-bordered'>
            <option value='' disabled>
              Area
            </option>
            {areas[reportType]?.map((i, index) => (
              <option key={index} value={i?._id}>
                {i?.name}
              </option>
            ))}
          </select>
          <select defaultValue={''} className='select select-bordered'>
            <option value='' disabled>
              Property
            </option>
            <option value={'activity'}>Activity</option>
            <option value={'ifradi-kuwat'}>Ifradi Kuwat</option>
            <option value={'library'}>Library</option>
            <option value={'other-activity'}>Other Activity</option>
            {['maqam', 'division'].includes(reportType) && (
              <option value={'tanzeem'}>Tanzeem</option>
            )}
          </select>
          <select
            value={durationType}
            onChange={(e) => setDurationType(e.target.value)}
            className='select select-bordered'
          >
            <option value='' disabled>
              Duration Type
            </option>
            <option value='month'>Month</option>
            <option value='year'>Year</option>
          </select>
          <button
            onClick={() => {
              if (durationType !== '') showDates(true);
            }}
            className='btn'
          >
            Dates
          </button>
          <button className='btn'>Generate</button>
        </div>
        <div className='relative flex flex-col gap-3 h-[calc(100vh-66px-64px-73.6px)] w-full p-3 overflow-scroll'>
          <ReportChart
            res={{
              labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
              datasets: [
                {
                  label: 'Yearly Progress',
                  data: [0, 50, 120, 100, 200, 300],
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            type={'Test'}
          />
        </div>
      </div>
      {dates && durationType !== '' && (
        <Dates
          durationMonths={durationMonths}
          setDurationMonths={setDurationMonths}
          durationType={durationType}
          showDates={showDates}
          durationYears={durationYears}
          setDurationYears={setDurationYears}
        />
      )}
      {loading && <Loader />}
    </GeneralLayout>
  );
};
