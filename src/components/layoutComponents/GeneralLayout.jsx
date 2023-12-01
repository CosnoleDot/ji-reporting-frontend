import { useEffect } from 'react';
import { BottomNav } from '../BottomNav';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';

export const GeneralLayout = ({ children, active, title }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('@token');
    if (!token || token === 'undefined' || token === 'null') {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <>
      <Navbar title={title} />
      {children}
      <BottomNav active={active} />
    </>
  );
};
