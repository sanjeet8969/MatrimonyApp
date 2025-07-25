import React, { createContext, useContext } from 'react';
import BreakpointProvider, { useBreakpoint } from '../components/responsive/BreakpointProvider';

const ResponsiveContext = createContext();

export const useResponsiveContext = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsiveContext must be used within a ResponsiveProvider');
  }
  return context;
};

const ResponsiveProvider = ({ children }) => {
  const breakpointData = useBreakpoint();

  const getColumns = (mobile = 1, tablet = 2, desktop = 3) => {
    if (breakpointData.isMobile) return mobile;
    if (breakpointData.isTablet) return tablet;
    return desktop;
  };

  const getSpacing = (mobile = 4, tablet = 6, desktop = 8) => {
    if (breakpointData.isMobile) return mobile;
    if (breakpointData.isTablet) return tablet;
    return desktop;
  };

  const value = {
    ...breakpointData,
    getColumns,
    getSpacing
  };

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
};

// Fixed wrapper component
const ResponsiveWrapper = ({ children }) => {
  return (
    <BreakpointProvider>
      <ResponsiveProvider>
        {children}
      </ResponsiveProvider>
    </BreakpointProvider>
  );
};

export default ResponsiveWrapper;
