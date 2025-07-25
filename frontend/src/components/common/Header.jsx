import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useResponsive } from '../../hooks/useResponsive.js';
import { 
  Heart, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut,
  Bell,
  MessageCircle,
  Search,
  Home
} from 'lucide-react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigationLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/search', label: 'Search', icon: Search, protected: true },
    { path: '/matches', label: 'Matches', icon: Heart, protected: true },
    { path: '/messages', label: 'Messages', icon: MessageCircle, protected: true }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileMenu(false);
    setShowMobileMenu(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-bold text-gray-900">MatrimonyApp</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => {
                if (link.protected && !isAuthenticated) return null;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      isActivePath(link.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Desktop Auth Section */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="text-sm font-medium">{user?.email?.split('@')[0]}</span>
                    </button>

                    {showProfileMenu && (
                      <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48">
                        <Link
                          to={`/profile/${user?.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>My Profile</span>
                          </div>
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </div>
                        </Link>
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <div className="flex items-center space-x-2">
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Join Free
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-600 hover:text-gray-900 md:hidden"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navigationLinks.map((link) => {
                if (link.protected && !isAuthenticated) return null;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActivePath(link.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Auth Section */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to={`/profile/${user?.id}`}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors text-center font-medium"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Join Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
