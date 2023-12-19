import { GeneralLayout, GeneralInfo } from '../components';
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
  ProvinceReportContext,
  useToastState,
} from '../context';
import { UIContext } from '../context/ui';
import { Tanzeem } from '../components/provinceReport/Tanzeem';
import { IfradiKuwat } from '../components/provinceReport/IfradiKuwat';
import { MarkaziActivities } from '../components/provinceReport/MarkaziActivities';
import ZailiActivities from '../components/provinceReport/ZailiActivities';
import { OtherActivities } from '../components/provinceReport/OtherActivities';
import { ToseeDawat } from '../components/provinceReport/ToseeDawat';
import { Library } from '../components/provinceReport/Library';
import { PaighamDigest } from '../components/provinceReport/PaighamDigest';
import { RozOShabDiary } from '../components/provinceReport/RozOShabDiary';

const getData = async (id, setData, data) => {
  const maqam = data['province'];
  const obj = maqam.filter((i) => i?._id?.toString() === id?.toString());
  // if (req) {
  setData(reverseDataFormat(obj[0]));
  // }F
};

export const Province = () => {
  // EDIT CODE START
  const halqa = useContext(HalqaReportContext);
  const maqam = useContext(MaqamReportContext);
  const division = useContext(DivisionReportContext);
  const province = useContext(ProvinceReportContext);
  const [month, setMonth] = useState('');
  const params = useParams();
  const [id, setId] = useState(null);
  const { dispatch } = useToastState();
  const [data, setData] = useState({});
  const { loading, setLoading, getProvinceReports } = useContext(UIContext);
  const [view, setView] = useState(false);
  const location = useLocation();
  const me = useContext(MeContext);
  const navigate = useNavigate();
  const autoFill = () => {
    const halq = {};
    document.getElementById('totalLibraries').value =
      maqam.filter((i) => i?.month.includes(month)).length +
      division.filter((i) => i?.month.includes(month)).length;
    maqam
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
    division
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
      let j = i;
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
            elem.value = halq[i];
          }
        }
      }
    });
    if (!id) {
      document.getElementById('comments').value = null;
      document.getElementById('anyOther').value = null;
    }
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
    if (id) getData(id, setData, { halqa, maqam, division, province });
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
            elem.defaultChecked = data[i] ? true : false;
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
    const calcultate = (v) => {
      // (start + increase)- decrease
      const s = document.getElementById(`${v}-start`);
      const i = document.getElementById(`${v}-increase`);
      const d = document.getElementById(`${v}-decrease`);
      console.log(s, i, d);
      if (document.getElementById(`${v}-end`))
        document.getElementById(`${v}-end`).value =
          parseInt(s?.value) + parseInt(i?.value) - parseInt(d?.value);
    };
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
        const req = await instance.put(`/reports/province/${id}`, jsonData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        await getProvinceReports();
        dispatch({ type: 'SUCCESS', payload: req?.data?.message });
      } else {
        const req = await instance.post('/reports/province', jsonData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        await getProvinceReports();
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
          <h2 className='text-2xl'>جا ئزءکارکردگی رپورٹ (براے صوبہ)</h2>
          <div className='w-full p-4'>
            <div>
              <GeneralInfo
                setMonth={setMonth}
                me={me}
                area={'صوبہ'}
                view={view}
              />
            </div>
            <div className='mb-4'>
              <Tanzeem view={view} id={id} />
            </div>
            <div className='mb-4'>
              <IfradiKuwat view={view} id={id} />
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
              <RozOShabDiary />
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
