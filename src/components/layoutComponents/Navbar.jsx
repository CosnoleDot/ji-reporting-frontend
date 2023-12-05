import { useState } from 'react';
import { Notifications } from './Notifications';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import instance from '../../api/instrance';
import { FaRegUserCircle } from 'react-icons/fa';

export const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const [requests, showRequests] = useState(false);
  const [profileTab, showProfileTab] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  const getAllRequests = async () => {
    if (localStorage.getItem('@token')) {
      try {
        const req = await instance.get('/user/user-requests', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@token')}`,
          },
        });
        setUserRequests(req.data?.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllRequests();
    }, 2000); // 2000 milliseconds = 2 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className='navbar bg-blue-500 text-white'>
        <div className='flex-1'>
          <span className='btn btn-ghost text-xl'>
            {title || 'JI Reporting'}
          </span>
        </div>
        <div className='flex-none'>
          {localStorage.getItem('@type') !== 'halqa' && (
            <div className='relative dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle'
                onClick={() => {
                  showRequests(!requests);
                  showProfileTab(false);
                }}
              >
                <div className='indicator'>
                  <FaUserPlus className='text-xl' />
                  <span className='badge badge-sm indicator-item z-10'>
                    {userRequests.length}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              onClick={() => {
                showRequests(false);
                showProfileTab(!profileTab);
              }}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-8'>
                <FaRegUserCircle className='w-full h-full' />
              </div>
            </div>
          </div>
          {profileTab && (
            <ul className='text-black fixed right-[10px] top-[60.5px] menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
              {/* <li>
              <span className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </span>
            </li> */}
              <li onClick={() => navigate('/profile')}>
                <span>Profile</span>
              </li>
              <li onClick={() => navigate('/change-password')}>
                <span>Change Password</span>
              </li>
              <li>
                <span
                  onClick={() => {
                    localStorage.clear();
                    navigate('/login');
                  }}
                >
                  Logout
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>

      {requests && (
        <div
          tabIndex={0}
          className='mt-3 top-[60.5px] right-[10px] lg:right-10 fixed z-[1] w-[calc(100%-20px)] lg:w-[420px] card card-compact dropdown-content bg-base-100 border-2 overflow-hidden'
        >
          <h2 className='p-5 font-bold text-xl'>User Request(s)</h2>
          <Notifications
            userRequests={userRequests}
            getAllRequests={getAllRequests}
          />
        </div>
      )}
    </>
  );
};
