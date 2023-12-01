import { FaFile, FaTachometerAlt } from 'react-icons/fa';
import { BsFiles } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';

export const BottomNav = ({ active }) => {
  return (
    <div className='btm-nav'>
      <Link
        to={'/'}
        className={!active || active === 'dashboard' ? 'active' : ''}
      >
        <FaTachometerAlt className='h-5 w-5' />
      </Link>
      <Link
        to={'/reports'}
        className={!active || active === 'reports' ? 'active' : ''}
      >
        <FaFile className='h-5 w-5' />
      </Link>
      {localStorage.getItem('@type') !== 'halqa' && (
        <Link
          to={'/comparison'}
          className={!active || active === 'compare' ? 'active' : ''}
        >
          <BsFiles className='h-5 w-5' />
        </Link>
      )}
      {['province', 'maqam', 'division'].includes(localStorage.getItem('@type')) && (
        <Link
          to={'/locations'}
          className={!active || active === 'locations' ? 'active' : ''}
        >
          <CiLocationOn className='h-5 w-5' />
        </Link>
      )}
    </div>
  );
};
