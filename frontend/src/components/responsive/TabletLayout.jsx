import React from 'react';
import { useResponsive } from '../../hooks/useResponsive';

const TabletLayout = ({ children, sidebar, className = '' }) => {
  const { isTablet } = useResponsive();

  if (!isTablet) {
    return children;
  }

  return (
    <div className={`flex h-screen bg-gray-50 ${className}`}>
      {sidebar && (
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          {sidebar}
        </div>
      )}
      
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default TabletLayout;
