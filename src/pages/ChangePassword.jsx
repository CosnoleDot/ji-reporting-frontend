import instance from '../api/instrance';
import { GeneralLayout } from '../components';
import { useToastState } from '../context';

export const ChangePassword = () => {
  const { dispatch } = useToastState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const req = await instance.put(
        '/user/change-password',
        {
          password0: formData.get('password0'),
          password1: formData.get('password1'),
          password2: formData.get('password2'),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch({ type: 'SUCCESS', payload: req.data?.message });
      e.target.reset();
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.message });
    }
  };
  return (
    <GeneralLayout>
      <div className='relative flex  justify-center  overflow-hidden h-[calc(100vh-65.6px-64px)]'>
      <div className=" w-[40%] bg-secondary h-[calc(100vh-65.6px-64px)] p-[40px] flex flex-col justify-between">
        <div></div>
        <div className="flex flex-col gap-4">
          <h2 class="text-white font-inter text-2xl font-bold leading-7 text-left">
            Welcome to IJT Reporting
          </h2>
          <p class="text-white font-inter text-base font-normal leading-7 text-left">
            Get better view of your activities and manage your nazims in an easy
            way. Report your activities here.
          </p>
        </div>
      </div>
        <div className='w-full p-6 m-auto bg-white rounded-md lg:max-w-lg'>
          <h3 className='font-bold text-2xl'>Change Password</h3>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label className='label'>
                <span className='text-base label-text'>Current Password</span>
              </label>
              <input
                type='password'
                placeholder='Current Password'
                className='w-full input input-bordered input-primary'
                name='password0'
                minLength={4}
                required
              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>New Password</span>
              </label>
              <input
                type='password'
                placeholder='New Passowrd'
                className='w-full input input-bordered input-primary'
                name='password1'
                minLength={4}
                required
              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text'>
                  Confirm New Password
                </span>
              </label>
              <input
                type='password'
                placeholder='Confirm New Password'
                className='w-full input input-bordered input-primary'
                minLength={4}
                name='password2'
                required
              />
            </div>
            <div>
              <button className='btn btn-primary'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </GeneralLayout>
  );
};
