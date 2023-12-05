import { FaEdit, FaEye, FaPlus } from 'react-icons/fa';
import { GeneralLayout, Loader } from '../components';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useToastState } from '../context';
import instance from '../api/instrance';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { FaRegFileExcel } from 'react-icons/fa';

const NoReports = () => (
  <div className='card-body flex flex-col items-center justify-center w-full p-5 mb-1 rounded-xl'>
    <FaRegFileExcel className='text-gray-300 w-40 h-40' />
    <span className='text-gray-300 font-bold text-3xl'>No Reports Found!</span>
  </div>
);

export const months = [
  {
    title: 'January',
    value: 1,
  },
  {
    title: 'February',
    value: 2,
  },
  {
    title: 'March',
    value: 3,
  },
  {
    title: 'April',
    value: 4,
  },
  {
    title: 'May',
    value: 5,
  },
  {
    title: 'June',
    value: 6,
  },
  {
    title: 'July',
    value: 7,
  },
  {
    title: 'August',
    value: 8,
  },
  {
    title: 'September',
    value: 9,
  },
  {
    title: 'October',
    value: 10,
  },
  {
    title: 'November',
    value: 11,
  },
  {
    title: 'December',
    value: 12,
  },
];
export const Reports = () => {
  const [reports, setReports] = useState([]);
  const [allReports, setAllReports] = useState([]);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(localStorage.getItem('@type'));
  const [search, showSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('2023');
  const [filerData, setFilterData] = useState([]);
  const [me, setMe] = useState({});
  const { dispatch } = useToastState();
  const [tab, setTab] = useState('maqam');
  const [active, setActive] = useState('maqam');
  const [filterAllData, setFilterAllData] = useState({});
  const params = useLocation();
  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};

      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }
      if (queryParams?.active) setActive(queryParams?.active);
      if (queryParams?.tab) setTab(queryParams?.tab);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params]);
  const getMe = async () => {
    const req = await instance.get('/user/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
    });
    if (req) {
      setMe(req.data.data);
    }
    try {
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err?.response?.data?.message });
    }
  };
  useEffect(() => {
    if (localStorage.getItem('@token')) getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSearch = () => {
    showSearch(!search);
  };
  const handleReport = () => {
    navigate(`/reports/create`);
  };

  const viewReport = async (id) => {
    navigate(`view/${id}`);
  };
  const editReport = (id) => {
    navigate(`edit/${id}`);
  };
  const fetchReports = async () => {
    setLoading(true);
    try {
      let response;
      if (userType === 'province') {
        const m = await instance.get(`reports/maqam`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        const h = await instance.get(`reports/halqa`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        const d = await instance.get(`reports/division`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        setAllReports({
          maqam: m.data.data,
          halqa: h.data.data,
          division: d.data.data,
        });
        setFilterAllData({
          maqam: m.data.data,
          halqa: h.data.data,
          division: d.data.data,
        });
      } else {
        response = await instance.get(`reports/${userType}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        setReports(response?.data?.data);
        setFilterData(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
    setLoading(false);
  };
  const clearFilters = () => {
    setMonth('');
    setYear('2023');
    setFilterAllData(allReports);
    setFilterData(reports);
  };
  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const searchResults = () => {
    if (userType === 'province') {
      if (year !== '' && month !== '') {
        const filteredData = { ...allReports };
        filteredData[active] = allReports[active]?.filter((i) => {
          const [f_year, f_month] = [
            i?.month?.split('-')[0],
            i?.month?.split('-')[1],
          ];
          return (
            parseInt(year) === parseInt(f_year) &&
            parseInt(month) === parseInt(f_month)
          );
        });
        showSearch(false);
        setFilterAllData(filteredData);
      } else if (year !== '' && month === '') {
        const filteredData = { ...allReports };
        filteredData[active] = allReports[active]?.filter((i) => {
          const f_year = i?.month?.split('-')[0];
          return parseInt(year) === parseInt(f_year);
        });
        showSearch(false);
        setFilterAllData(filteredData);
      } else if (year === '' && month !== '') {
        dispatch({ type: 'ERROR', payload: 'Enter year with month' });
        setFilterAllData(allReports);
      } else if (year === '' && month === '') {
        dispatch({ type: 'ERROR', payload: 'Date is required' });
        setFilterAllData(allReports);
      } else {
        setFilterAllData(allReports);
      }
    } else {
      if (year !== '' && month !== '') {
        const filteredData = reports?.reduce((acc, curr) => {
          const reportYear = parseInt((curr?.month).split('-')[0]);
          const reportMonth = parseInt((curr?.month).split('-')[1]);
          if (
            reportMonth === parseInt(month) &&
            reportYear === parseInt(year)
          ) {
            acc.push(curr);
          }
          return acc;
        }, []);
        showSearch(false);
        setFilterData(filteredData);
      } else if (year !== '' && month === '') {
        const filteredData = reports?.filter((curr) => {
          const reportedYear = (curr?.month).split('-')[0];
          return parseInt(reportedYear) === parseInt(year);
        });
        showSearch(false);
        setFilterData(filteredData);
      } else if (year === '' && month !== '') {
        dispatch({ type: 'ERROR', payload: 'Enter year with month' });
        setFilterData(reports);
      } else if (year === '' && month === '') {
        dispatch({ type: 'ERROR', payload: 'Date is required' });
        setFilterData(reports);
      } else {
        setFilterData(reports);
      }
    }
  };

  useEffect(() => {
    if (window) {
      if (window.innerWidth < 520) {
        setIsMobileView(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);
  useEffect(() => {
    setUserType(localStorage.getItem('@type'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);
  return (
    <GeneralLayout
      title={me?.userAreaId?.name.toUpperCase()}
      active={'reports'}
    >
      <div className='relative flex flex-col gap-3 items-center p-5 justify-center h-[calc(100vh-65.6px-64px)]'>
        <div className='flex w-full items-center justify-between xs:flex-col'>
          <h3 className='font-bold text-xl hidden lg:block xl:block'>
            Reports
          </h3>
          <div className='join xs:w-full'>
            {!isMobileView && (
              <div className='w-full'>
                <select
                  className='select select-bordered join-item'
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                >
                  <option value={''}>Month</option>
                  {months.map((month, index) => (
                    <option value={month?.value} key={index}>
                      {month.title}
                    </option>
                  ))}
                </select>
                <select
                  className='select select-bordered join-item'
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                >
                  <option disabled value={''}>
                    Year
                  </option>
                  {Array(10)
                    .fill(1)
                    .map((_, index) => (
                      <option key={index} value={2023 + index}>
                        {2023 + index}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {search && (
              <div className='fixed p-3 z-40 rounded-lg top-[140px] left-[5px] w-[calc(100%-10px)] overflow-hidden bg-white min-h-[100px] border'>
                <div className='flex flex-col gap-3'>
                  <div className='w-full flex flex-col'>
                    <select
                      className='select select-bordered w-full rounded-none rounded-tl-lg rounded-tr-lg'
                      onChange={(e) => setMonth(e.target.value)}
                      value={month}
                    >
                      <option value={''}>Month</option>
                      {months.map((month, index) => (
                        <option value={month?.value} key={index}>
                          {month.title}
                        </option>
                      ))}
                    </select>
                    <select
                      className='select select-bordered w-full rounded-none rounded-bl-lg rounded-br-lg'
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value={''} disabled>
                        Year
                      </option>
                      {Array(10)
                        .fill(1)
                        .map((_, index) => (
                          <option key={index} value={2023 + index}>
                            {2023 + index}
                          </option>
                        ))}
                    </select>
                  </div>
                  <button className='btn' onClick={searchResults}>
                    Search
                  </button>
                </div>
              </div>
            )}

            <div className='indicator '>
              {/* <span className='indicator-item badge badge-secondary'>new</span> */}
              <button
                className={`btn ${!isMobileView ? 'join-item' : ''}`}
                onClick={() =>
                  !isMobileView ? searchResults() : toggleSearch()
                }
              >
                Search
              </button>
              <button
                className={`btn ${!isMobileView ? 'join-item' : 'ms-3'}`}
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
          {localStorage.getItem('@type') !== 'province' && (
            <button className='btn ' onClick={handleReport}>
              <FaPlus />
              <span className='hidden lg:block xl:block'>New Report</span>
            </button>
          )}
        </div>
        {localStorage.getItem('@type') === 'province' && (
          <div
            role='tablist'
            className='w-full flex justify-between items-center'
          >
            <Link
              to={'?active=division'}
              role='tab'
              className={`tab w-full ${
                active === 'division' ? 'tab-active' : ''
              }`}
            >
              Division
            </Link>

            <Link
              to={'?active=maqam'}
              role='tab'
              className={`tab w-full ${active === 'maqam' ? 'tab-active' : ''}`}
            >
              Maqam
            </Link>

            <Link
              to={'?active=halqa'}
              role='tab'
              className={`tab w-full ${active === 'halqa' ? 'tab-active' : ''}`}
            >
              Halqa
            </Link>
          </div>
        )}
        {active === 'halqa' && (
          <div
            role='tablist'
            className='w-full flex justify-between items-center'
          >
            <Link
              to={'?active=halqa&tab=maqam'}
              role='tab'
              className={`tab w-full ${tab === 'maqam' ? 'tab-active' : ''}`}
            >
              Maqam Halqa
            </Link>

            <Link
              to={'?active=halqa&tab=division'}
              role='tab'
              className={`tab w-full ${tab === 'division' ? 'tab-active' : ''}`}
            >
              Division Halqa
            </Link>
          </div>
        )}
        <div className='relative overflow-y-scroll gap-3 w-full items-center p-5 justify-center h-[calc(100vh-65.6px-64px-48px)]'>
          {userType === 'province' ? (
            filterAllData[active]?.length < 1 ? (
              <NoReports />
            ) : active === 'halqa' &&
              tab === 'division' &&
              filterAllData[active]?.filter(
                (obj) => obj?.halqaAreaId?.parentType === 'Tehsil'
              ).length < 1 ? (
              <NoReports />
            ) : active === 'halqa' &&
              tab === 'maqam' &&
              filterAllData[active]?.filter(
                (obj) => obj?.halqaAreaId?.parentType === 'Maqam'
              ).length < 1 ? (
              <NoReports />
            ) : (
              filterAllData[active]?.map((obj) =>
                active === 'halqa' && tab === 'division' ? (
                  obj?.halqaAreaId?.parentType === 'Tehsil' && (
                    <div
                      key={obj?._id}
                      className='card-body flex items-between justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col'
                    >
                      <div className='flex w-full flex-col items-start justify-center'>
                        <span className='text-lg font-semibold'>
                          {obj?.[active + 'AreaId']?.name || 'UNKNOWN'} -{' '}
                          {moment(obj?.month).format('MMMM YYYY')}
                        </span>
                        <span>
                          Last Modified:{' '}
                          {moment(obj?.updatedAt).startOf('day').fromNow()}
                        </span>
                      </div>
                      <div className='flex items-end w-full justify-end gap-3 '>
                        <button
                          className='btn'
                          onClick={() => viewReport(obj?._id)}
                        >
                          <FaEye />
                        </button>
                      </div>
                    </div>
                  )
                ) : active === 'halqa' && tab === 'maqam' ? (
                  obj?.halqaAreaId?.parentType === 'Maqam' && (
                    <div
                      key={obj?._id}
                      className='card-body flex items-between justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col'
                    >
                      <div className='flex w-full flex-col items-start justify-center'>
                        <span className='text-lg font-semibold'>
                          {obj?.[active + 'AreaId']?.name || 'UNKNOWN'} -{' '}
                          {moment(obj?.month).format('MMMM YYYY')}
                        </span>
                        <span>
                          Last Modified:{' '}
                          {moment(obj?.updatedAt).startOf('day').fromNow()}
                        </span>
                      </div>
                      <div className='flex items-end w-full justify-end gap-3 '>
                        <button
                          className='btn'
                          onClick={() => viewReport(obj?._id)}
                        >
                          <FaEye />
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  <div
                    key={obj?._id}
                    className='card-body flex items-between justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col'
                  >
                    <div className='flex w-full flex-col items-start justify-center'>
                      <span className='text-lg font-semibold'>
                        {obj?.[active + 'AreaId']?.name || 'UNKNOWN'} -{' '}
                        {moment(obj?.month).format('MMMM YYYY')}
                      </span>
                      <span>
                        Last Modified:{' '}
                        {moment(obj?.updatedAt).startOf('day').fromNow()}
                      </span>
                    </div>
                    <div className='flex items-end w-full justify-end gap-3 '>
                      <button
                        className='btn'
                        onClick={() => viewReport(obj?._id)}
                      >
                        <FaEye />
                      </button>
                    </div>
                  </div>
                )
              )
            )
          ) : filerData?.length < 1 ? (
            <NoReports />
          ) : (
            filerData?.map((obj) => (
              <div
                key={obj?._id}
                className='card-body flex items-between justify-between w-full p-5 mb-1 bg-blue-300 rounded-xl lg:flex-row md:flex-row sm:flex-col'
              >
                <div className='flex w-full flex-col items-start justify-center'>
                  <span className='text-lg font-semibold'>
                    {moment(obj?.month).format('MMMM YYYY')}
                  </span>
                  <span>
                    Last Modified:{' '}
                    {moment(obj?.updatedAt).startOf('day').fromNow()}
                  </span>
                </div>
                <div className='flex items-end w-full justify-end gap-3 '>
                  <button className='btn' onClick={() => viewReport(obj?._id)}>
                    <FaEye />
                  </button>
                  <button className='btn' onClick={() => editReport(obj?._id)}>
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
