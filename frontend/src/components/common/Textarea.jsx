import React, { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  helperText,
  rows = 4,
  maxLength,
  showCharCount = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const currentLength = props.value ? props.value.length : 0;

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        maxLength={maxLength}
        className={`
          block w-full px-3 py-2 border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-primary-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-500
          resize-y
          ${error ? 'border-red-300 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      
      <div className="flex justify-between items-center">
        <div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          
          {helperText && !error && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}
        </div>
        
        {(showCharCount || maxLength) && (
          <p className="text-sm text-gray-500">
            {currentLength}{maxLength && `/${maxLength}`}
          </p>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
