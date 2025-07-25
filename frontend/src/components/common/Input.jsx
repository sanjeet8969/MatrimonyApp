import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const IconComponent = icon;

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {IconComponent && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconComponent className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            block w-full px-3 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500
            ${IconComponent && iconPosition === 'left' ? 'pl-10' : ''}
            ${IconComponent && iconPosition === 'right' ? 'pr-10' : ''}
            ${error ? 'border-red-300 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        
        {IconComponent && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <IconComponent className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
