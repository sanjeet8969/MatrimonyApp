import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const ProfileProgress = ({ 
  completion = 0, 
  size = 'md',
  showLabel = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const getColor = (completion) => {
    if (completion >= 90) return 'text-green-600';
    if (completion >= 70) return 'text-primary-600';
    if (completion >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStrokeColor = (completion) => {
    if (completion >= 90) return 'stroke-green-600';
    if (completion >= 70) return 'stroke-primary-600';
    if (completion >= 50) return 'stroke-yellow-600';
    return 'stroke-red-600';
  };

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completion / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 70 70">
          {/* Background circle */}
          <circle
            cx="35"
            cy="35"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          
          {/* Progress circle */}
          <circle
            cx="35"
            cy="35"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-300 ${getStrokeColor(completion)}`}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`font-bold ${getColor(completion)} ${textSizeClasses[size]}`}>
              {completion}%
            </div>
            {completion >= 90 ? (
              <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-1" />
            ) : completion < 50 ? (
              <AlertCircle className="w-4 h-4 text-red-600 mx-auto mt-1" />
            ) : null}
          </div>
        </div>
      </div>
      
      {showLabel && (
        <div className="mt-2 text-center">
          <p className="text-sm font-medium text-gray-900">Profile Complete</p>
          {completion < 90 && (
            <p className="text-xs text-gray-500 mt-1">
              {completion < 50 ? 'Add more details' : 'Almost there!'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileProgress;
