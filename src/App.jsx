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
  Locations,
  Maqam,
  Province,
 
} from './pages';
import { useEffect, useState } from 'react';
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
  const [loadingStart, setLoadingStart] = useState(false);
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
  const getMe = async () => {
    try {
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
          const validDistricts = districts.map((i) => i?._id?.toString());
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
  useEffect(() => {
    if (localStorage.getItem('@token')) {
      setLoadingStart(true);
      getMe();
      setLoadingStart(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);
  useEffect(() => {
    if (me) {
      getProvinces();
      getMaqams();
      getDivisions();
      getProvinceReports();
      getMaqamReports();
      getDivisionReports();
      getHalqaReports();
      getNazim();
      getAllRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);
  useEffect(() => {
    if (
      maqams.length > 0 &&
      ['province', 'maqam'].includes(localStorage.getItem('@type'))
    ) {
      getHalqas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maqams]);
  useEffect(() => {
    if (
      divisions.length > 0 &&
      ['province', 'division'].includes(localStorage.getItem('@type'))
    ) {
      getDistricts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divisions]);
  useEffect(() => {
    if (
      districts.length > 0 &&
      ['province', 'division'].includes(localStorage.getItem('@type'))
    ) {
      getTehsils();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districts]);
  useEffect(() => {
    if (
      tehsils.length > 0 &&
      ['province', 'division'].includes(localStorage.getItem('@type'))
    ) {
      getHalqas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tehsils]);
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
                            }}
                          >
                            <div className='flex flex-col'>
                              <BrowserRouter>
                                <Routes>
                                  <Route path='/signup' element={<Signup />} />
                                  <Route path='/login' element={<Login />} />
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
                                      ) : (
                                        <Halqa />
                                      )
                                    }
                                  />
                                  <Route
                                    path={
                                      localStorage.getItem('@type') !==
                                      'province'
                                        ? '/reports/view/:id'
                                        : '/reports/view/date/:date'
                                    }
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
                                    path='/profile'
                                    element={<EditProfile />}
                                  />
                                  <Route
                                    path='/locations'
                                    element={<Locations />}
                                  />
                                </Routes>
                              </BrowserRouter>
                              {loading && <Loader />}
                              {loadingStart && <Loader />}
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
