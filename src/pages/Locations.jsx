import { useContext, useState } from 'react';
import {
  GeneralLayout,
  Loader,
  LocationDivision,
  LocationMaqam,
} from '../components';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import instance from '../api/instrance';
import { MeContext, useToastState } from '../context';

export const Locations = () => {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(
    ['province', 'maqam'].includes(localStorage.getItem('@type'))
      ? 'maqam'
      : 'division'
  );
  const me = useContext(MeContext);
  const params = useLocation();
  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(params.search);
      const queryParams = {};

      for (let [key, value] of searchParams.entries()) {
        queryParams[key] = value;
      }

      if (queryParams.active) setActive(queryParams.active);
    };

    // Call the function when the component mounts or when the location changes
    getQueryParams();
  }, [params]);
  return (
    <GeneralLayout title='Locations' active={'locations'}>
      <div className='relative flex flex-col items-center py-3 px-0 pt-0 justify-start h-[calc(100vh-65.6px-64px)]'>
        <div
          role='tablist'
          className='w-full flex justify-between items-center'
        >
          {['province', 'maqam'].includes(localStorage.getItem('@type')) && (
            <Link
              to={'?active=maqam'}
              role='tab'
              className={`tab w-full ${active === 'maqam' ? 'tab-active' : ''}`}
            >
              Maqam
            </Link>
          )}
          {['province', 'division'].includes(localStorage.getItem('@type')) && (
            <Link
              to={'?active=division'}
              role='tab'
              className={`tab w-full ${
                active === 'division' ? 'tab-active' : ''
              }`}
            >
              Division
            </Link>
          )}
        </div>
        <div className='relative w-full flex flex-col gap-3 items-center justify-start h-[calc(100vh-65.6px-64px-32px)]'>
          {active === 'maqam' && (
            <LocationMaqam me={me} setLoading0={setLoading} />
          )}
          {active === 'division' && (
            <LocationDivision me={me} setLoading0={setLoading} />
          )}
        </div>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
