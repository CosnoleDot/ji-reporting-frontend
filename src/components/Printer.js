import { useState } from 'react';

export const PrintDocument = () => {
  const [print, setPrint] = useState(true);
  const printDoc = () => {
    setPrint(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };
  return (
    <>
      {print && (
        <button className='btn' onClick={printDoc}>
          Print
        </button>
      )}
    </>
  );
};
