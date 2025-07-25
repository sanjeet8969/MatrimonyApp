import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Heart, 
  MessageCircle, 
  User, 
  Settings,
  HelpCircle,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, className = '' }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/matches', label: 'Matches', icon: Heart },
    { path: '/messages', label: 'Messages', icon: MessageCircle },
    { path: '/profile', label: 'My Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/help', label: 'Help', icon: HelpCircle }
  ];

  const isActivePath = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">MatrimonyApp</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActivePath(item.path)
                    ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
