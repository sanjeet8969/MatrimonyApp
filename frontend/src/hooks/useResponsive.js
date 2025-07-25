import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  const isDesktop = screenSize.width >= 1024;
  const isLargeDesktop = screenSize.width >= 1280;

  const breakpoint = isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : 'large';

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    breakpoint,
  };
};

export default useResponsive;
