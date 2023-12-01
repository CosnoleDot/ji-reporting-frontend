import instance from '../api/instrance';
import { useNavigate, Link } from 'react-router-dom';
import { toJson } from '../utils';
import { useToastState } from '../context';
import { useState } from 'react';
import { Loader } from '../components';

export const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useToastState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { email, password } = toJson(formData);
    try {
      const res = await instance.post(
        '/user/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('@token', res?.data?.data?.token);
      localStorage.setItem('@type', res?.data?.data?.type);
      navigate('/');
    } catch (error) {
      const message = error?.response?.data?.message;
      dispatch({ type: 'ERROR', payload: message });
    }
    setLoading(false);
  };
  return (
    <div className='relative flex flex-col justify-center h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg'>
        <div className='w-full flex items-center justify-center'>
          <img src='/logo.png' className='text-center' alt='LOGO' />
        </div>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Email</span>
            </label>
            <input
              name='email'
              type='text'
              placeholder='Email Address'
              className='w-full input input-bordered input-primary'
            />
          </div>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              name='password'
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered input-primary'
            />
          </div>
          <div className='flex justify-between items-center'>
            <Link
              to='/reset-password'
              className='text-xs text-gray-600 hover:underline hover:text-blue-600'
            >
              Forget Password?
            </Link>
            <Link
              to='/signup'
              className='text-xs text-gray-600 hover:underline hover:text-blue-600'
            >
              Create new account
            </Link>
          </div>
          <div>
            <button
              disabled={loading}
              className='btn btn-primary'
              type='submit'
            >
              Login
            </button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
};
