import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const [breakpoint, setBreakpoint] = useState('lg');

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({ width, height });

      // Determine breakpoint based on Tailwind CSS breakpoints
      if (width < 640) {
        setBreakpoint('xs');
      } else if (width < 768) {
        setBreakpoint('sm');
      } else if (width < 1024) {
        setBreakpoint('md');
      } else if (width < 1280) {
        setBreakpoint('lg');
      } else {
        setBreakpoint('xl');
      }
    };

    // Set initial dimensions
    updateDimensions();

    // Add event listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl';

  return {
    // Dimensions
    width: dimensions.width,
    height: dimensions.height,
    
    // Breakpoints
    breakpoint,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    
    // Device types
    isMobile,
    isTablet,
    isDesktop,
    
    // Utility functions
    isBreakpoint: (bp) => breakpoint === bp,
    isMinBreakpoint: (bp) => {
      const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
      const currentIndex = breakpoints.indexOf(breakpoint);
      const targetIndex = breakpoints.indexOf(bp);
      return currentIndex >= targetIndex;
    }
  };
};

// Default export (alternative way to import)
export default useResponsive;
