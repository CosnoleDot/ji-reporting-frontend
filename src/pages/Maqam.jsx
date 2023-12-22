import { GeneralLayout, GeneralInfo, calcultate } from '../components';
import { convertDataFormat, reverseDataFormat, toJson } from '../utils';
import instance from '../api/instrance';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import {
  DivisionReportContext,
  HalqaReportContext,
  MaqamReportContext,
  MeContext,
  useToastState,
} from '../context';
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
  // }F
};

export const Maqam = () => {
  // EDIT CODE START
  const halqa = useContext(HalqaReportContext);
  const maqam = useContext(MaqamReportContext);
  const division = useContext(DivisionReportContext);
  const [month, setMonth] = useState('');
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading, getMaqamReports } = useContext(UIContext);
  const [view, setView] = useState(false);
  const location = useLocation();
  const me = useContext(MeContext);
  const navigate = useNavigate();
  const autoFill = () => {
    const halq = {};
    halqa
      .filter((i) => i?.month.includes(month))
      .forEach((i) => {
        const sim = reverseDataFormat(i);
        Object.keys(sim)?.forEach((j) => {
          if (halq?.[j]) {
            try {
              halq[j] += parseInt(sim[j]) || 0;
            } catch {
              halq[j] += sim[j] || 0;
            }
          } else {
            try {
              halq[j] = parseInt(sim[j]) || 0;
            } catch {
              halq[j] = sim[j] || 0;
            }
          }
        });
      });
    Object.keys(halq).forEach((i) => {
      let j;
      if (i === 'studyCircle-decided') {
        j = 'studyCircleMentioned-decided';
      } else if (i === 'studyCircle-completed') {
        j = 'studyCircleMentioned-done';
      } else if (i === 'studyCircle-attendance') {
        j = 'studyCircleMentioned-averageAttendance';
      } else {
        if (i.split('-')[1] === 'completed') {
          j = i.split('-')[0] + '-done';
        } else if (i.split('-')[1] === 'attendance') {
          j = i.split('-')[0] + '-averageAttendance';
        } else if (i === 'books') {
          j = 'totalBooks';
        } else if (i === 'bookRent') {
          j = 'totalBookRent';
        } else if (i === 'increase') {
          j = 'totalIncrease';
        } else if (i === 'decrease') {
          j = 'totalDecrease';
        } else {
          j = i;
        }
      }
      const elem = document.getElementById(j);
      if (elem) {
        if (j === 'month') {
        } else {
          if (elem.type === 'checkbox') {
          }
          if (j.split('-')[1] === 'attendance') {
            document.getElementById(
              `${j.split('-')[0]}-averageAttendance`
            ).value = halq[i];
          } else {
            if (i === 'name' && !view) {
              elem.value = me?.userAreaId?.name;
            } else {
              elem.value = halq[i];
            }
          }
        }
      }
    });
    document.getElementById('studyCircle-averageAttendance').value = null;
    document.getElementById('studyCircle-done').value = null;
    document.getElementById('arkanFilled').value = null;
    document.getElementById('umeedwaranFilled').value = null;
    ['arkan', 'umeedWaran'].forEach((i) => {
      document.getElementById(`${i}-start`).value = null;
      document.getElementById(`${i}-end`).value = null;
      document.getElementById(`${i}-increase`).value = null;
      document.getElementById(`${i}-decrease`).value = null;
    });
    // document.getElementById('totalLibraries').value = halqa.filter((i) =>
    //   i?.month.includes(month)
    // ).length;
    const afd = [
      'rehaishHalqay',
      'taleemHalqay',
      'totalHalqay',
      'subRehaishHalqay',
      'subTaleemHalqay',
      'subTotalHalqay',
      'busmSchoolUnits',
      'busmRehaishUnits',
      'busmTotalUnits',
      'arkan',
      'umeedWaran',
      'rafaqa',
      'karkunan',
      'members',
      'shaheen',
    ];
    afd.forEach((i) => {
      calcultate(i);
    });
  };
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
            elem.checked = data[i];
          } else {
            elem.value = data[i];
          }
        }
      }
    });
    const afd = [
      'rehaishHalqay',
      'taleemHalqay',
      'totalHalqay',
      'subRehaishHalqay',
      'subTaleemHalqay',
      'subTotalHalqay',
      'busmSchoolUnits',
      'busmRehaishUnits',
      'busmTotalUnits',
      'arkan',
      'umeedWaran',
      'rafaqa',
      'karkunan',
      'members',
      'shaheen',
    ];
    afd.forEach((i) => {
      calcultate(i);
    });
  }, [data]);
  useEffect(() => {
    if (!id) autoFill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, halqa, month]);
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
        await getMaqamReports();
        dispatch({ type: 'SUCCESS', payload: req?.data?.message });
      } else {
        const req = await instance.post('/reports/maqam', jsonData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        await getMaqamReports();
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
              <GeneralInfo
                setMonth={setMonth}
                me={me}
                area={'مقام'}
                view={view}
              />
            </div>
            <div className='mb-4'>
              <Tanzeem view={view} />
            </div>
            <div className='mb-4'>
              <IfradiKuwat view={view} />
            </div>
            <div className='mb-4'>
              <MarkaziActivities view={view} />
            </div>
            <div className='mb-4'>
              <ZailiActivities view={view} />
            </div>
            <div className='mb-4'>
              <OtherActivities view={view} />
            </div>
            <div className='mb-4'>
              <ToseeDawat />
            </div>
            <div className='mb-4'>
              <Library />
            </div>
            <div className='mb-4'>
              <PaighamDigest view={view} />
            </div>
            <div className='mb-4'>
              <RozOShabDiary view={view}/>
            </div>
            <div className='w-full flex p-2'>
              <label htmlFor='comments'>تبصرہ</label>
              <input
                type='text'
                required
                name='comments'
                className='border-b-2 border-dashed w-full'
                id='comments'
                readOnly={view}
              />
            </div>
            {!view && (
              <div className='w-full flex flex-col items-end gap-3 p-2'>
                <div>
                  <label htmlFor='nazim'>نام ناظمِ:</label>
                  <input
                    type='text'
                    className='border-b-2 border-dashed text-center'
                    id='nazim'
                    defaultValue={me?.name || ''}
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
          {!view && (
            <div className='w-full'>
              <button disabled={loading} className='btn btn-primary'>
                {id ? 'Update' : 'Add'}
              </button>
            </div>
          )}
        </form>
      </div>
    </GeneralLayout>
  );
};
