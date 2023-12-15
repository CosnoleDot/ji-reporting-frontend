import { useContext } from 'react';
import instance from '../api/instrance';
import { useToastState } from '../context';
import { Link } from 'react-router-dom';
import { Loader } from '../components';
import { UIContext } from '../context/ui';

export const Forget = () => {
  const { dispatch } = useToastState();
  const { loading, setLoading } = useContext(UIContext);
  const handleForget = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await instance.post('/user/forget-password', {
        email: formData.get('email'),
      });
      dispatch({ type: 'SUCCESS', payload: res.data?.message });
      e.target.reset();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
    setLoading(false);
  };
  return (
    <div className='relative flex flex-col justify-center h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg'>
        <div className='w-full flex items-center justify-center'>
          <img src='/logo.png' className='text-center' alt='LOGO' />
        </div>
        <form className='space-y-4' onSubmit={handleForget}>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Email</span>
            </label>
            <input
              type='email'
              name='email'
              placeholder='Email Address'
              className='w-full input input-bordered input-primary'
            />
          </div>
          <Link
            to='/login'
            className='text-xs text-gray-600 hover:underline hover:text-blue-600'
          >
            Back to login
          </Link>
          <div>
            <button disabled={loading} className='btn btn-primary' type='submit'>
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
};
