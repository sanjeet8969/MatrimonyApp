import React from 'react';
import { useResponsive } from '../../hooks/useResponsive';

const ResponsiveGrid = ({ 
  children,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  gap = 6,
  className = ''
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getGridClasses = () => {
    const gapClass = `gap-${gap}`;
    
    if (isMobile) {
      return `grid grid-cols-${mobileColumns} ${gapClass}`;
    } else if (isTablet) {
      return `grid grid-cols-${tabletColumns} ${gapClass}`;
    } else {
      return `grid grid-cols-${desktopColumns} ${gapClass}`;
    }
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;
