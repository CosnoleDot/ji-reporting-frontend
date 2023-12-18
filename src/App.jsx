import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Forget } from './pages/Forget';
import { Dashboard } from './pages/Dashboard';
import { ChangePassword } from './pages/ChangePassword';
import { Toast } from './components/Toast';
import { Comparision } from './pages/Comparision';
import { ReportChart } from './components/ReportChart';
import { Signup } from './pages/Signup';
import { Reports } from './pages/Reports';
import {
  Division,
  EditProfile,
  Halqa,
  LoadingScreen,
  Locations,
  Maqam,
  Province,
} from './pages';
import { useEffect, useRef, useState } from 'react';
import instance from './api/instrance';
import {
  DistrictContext,
  DivisionContext,
  DivisionReportContext,
  HalqaContext,
  HalqaReportContext,
  MaqamContext,
  MaqamReportContext,
  MeContext,
  ProvinceContext,
  ProvinceReportContext,
  TehsilContext,
  useToastState,
} from './context';
import { UIContext } from './context/ui';
import { Loader } from './components';

function App() {
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState(null);
  const { dispatch } = useToastState();
  const [provinces, setProvinces] = useState([]);
  const [maqams, setMaqams] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [halqas, setHalqas] = useState([]);
  const [nazim, setNazim] = useState([]);
  const [provinceReports, setProvinceReports] = useState([]);
  const [maqamReports, setMaqamReports] = useState([]);
  const [divisionReports, setDivisionReports] = useState([]);
  const [halqaReports, setHalqaReports] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [value, setValue] = useState(null);
  const [active, setActive] = useState('province');
  const [count, setCount] = useState(0);

  const [notifications, setNotifications] = useState([]);
  const [reports, setReports] = useState([]);
  let dis;
  const [authenticated, setAuthenticaated] = useState(
    localStorage.getItem('@token')
  );
  const getMe = async () => {
    try {
      setValue('Fetching user info');
      const req = await instance.get('/user/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setMe(req.data.data);
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getProvinces = async () => {
    try {
      const req = await instance.get('/locations/province', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setProvinces(req.data.data);
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getMaqams = async () => {
    try {
      const req = await instance.get('/locations/maqam', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setMaqams(
          req.data.data.filter(
            (i) =>
              i?._id === me?.userAreaId?._id ||
              i?.province?._id === me?.userAreaId?._id
          )
        );
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getDivisions = async () => {
    try {
      const req = await instance.get('/locations/division', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setDivisions(
          req.data.data.filter(
            (i) =>
              i?._id === me?.userAreaId?._id ||
              i?.province?._id === me?.userAreaId?._id
          )
        );
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getTehsils = async () => {
    try {
      const req = await instance.get('/locations/tehsil', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        const allData = req.data.data;
        const validTehsils = allData.filter(
          (i) =>
            i?.district?.division?._id === me?.userAreaId?._id ||
            i?.district?.division?.province?._id === me?.userAreaId?._id
        );
        setTehsils(validTehsils);
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getDistricts = async () => {
    try {
      const req = await instance.get('/locations/district', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        const allData = req.data.data;
        const validDistricts = allData.filter(
          (i) =>
            i?.division?._id === me?.userAreaId?._id ||
            i?.division?.province?._id === me?.userAreaId?._id
        );
        setDistricts(validDistricts);
        dis = validDistricts;
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getHalqas = async () => {
    try {
      const req = await instance.get('/locations/halqa', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        const allData = req.data.data;
        const type = localStorage.getItem('@type');
        if (type === 'province') {
          setHalqas(allData);
        } else if (type === 'maqam') {
          const validHalqas = allData.filter(
            (i) =>
              i?.parentType === 'Maqam' &&
              (i?.parentId?._id === me?.userAreaId?._id ||
                i?.parentId?.province === me?.userAreaId?._id)
          );
          setHalqas(validHalqas);
        } else if (type === 'division') {
          const validDistricts = dis.map((i) => i?._id?.toString());
          const validHalqas = allData.filter(
            (i) =>
              i?.parentType === 'Tehsil' &&
              validDistricts.includes(i?.parentId?.district?.toString())
          );
          setHalqas(validHalqas);
        } else {
          const validHalqas = allData.filter(
            (i) => i?._id === me?.userAreaId?._id
          );
          setHalqas(validHalqas);
        }
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getProvinceReports = async () => {
    try {
      const req = await instance.get('/reports/province', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setProvinceReports(req.data.data);
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getMaqamReports = async () => {
    try {
      const req = await instance.get('/reports/maqam', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setMaqamReports(req.data.data);
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getDivisionReports = async () => {
    try {
      const req = await instance.get('/reports/division', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setDivisionReports(req.data.data);
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getHalqaReports = async () => {
    try {
      const req = await instance.get('/reports/halqa', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) {
        setHalqaReports(req.data.data);
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
    }
  };
  const getNazim = async () => {
    try {
      const req = await instance.get('/user/nazim', {
        headers: { Authorization: `Bearer ${localStorage.getItem('@token')}` },
      });
      if (req) setNazim(req?.data?.data);
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err?.response?.data?.message || err?.message,
      });
      console.log(err);
    }
  };
  const getAllRequests = async () => {
    if (localStorage.getItem('@token')) {
      try {
        const req = await instance.get('/user/user-requests', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        setUserRequests(req.data?.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  // NOTiFICATIONS CODE
  const getAllReports = async () => {
    if (
      localStorage.getItem('@token') &&
      localStorage.getItem('@type') !== 'province'
    ) {
      try {
        let req;
        switch (localStorage.getItem('@type')) {
          case 'maqam':
            req = maqamReports;
            break;
          case 'division':
            req = divisionReports;
            break;
          case 'halqa':
            req = halqaReports;
            break;
          default:
            break;
        }
        setReports(req);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getAllNotifications = async () => {
    if (localStorage.getItem('@token')) {
      try {
        const req = await instance.get(
          '/notifications?type=' + localStorage.getItem('@type').toLowerCase(),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('@token')}`,
            },
          }
        );
        setNotifications(
          req.data?.data.filter((i) => {
            const months = reports.map((_) =>
              _.month.split('-').slice(0, 2).join('-')
            );
            return !months.includes(
              i.createdAt.split('-').slice(0, 2).join('-')
            );
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllReports();
      getAllRequests();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getAllNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports]);

  // NOTiFICATIONS CODE END
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      if (authenticated) {
        getMe();
        hasMounted.current = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);
  useEffect(() => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const fetchData = async () => {
      setCount((100 / 14) * 1);
      setValue('Fetching provinces');
      await getProvinces();
      setCount((100 / 14) * 2);
      setValue('Fetching maqams');
      await getMaqams();
      setCount((100 / 14) * 3);
      setValue('Fetching divisions');
      await getDivisions();
      setCount((100 / 14) * 4);
      setValue('Fetching districts');
      await sleep(1000);
      await getDistricts();
      setCount((100 / 14) * 5);
      setValue('Fetching tehsils');
      await sleep(1000);
      await getTehsils();
      setCount((100 / 14) * 6);
      setValue('Fetching halqas');
      await sleep(1001);
      await getHalqas();
      setCount((100 / 14) * 7);
      setValue('Fetching province reports');
      await getProvinceReports();
      setCount((100 / 14) * 8);
      setValue('Fetching maqam reports');
      await getMaqamReports();
      setCount((100 / 14) * 9);
      setValue('Fetching division reports');
      await getDivisionReports();
      setCount((100 / 14) * 10);
      setValue('Fetching halqa reports');
      await getHalqaReports();
      setCount((100 / 14) * 11);
      setValue('Fetching nazims');
      await getNazim();
      setCount((100 / 14) * 12);
      setValue('Fetching user requests');
      await getAllRequests();
      setCount((100 / 14) * 13);
      setValue(null);
    };
    if (me) {
      fetchData();
      setActive(localStorage.getItem('@type'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  return (
    <MeContext.Provider value={me}>
      <ProvinceContext.Provider value={provinces}>
        <ProvinceReportContext.Provider value={provinceReports}>
          <MaqamContext.Provider value={maqams}>
            <MaqamReportContext.Provider value={maqamReports}>
              <DivisionContext.Provider value={divisions}>
                <DivisionReportContext.Provider value={divisionReports}>
                  <DistrictContext.Provider value={districts}>
                    <TehsilContext.Provider value={tehsils}>
                      <HalqaContext.Provider value={halqas}>
                        <HalqaReportContext.Provider value={halqaReports}>
                          <UIContext.Provider
                            value={{
                              userRequests,
                              nazim,
                              loading,
                              setLoading,
                              getMe,
                              getProvinces,
                              getMaqams,
                              getDivisions,
                              getDistricts,
                              getTehsils,
                              getHalqas,
                              getProvinceReports,
                              getMaqamReports,
                              getDivisionReports,
                              getHalqaReports,
                              getAllRequests,
                              notifications,
                              reports,
                              setReports,
                              getAllNotifications,
                              active,
                              setActive,
                            }}
                          >
                            <div className='flex flex-col'>
                              <BrowserRouter>
                                <Routes>
                                  <Route path='/signup' element={<Signup />} />
                                  <Route
                                    path='/login'
                                    element={
                                      <Login
                                        setAuthenticated={setAuthenticaated}
                                      />
                                    }
                                  />
                                  <Route path='/' element={<Dashboard />} />
                                  <Route
                                    path='/reset-password'
                                    element={<Forget />}
                                  />
                                  <Route
                                    path='change-password'
                                    element={<ChangePassword />}
                                  />
                                  <Route
                                    path='/comparison'
                                    element={<Comparision />}
                                  />
                                  <Route
                                    path='/chart'
                                    element={<ReportChart />}
                                  />
                                  <Route
                                    path='/reports'
                                    element={<Reports />}
                                  />
                                  <Route
                                    path='/reports/create'
                                    element={
                                      localStorage.getItem('@type') ===
                                      'maqam' ? (
                                        <Maqam />
                                      ) : localStorage.getItem('@type') ===
                                        'division' ? (
                                        <Division />
                                      ) : localStorage.getItem('@type') ===
                                        'province' ? (
                                        <Province />
                                      ) : (
                                        <Halqa />
                                      )
                                    }
                                  />
                                  <Route
                                    path='/reports/edit/:id'
                                    element={
                                      localStorage.getItem('@type') ===
                                      'maqam' ? (
                                        <Maqam />
                                      ) : localStorage.getItem('@type') ===
                                        'division' ? (
                                        <Division />
                                      ) : localStorage.getItem('@type') ===
                                        'province' ? (
                                        <Province />
                                      ) : (
                                        <Halqa />
                                      )
                                    }
                                  />
                                  <Route
                                    path={'/reports/view/:id'}
                                    element={
                                      active === 'maqam' ? (
                                        <Maqam />
                                      ) : active === 'division' ? (
                                        <Division />
                                      ) : active === 'province' ? (
                                        <Province />
                                      ) : (
                                        <Halqa />
                                      )
                                    }
                                  />
                                  <Route
                                    path='/profile'
                                    element={<EditProfile />}
                                  />
                                  <Route
                                    path='/locations'
                                    element={<Locations />}
                                  />
                                </Routes>
                              </BrowserRouter>
                              <LoadingScreen count={count} value={value} />
                              {loading && <Loader />}
                              <Toast />
                            </div>
                          </UIContext.Provider>
                        </HalqaReportContext.Provider>
                      </HalqaContext.Provider>
                    </TehsilContext.Provider>
                  </DistrictContext.Provider>
                </DivisionReportContext.Provider>
              </DivisionContext.Provider>
            </MaqamReportContext.Provider>
          </MaqamContext.Provider>
        </ProvinceReportContext.Provider>
      </ProvinceContext.Provider>
    </MeContext.Provider>
  );
}

export default App;
