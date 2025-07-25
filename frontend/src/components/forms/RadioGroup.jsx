import React from 'react';

const RadioGroup = ({ 
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  direction = 'vertical',
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}

      <div className={`${
        direction === 'horizontal' 
          ? 'flex flex-wrap gap-6' 
          : 'space-y-3'
      }`}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 rounded-full transition-all ${
                value === option.value
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-gray-300 group-hover:border-primary-400'
              }`}>
                {value === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1.5 left-1.5" />
                )}
              </div>
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              {option.label}
            </span>
            {option.description && (
              <span className="text-xs text-gray-500">
                {option.description}
              </span>
            )}
          </label>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
};

export default RadioGroup;
