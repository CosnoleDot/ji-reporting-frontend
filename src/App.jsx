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
  HalqaContext,
  MaqamContext,
  MeContext,
  TehsilContext,
  useToastState,
} from './context';

function App() {
  const [me, setMe] = useState(null);
  const { dispatch } = useToastState();
  const [maqams, setMaqams] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [halqas, setHalqas] = useState([]);
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
  useEffect(() => {
    getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);
  useEffect(() => {
    if (me) {
      getMaqams();
      getDivisions();
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
      <MaqamContext.Provider value={maqams}>
        <DivisionContext.Provider value={divisions}>
          <DistrictContext.Provider value={districts}>
            <TehsilContext.Provider value={tehsils}>
              <HalqaContext.Provider value={halqas}>
                <div className='flex flex-col'>
                  <BrowserRouter>
                    <Routes>
                      <Route path='/signup' element={<Signup />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/' element={<Dashboard />} />
                      <Route path='/reset-password' element={<Forget />} />
                      <Route
                        path='change-password'
                        element={<ChangePassword />}
                      />
                      <Route path='/comparison' element={<Comparision />} />
                      <Route path='/chart' element={<ReportChart />} />
                      <Route path='/reports' element={<Reports />} />
                      <Route
                        path='/reports/create'
                        element={
                          localStorage.getItem('@type') === 'maqam' ? (
                            <Maqam />
                          ) : localStorage.getItem('@type') === 'division' ? (
                            <Division />
                          ) : (
                            <Halqa />
                          )
                        }
                      />
                      <Route
                        path='/reports/edit/:id'
                        element={
                          localStorage.getItem('@type') === 'maqam' ? (
                            <Maqam />
                          ) : localStorage.getItem('@type') === 'division' ? (
                            <Division />
                          ) : (
                            <Halqa />
                          )
                        }
                      />
                      <Route
                        path={
                          localStorage.getItem('@type') !== 'province'
                            ? '/reports/view/:id'
                            : '/reports/view/date/:date'
                        }
                        element={
                          localStorage.getItem('@type') === 'maqam' ? (
                            <Maqam />
                          ) : localStorage.getItem('@type') === 'division' ? (
                            <Division />
                          ) : localStorage.getItem('@type') === 'province' ? (
                            <Province />
                          ) : (
                            <Halqa />
                          )
                        }
                      />
                      <Route path='/profile' element={<EditProfile />} />
                      <Route path='/locations' element={<Locations />} />
                    </Routes>
                  </BrowserRouter>
                  <Toast />
                </div>
              </HalqaContext.Provider>
            </TehsilContext.Provider>
          </DistrictContext.Provider>
        </DivisionContext.Provider>
      </MaqamContext.Provider>
    </MeContext.Provider>
  );
}

export default App;
