import React from 'react';
import { Heart } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4`}></div>
            <Heart className="w-6 h-6 text-primary-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fill-current" />
          </div>
          <p className={`text-gray-600 ${textSizeClasses[size]}`}>{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin mb-4`}></div>
        <Heart className="w-4 h-4 text-primary-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fill-current" />
      </div>
      <p className={`text-gray-600 ${textSizeClasses[size]}`}>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
