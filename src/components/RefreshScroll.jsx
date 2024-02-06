import React, { useEffect, useState } from 'react';

export const DoubleScrollLeftRefresh = () => {
  const [lastScrollTime, setLastScrollTime] = useState(0);

  const handleScroll = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastScrollTime < 500 && window.scrollX < 0) {
      window.location.reload();
    }

    setLastScrollTime(currentTime);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollTime]);

  return <></>;
};
