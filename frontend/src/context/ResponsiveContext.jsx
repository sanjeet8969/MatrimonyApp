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

  const showMobileView = (content) => {
    return breakpointData.isMobile ? content : null;
  };

  const showTabletView = (content) => {
    return breakpointData.isTablet ? content : null;
  };

  const showDesktopView = (content) => {
    return breakpointData.isDesktop ? content : null;
  };

  const value = {
    ...breakpointData,
    getColumns,
    getSpacing,
    showMobileView,
    showTabletView,
    showDesktopView
  };

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
};

// Wrapper component that includes BreakpointProvider
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
