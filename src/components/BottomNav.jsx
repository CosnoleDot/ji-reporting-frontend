import { FaFile, FaTachometerAlt } from 'react-icons/fa';
import { BsFiles } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';

export const BottomNav = ({ active }) => {
  return (
    <div className='btm-nav border-none text-gray-300'>
      <Link
        to={'/'}
        className={!active || active === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-blue-50'}
      >
        <FaTachometerAlt className='h-5 w-5' />
      </Link>
      <Link
        to={'/reports'}
        className={!active || active === 'reports' ? 'bg-blue-500 text-white' : 'bg-blue-50'}
      >
        <FaFile className='h-5 w-5' />
      </Link>
      {localStorage.getItem('@type') !== 'halqa' && (
        <Link
          to={'/comparison'}
          className={!active || active === 'comparison' ? 'bg-blue-500 text-white' : 'bg-blue-50'}
        >
          <BsFiles className='h-5 w-5' />
        </Link>
      )}
      {['province', 'maqam', 'division'].includes(localStorage.getItem('@type')) && (
        <Link
          to={'/locations'}
          className={!active || active === 'locations' ? 'bg-blue-500 text-white' : 'bg-blue-50'}
        >
          <CiLocationOn className='h-5 w-5' />
        </Link>
      )}
    </div>
  );
};
