import React, { useState, useEffect } from 'react';

const RangeSlider = ({ 
  label,
  min = 0,
  max = 100,
  value = [min, max],
  onChange,
  step = 1,
  formatValue = (val) => val,
  className = ''
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), localValue[1] - step);
    const newValue = [newMin, localValue[1]];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), localValue[0] + step);
    const newValue = [localValue[0], newMax];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const getPercentage = (val) => ((val - min) / (max - min)) * 100;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-4">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Track */}
        <div className="h-2 bg-gray-200 rounded-full relative">
          {/* Active range */}
          <div
            className="absolute h-2 bg-primary-600 rounded-full"
            style={{
              left: `${getPercentage(localValue[0])}%`,
              width: `${getPercentage(localValue[1]) - getPercentage(localValue[0])}%`
            }}
          />
        </div>

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
        />
      </div>

      {/* Value display */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm font-medium text-gray-700">
          {formatValue(localValue[0])}
        </div>
        <div className="text-sm text-gray-500">to</div>
        <div className="text-sm font-medium text-gray-700">
          {formatValue(localValue[1])}
        </div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default RangeSlider;
