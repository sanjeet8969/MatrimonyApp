import React from 'react';
import { useResponsive } from '../../hooks/useResponsive';

const DesktopLayout = ({ children, sidebar, rightPanel, className = '' }) => {
  const { isDesktop } = useResponsive();

  if (!isDesktop) {
    return children;
  }

  return (
    <div className={`flex h-screen bg-gray-50 ${className}`}>
      {sidebar && (
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          {sidebar}
        </div>
      )}
      
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        
        {rightPanel && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            {rightPanel}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopLayout;
