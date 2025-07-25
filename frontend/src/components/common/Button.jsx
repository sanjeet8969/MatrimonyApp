import React from 'react';
import { useResponsive } from '../../hooks/useResponsive.js';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const { isMobile } = useResponsive();

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
    outline: 'border-2 border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100',
    ghost: 'text-gray-600 bg-transparent hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800'
  };

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  const responsiveSize = isMobile && size === 'lg' ? 'md' : size;

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[responsiveSize]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const IconComponent = icon;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      )}
      
      {!loading && IconComponent && iconPosition === 'left' && (
        <IconComponent className="w-4 h-4 mr-2" />
      )}
      
      {children}
      
      {!loading && IconComponent && iconPosition === 'right' && (
        <IconComponent className="w-4 h-4 ml-2" />
      )}
    </button>
  );
};

export default Button;
