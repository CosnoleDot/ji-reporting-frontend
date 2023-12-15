import { useContext, useEffect, useState } from 'react';
import instance from '../api/instrance';
import { useToastState } from '../context';
import { Loader } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { UIContext } from '../context/ui';

export const Signup = () => {
  const [userAreaType, setUserAreaType] = useState('Division');
  const [areas, setAreas] = useState([]);
  const { loading, setLoading } = useContext(UIContext);
  const { dispatch } = useToastState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      userAreaId: formData.get('userAreaId'),
      userAreaType: formData.get('userAreaType'),
      email: formData.get('email'),
      password1: formData.get('password1'),
      password2: formData.get('password2'),
      name: formData.get('name'),
      age: formData.get('age'),
      nazim: formData.get('userAreaType').toLowerCase(),
    };
    try {
      const request = await instance.post('/user/signup', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch({ type: 'SUCCESS', payload: request.data?.message });
      e.target.reset();
      navigate('/login');
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
  };
  const getAreas = async () => {
    let data;
    switch (userAreaType) {
      case 'Division':
        setLoading(true);
        data = await instance.get('/locations/division');
        setLoading(false);
        setAreas(data.data.data);
        break;
      case 'Maqam':
        setLoading(true);
        data = await instance.get('/locations/maqam');
        setLoading(false);
        setAreas(data.data.data);
        break;
      case 'Halqa':
        setLoading(true);
        data = await instance.get('/locations/halqa');
        setLoading(false);
        setAreas(data.data.data);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    getAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAreaType]);
  return (
    <div className='relative flex flex-col justify-center h-screen p-2'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg'>
        <div className='w-full flex items-center justify-center'>
          <img src='/logo.png' className='text-center w-25 h-20' alt='LOGO' />
        </div>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <h1 className='font-semibold text-2xl'>Signup Form</h1>
          <div className='flex items-center justify-between'>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Full Name</span>
              </label>
              <input
                type='text'
                placeholder='Full Name'
                name='name'
                className='w-full input input-bordered input-primary'
                required
              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Age</span>
              </label>
              <input
                type='number'
                placeholder='Age'
                name='age'
                className='w-full input input-bordered input-primary'
                required
              />
            </div>
          </div>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              className='w-full input input-bordered input-primary'
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='Enter Password'
                name='password1'
                className='w-full input input-bordered input-primary'
                required
              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Confirm Password</span>
              </label>
              <input
                type='password'
                name='password2'
                placeholder='Confirm Password'
                className='w-full input input-bordered input-primary'
                required
              />
            </div>
          </div>
          <div>
            <span className='px-1 py-2 block font-semibold'>Nazim Type:</span>
            <div className='flex items-center justify-between'>
              <div className='form-control'>
                <label className='label cursor-pointer gap-2'>
                  <input
                    type='radio'
                    name='userAreaType'
                    className='radio checked:bg-blue-500'
                    checked={userAreaType === 'Division'}
                    value='Division'
                    onChange={(e) => setUserAreaType(e.target.value)}
                  />
                  <span className='label-text'>Division</span>
                </label>
              </div>
              <div className='form-control'>
                <label className='label cursor-pointer gap-2'>
                  <input
                    type='radio'
                    name='userAreaType'
                    className='radio checked:bg-blue-500'
                    checked={userAreaType === 'Maqam'}
                    value='Maqam'
                    onChange={(e) => setUserAreaType(e.target.value)}
                  />
                  <span className='label-text'>Maqam</span>
                </label>
              </div>
              <div className='form-control'>
                <label className='label cursor-pointer gap-2'>
                  <input
                    type='radio'
                    name='userAreaType'
                    className='radio checked:bg-blue-500'
                    checked={userAreaType === 'Halqa'}
                    value='Halqa'
                    onChange={(e) => setUserAreaType(e.target.value)}
                  />
                  <span className='label-text'>Halqa</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <span className='px-1 py-2 block font-semibold'>Area:</span>
            <select
              className='select select-bordered w-full'
              defaultValue={''}
              name='userAreaId'
              required
            >
              <option value={''} disabled>
                Select area
              </option>
              {areas
                .sort((a, b) => a?.name?.localeCompare(b?.name))
                .map((area, index) => (
                  <option value={area?._id} key={index}>
                    {area?.name}{' '}
                    {userAreaType === 'Halqa' &&
                      `- ${area?.parentId?.name} (${area?.parentType})`}
                  </option>
                ))}
            </select>
          </div>
          <Link
            to='/'
            className='text-xs text-gray-600 hover:underline mt-5 block hover:text-blue-600'
          >
            Already have an account?
          </Link>
          <div>
            <button type='submit' className='btn btn-primary w-full'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
};
