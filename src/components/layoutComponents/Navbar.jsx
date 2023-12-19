import { useContext, useState } from 'react';
import { Notifications } from './Notifications';
import { FaBell, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { UIContext } from '../../context/ui';
import { MeContext } from '../../context';

export const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const [requests, showRequests] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const me = useContext(MeContext);
  const [profileTab, showProfileTab] = useState(false);
  const { userRequests, notifications, getAllNotifications } =
    useContext(UIContext);

  return (
    <>
      <div className='navbar bg-blue-500 text-white'>
        <div className='flex-1'>
          <span className='text-xl'>{title || 'JI Reporting'}</span>
        </div>
        <div className='flex-none'>
          <div className='relative dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle'
              onClick={() => {
                setShowNotifications(!showNotifications);
                showRequests(false);
                showProfileTab(false);
              }}
            >
              <div className='indicator'>
                <FaBell className='text-xl' />
                <span className='badge badge-sm absolute -top-2 -right-3 z-0'>
                  {notifications?.length || 0}
                </span>
              </div>
            </div>
          </div>
          {localStorage.getItem('@type') !== 'halqa' && (
            <div className='relative dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle'
                onClick={() => {
                  setShowNotifications(false);
                  showRequests(!requests);
                  showProfileTab(false);
                }}
              >
                <div className='indicator'>
                  <FaUserPlus className='text-xl' />
                  <span className='badge badge-sm absolute -top-2 -right-3 z-0'>
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
                setShowNotifications(false);
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
              <li className='mb-1'>
                <span className='bg-slate-200 flex flex-col w-full justify-start items-start gap-0'>
                  <span className='font-semibold'>{me?.name}</span>
                  <span className='text-xs'>{me?.email}</span>
                </span>
              </li>
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
                    window.location.reload();
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
          <Notifications userRequests={userRequests} type='request' />
        </div>
      )}

      {showNotifications && (
        <div
          tabIndex={0}
          className='mt-3 top-[60.5px] right-[10px] lg:right-10 fixed z-[1] w-[calc(100%-20px)] lg:w-[420px] card card-compact dropdown-content bg-base-100 border-2 overflow-hidden'
        >
          <h2 className='p-5 font-bold text-xl'>Notification(s)</h2>
          <Notifications
            userRequests={notifications}
            getAllRequests={getAllNotifications}
            type='notify'
          />
        </div>
      )}
    </>
  );
};
