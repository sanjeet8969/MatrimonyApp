import React from 'react';
import { Check } from 'lucide-react';

const CheckboxGroup = ({ 
  label,
  options = [],
  value = [],
  onChange,
  error,
  direction = 'vertical',
  showSelectAll = false,
  className = ''
}) => {
  const handleToggle = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleSelectAll = () => {
    if (value.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map(option => option.value));
    }
  };

  const isAllSelected = value.length === options.length && options.length > 0;

  return (
    <div className={className}>
      {label && (
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {showSelectAll && options.length > 0 && (
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </button>
          )}
        </div>
      )}

      <div className={`${
        direction === 'horizontal' 
          ? 'flex flex-wrap gap-4' 
          : 'space-y-3'
      }`}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => handleToggle(option.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 rounded transition-all ${
                value.includes(option.value)
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-gray-300 group-hover:border-primary-400'
              }`}>
                {value.includes(option.value) && (
                  <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                )}
              </div>
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
};

export default CheckboxGroup;
