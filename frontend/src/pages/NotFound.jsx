import React from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from '../hooks/useResponsive';
import { Home, Search, ArrowLeft, Heart } from 'lucide-react';

const NotFound = () => {
  const { isMobile } = useResponsive();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl lg:text-9xl font-bold text-primary-600 mb-4">404</div>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-primary-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>

            <Link
              to="/search"
              className="inline-flex items-center justify-center space-x-2 border border-primary-600 text-primary-600 px-4 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-white/50 rounded-lg">
          <p className="text-sm text-gray-600">
            Need help? <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
