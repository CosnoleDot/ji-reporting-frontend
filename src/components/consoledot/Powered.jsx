import React from 'react';
import { FcCdLogo } from 'react-icons/fc';

export const Powered = () => {

  const handleClick = () => {
    window.open('https://consoledot.com', '_blank'); 
  };

  return (
    <div
      className='w-full flex items-center justify-around border-t-primary cursor-pointer'
      onClick={handleClick} 
    >
      <span className='text-black font-inter text-[14px]'>Powered By:</span>
      <div className='flex gap-2 items-center'>
        <img src='/cd.png' alt='icon' width={15} height={15} />
        <span className='text-black font-inter text-[14px]'>ConsoleDot</span>
      </div>
    </div>
  );
};
