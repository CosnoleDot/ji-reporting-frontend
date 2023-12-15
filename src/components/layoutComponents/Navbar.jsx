import { useContext, useState } from 'react';
import { Notifications } from './Notifications';
import { FaBell, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import instance from '../../api/instrance';
import { FaRegUserCircle } from 'react-icons/fa';
import {
  DivisionReportContext,
  HalqaReportContext,
  MaqamReportContext,
} from '../../context';
import { UIContext } from '../../context/ui';

export const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const [requests, showRequests] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileTab, showProfileTab] = useState(false);
  const { userRequests } = useContext(UIContext);
  const [notifications, setNotifications] = useState([]);
  const [reports, setReports] = useState([]);
  const maqamReports = useContext(MaqamReportContext);
  const divisionReports = useContext(DivisionReportContext);
  const halqaReports = useContext(HalqaReportContext);
  const getAllReports = async () => {
    if (
      localStorage.getItem('@token') &&
      localStorage.getItem('@type') !== 'province'
    ) {
      try {
        let req;
        switch (localStorage.getItem('@type')) {
          case 'maqam':
            req = maqamReports;
            break;
          case 'division':
            req = divisionReports;
            break;
          case 'halqa':
            req = halqaReports;
            break;
          default:
            break;
        }
        setReports(req);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getAllNotifications = async () => {
    if (localStorage.getItem('@token')) {
      try {
        const req = await instance.get(
          '/notifications?type=' + localStorage.getItem('@type').toLowerCase(),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('@token')}`,
            },
          }
        );
        setNotifications(
          req.data?.data.filter((i) => {
            const months = reports.map((_) =>
              _.month.split('-').slice(0, 2).join('-')
            );
            return months.includes(
              i.createdAt.split('-').slice(0, 2).join('-')
            );
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllNotifications();
      getAllReports();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <span className='badge badge-sm indicator-item z-10'>
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
