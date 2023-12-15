import { GeneralLayout, GeneralInfo } from '../components';
import { convertDataFormat, reverseDataFormat, toJson } from '../utils';
import instance from '../api/instrance';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import {
  DivisionReportContext,
  HalqaContext,
  HalqaReportContext,
  MaqamReportContext,
  MeContext,
  useToastState,
} from '../context';
import { InputWithLabel } from '../components/InputWithLabel';
import { UIContext } from '../context/ui';
import { Tanzeem } from '../components/maqamReport/Tanzeem';
import { IfradiKuwat } from '../components/maqamReport/IfradiKuwat';
import { MarkaziActivities } from '../components/maqamReport/MarkaziActivities';
import ZailiActivities from '../components/maqamReport/ZailiActivities';
import { OtherActivities } from '../components/maqamReport/OtherActivities';
import { ToseeDawat } from '../components/maqamReport/ToseeDawat';
import { Library } from '../components/maqamReport/Library';
import { PaighamDigest } from '../components/maqamReport/PaighamDigest';
import { RozOShabDiary } from '../components/maqamReport/RozOShabDiary';

export const getData = async (path, id, setData, data) => {
  const arr = data[path];
  const obj = arr.filter((i) => i?._id?.toString() === id?.toString());
  // if (req) {
  setData(reverseDataFormat(obj[0]));
  console.log(obj[0]);
  // }F
};

export const Maqam = () => {
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
  const location = useLocation();
  const me = useContext(MeContext);
  const navigate = useNavigate();
  const allHalqas = useContext(HalqaContext);

  const currMaqamHalqas = Array.isArray(allHalqas)
    ? allHalqas.filter((curr) => {
        const [dataMonth, dataYear] = [
          curr?.month?.split('-')[1],
          curr?.month?.split('-')[0],
        ];
        const [givenMonth, givenYear] = [id?.split('-')[1], id?.split('-')[0]];
        return dataMonth === givenMonth && dataYear === givenYear;
      })
    : [];
  console.log(currMaqamHalqas);
  useEffect(() => {
    const l = location.pathname?.split('/')[2];
    if (l === 'view') {
      setView(true);
    }
    setId(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    if (id) getData('maqam', id, setData, { halqa, maqam, division });
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
          if (elem.type === 'checkbox') {
            elem.defaultChecked = data[i];
          } else {
            elem.value = data[i];
          }
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
        const req = await instance.put(`/reports/maqam/${id}`, jsonData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });

        dispatch({ type: 'SUCCESS', payload: req?.data?.message });
      } else {
        const req = await instance.post('/reports/maqam', jsonData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        dispatch({ type: 'SUCCESS', payload: req.data?.message });
      }
      navigate('/reports');
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error?.response?.data?.message });
    }
    setLoading(false);
  };

  return (
    <GeneralLayout>
      <div className='reports h-[calc(100vh-64.4px-64px)] overflow-y-scroll'>
        <form
          className='flex flex-col justify-center items-center p-4 font-notoUrdu'
          dir='rtl'
          onSubmit={handleSubmit}
          id='maqam-form'
        >
          <h2 className='text-2xl'>جا ئزءکارکردگی رپورٹ (براے مقام)</h2>
          <div className='w-full p-4'>
            <div>
              <GeneralInfo me={me} area={'مقام'} />
            </div>
            <div className='mb-4'>
              <Tanzeem data={data} />
            </div>
            <div className='mb-4'>
              <IfradiKuwat data={data} />
            </div>
            <div className='mb-4'>
              <MarkaziActivities />
            </div>
            <div className='mb-4'>
              <ZailiActivities />
            </div>
            <div className='mb-4'>
              <OtherActivities />
            </div>
            <div className='mb-4'>
              <ToseeDawat />
            </div>
            <div className='mb-4'>
              <Library />
            </div>
            <div className='mb-4'>
              <PaighamDigest />
            </div>
            <div className='mb-4'>
              <RozOShabDiary />
            </div>
            <div className='w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2'>
              <div className='w-full md:pr-0 mb-2'>
                <InputWithLabel
                  readOnly={view}
                  type={'textarea'}
                  required={true}
                  placeholder={'تبصرہ'}
                  label={'تبصرہ'}
                  id={'comments'}
                  name={'comments'}
                />
              </div>
              <div className='w-full mb-2'>
                <InputWithLabel
                  readOnly={view}
                  required={true}
                  label={'برائے  ماہ'}
                  placeholder={'برائے  ماہ'}
                  type={'month'}
                  id={'month'}
                  name={'month'}
                />
              </div>
            </div>
          </div>
          <div className='w-full'>
            <button disabled={loading} className='btn btn-primary'>
              {id ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </GeneralLayout>
  );
};
