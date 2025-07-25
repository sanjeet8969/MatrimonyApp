import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ 
  src, 
  name, 
  size = 'md', 
  className = '',
  showOnline = false,
  isOnline = false 
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-100 flex items-center justify-center`}>
        {src ? (
          <img
            src={src}
            alt={name || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : name ? (
          <span className={`font-medium text-gray-600 ${textSizeClasses[size]}`}>
            {getInitials(name)}
          </span>
        ) : (
          <User className={`text-gray-400 ${size === 'xs' || size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'}`} />
        )}
      </div>
      
      {showOnline && (
        <div className={`absolute bottom-0 right-0 ${
          size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
        } ${isOnline ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white rounded-full`} />
      )}
    </div>
  );
};

export default Avatar;
