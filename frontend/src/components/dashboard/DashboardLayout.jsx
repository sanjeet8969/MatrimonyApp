import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import { useResponsive } from '../../hooks/useResponsive';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile } = useResponsive();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 overflow-auto">
          {isMobile && (
            <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-5 h-5" />
                <span>Menu</span>
              </button>
            </div>
          )}
          
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
