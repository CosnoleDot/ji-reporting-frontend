import React, { useContext } from 'react';
import { GeneralLayout, Loader, GeneralInfo } from '../components';
import { convertDataFormat, sumIntValues, toJson } from '../utils';
import instance from '../api/instrance';
import { InputWithLabel } from '../components/InputWithLabel';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  DivisionContext,
  DivisionReportContext,
  HalqaContext,
  HalqaReportContext,
  MaqamReportContext,
  MeContext,
  useToastState,
} from '../context';
import { useEffect } from 'react';
import { getData } from './Maqam';
import { UIContext } from '../context/ui';
import { Tanzeem } from '../components/divisionReport/Tanzeem';
import { IfradiKuwat } from '../components/divisionReport/IfradiKuwat';
import { MarkaziActivities } from '../components/divisionReport/MarkaziActivities';
import ZailiActivities from '../components/divisionReport/ZailiActivities';
import { OtherActivities } from '../components/divisionReport/OtherActivities';
import { ToseeDawat } from '../components/divisionReport/ToseeDawat';
import { Library } from '../components/divisionReport/Library';
import { PaighamDigest } from '../components/divisionReport/PaighamDigest';
import { RozOShabDiary } from '../components/divisionReport/RozOShabDiary';

export const Division = () => {
  // EDIT CODE START
  const halqa = useContext(HalqaReportContext);
  const maqam = useContext(MaqamReportContext);
  const division = useContext(DivisionReportContext);
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading } = useContext(UIContext);
  const [view, setView] = useState(false);
  const me = useContext(MeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const halqaReports = useContext(HalqaReportContext);
  
  console.log(sumIntValues(halqaReports));
  
  useEffect(() => {
    const l = location.pathname?.split('/')[2];
    if (l === 'view') {
      setView(true);
    }
    setId(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    if (id) getData('division', id, setData, { halqa, maqam, division });
    else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    Object.keys(data).forEach((i) => {
      const elem = document.getElementById(i);
      if (elem) {
        if (i === 'month') {
          elem.value = data[i]?.split('')?.slice(0, 7)?.join('');
        } else {
          elem.value = data[i];
        }
      }
    });
  }, [data]);
  // EDIT CODE END

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const jsonData = convertDataFormat(toJson(formData));
    setLoading(true);
    try {
      if (id) {
        const req = await instance.put(`/reports/division/${id}`, jsonData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        dispatch({ type: 'SUCCESS', payload: req.data?.message });
        navigate('/reports');
      } else {
        const req = await instance.post('/reports/division', jsonData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        dispatch({ type: 'SUCCESS', payload: req.data?.message });
        navigate('/reports');
      }

      e.target.reset();
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.response.data.message });
    }
    setLoading(false);
  };
  return (
    <GeneralLayout>
      <div className='reports h-[calc(100vh-64.4px-64px)] overflow-hidden overflow-y-scroll w-full'>
        <form
          className='flex w-full flex-col justify-center items-center p-4 font-notoUrdu'
          dir='rtl'
          onSubmit={handleSubmit}
        >
          {/* <fieldset disabled={view} className="w-full"> */}
          <h2 className='text-2xl mb-4'>جا ئزءکارکردگی رپورٹ (براے ڈویژن)</h2>
          <div className='w-full'>
            <div>
              <GeneralInfo me={me} area={'ڈویژن'} />
            </div>
            <div>
              {/* <TanzeemDivision view={view} /> */}
              <Tanzeem data={data} />
            </div>
            <div className='mb-4'>
              {/* <MenTableDivision view={view} /> */}
              <IfradiKuwat data={data} />
            </div>
            <div className='mb-4'>
              {/* <CentralActivitiesDivision view={view} /> */}
              <MarkaziActivities />
            </div>
            <div className='mb-4'>
              {/* <ZailiActivitesDivision view={view} /> */}
              <ZailiActivities />
            </div>
            <div className=' mb-4'>
              {/* <OtherActivitiesDivision arr={arr} view={view} /> */}
              <OtherActivities />
            </div>
            <div className=' mb-4'>
              {/* <ExpandPartyDivision view={view} /> */}
              <ToseeDawat />
            </div>
            <div className=' mb-4'>
              {/* <LibraryDivision view={view} /> */}
              <Library />
            </div>
            <div className=' mb-4'>
              {/* <MessageDigestDivision view={view} /> */}
              <PaighamDigest />
            </div>
            <div className=' mb-4'>
              {/* <EveningDiaryDivision view={view} /> */}
              <RozOShabDiary />
            </div>
          </div>
          <div className=' w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2'>
            <div className='w-full md:pr-0 mb-2'>
              <InputWithLabel
                readOnly={view}
                type={'textarea'}
                required={true}
                placeholder={' تبصرہ'}
                label={' تبصرہ'}
                id={'comments'}
                name={'comments'}
              />
            </div>
            <div className='w-full mb-2'>
              <InputWithLabel
                readOnly={view}
                required={true}
                label={'برائے ماہ'}
                type={'month'}
                id={'month'}
                name={'month'}
                value={'sdfhasdfhas'}
              />
            </div>
          </div>
          <div className='w-full'>
            <button className='btn btn-primary' disabled={loading}>
              {id ? 'Update' : 'Add'}
            </button>
          </div>
          {/* </fieldset> */}
        </form>
      </div>
      {loading && <Loader />}
    </GeneralLayout>
  );
};
