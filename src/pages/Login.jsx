import instance from '../api/instrance';
import { useNavigate, Link } from 'react-router-dom';
import { toJson } from '../utils';
import { useToastState } from '../context';
import { useContext } from 'react';
import { Loader } from '../components';
import { UIContext } from '../context/ui';

export const Login = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const { dispatch } = useToastState();
  const { loading, setLoading } = useContext(UIContext);
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
      setAuthenticated(res?.data?.data?.token);
      localStorage.setItem('@type', res?.data?.data?.type);
      navigate('/');
    } catch (error) {
      const message = error?.response?.data?.message;
      dispatch({ type: 'ERROR', payload: message });
    }
    setLoading(false);
  };
  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg'>
        <div className='flex items-center justify-center w-full'>
          <img src='/logo.png' className='text-center  h-[200px] w-[250px]' alt='LOGO' />
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
        <div className='w-full flex justify-center items-start gap-3'>
          <span className='text-slate-800'>Powered By:</span>
          <a
            href='https://consoledot.com'
            target='_blank'
            rel='noreferrer'
            className='flex items-center justify-start gap-1'
          >
            <img src='/cd.png' alt='CD LOGO' className='w-5 h-5' /> ConsoleDot
          </a>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};
