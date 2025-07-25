import React from 'react';

const Progress = ({ 
  value = 0, 
  max = 100, 
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label = '',
  className = '',
  animated = false,
  striped = false
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    xs: 'h-1',
    sm: 'h-2', 
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  };

  const variantClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
    info: 'bg-blue-600'
  };

  const bgVariantClasses = {
    primary: 'bg-primary-100',
    secondary: 'bg-gray-200',
    success: 'bg-green-100',
    warning: 'bg-yellow-100',
    danger: 'bg-red-100',
    info: 'bg-blue-100'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={`w-full ${bgVariantClasses[variant]} rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full transition-all duration-300 ease-out ${variantClasses[variant]} ${
            striped ? 'bg-stripes' : ''
          } ${animated ? 'animate-pulse' : ''}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

// Circular Progress Component
export const CircularProgress = ({ 
  value = 0, 
  max = 100, 
  size = 'md',
  variant = 'primary',
  showLabel = false,
  strokeWidth = 4,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeMap = {
    xs: 32,
    sm: 40,
    md: 48,
    lg: 64,
    xl: 80
  };

  const radius = (sizeMap[size] - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    info: 'text-blue-600'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={sizeMap[size]}
        height={sizeMap[size]}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={sizeMap[size] / 2}
          cy={sizeMap[size] / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        
        {/* Progress circle */}
        <circle
          cx={sizeMap[size] / 2}
          cy={sizeMap[size] / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-300 ${colorClasses[variant]}`}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-semibold ${colorClasses[variant]}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

// Progress with steps
export const StepProgress = ({ 
  steps = [], 
  currentStep = 0, 
  variant = 'primary',
  className = '' 
}) => {
  const variantClasses = {
    primary: {
      active: 'bg-primary-600 border-primary-600 text-white',
      completed: 'bg-primary-600 border-primary-600 text-white',
      pending: 'bg-white border-gray-300 text-gray-500',
      line: 'bg-primary-600'
    },
    success: {
      active: 'bg-green-600 border-green-600 text-white',
      completed: 'bg-green-600 border-green-600 text-white',
      pending: 'bg-white border-gray-300 text-gray-500',
      line: 'bg-green-600'
    }
  };

  const colors = variantClasses[variant];

  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isPending = index > currentStep;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors ${
                  isCompleted
                    ? colors.completed
                    : isActive
                    ? colors.active
                    : colors.pending
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span className="text-xs text-gray-600 mt-2 text-center max-w-16">
                {step.label || step}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-0.5 bg-gray-300 relative">
                <div
                  className={`h-full transition-all duration-300 ${
                    isCompleted ? colors.line : 'bg-gray-300'
                  }`}
                  style={{
                    width: isCompleted ? '100%' : '0%'
                  }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Progress;
