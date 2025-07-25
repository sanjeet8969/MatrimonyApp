import React from 'react';

const Skeleton = ({ 
  width = '100%',
  height = '1rem',
  variant = 'rectangular',
  animation = 'pulse',
  className = '',
  count = 1
}) => {
  const baseClasses = 'bg-gray-200 animate-pulse';

  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded',
    rounded: 'rounded-lg'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: ''
  };

  const skeletonStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  };

  const SkeletonElement = () => (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={skeletonStyle}
    />
  );

  if (count === 1) {
    return <SkeletonElement />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonElement key={index} />
      ))}
    </div>
  );
};

// Pre-built skeleton components for common use cases
export const SkeletonText = ({ 
  lines = 3, 
  className = '',
  lastLineWidth = '60%' 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height="1rem"
        width={index === lines - 1 ? lastLineWidth : '100%'}
        variant="text"
      />
    ))}
  </div>
);

export const SkeletonAvatar = ({ 
  size = 'md',
  className = '' 
}) => {
  const sizeMap = {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '64px'
  };

  return (
    <Skeleton
      width={sizeMap[size]}
      height={sizeMap[size]}
      variant="circular"
      className={className}
    />
  );
};

export const SkeletonCard = ({ 
  hasAvatar = false,
  hasImage = false,
  lines = 3,
  className = '' 
}) => (
  <div className={`p-4 border border-gray-200 rounded-lg ${className}`}>
    {hasImage && (
      <Skeleton
        height="200px"
        className="mb-4"
        variant="rounded"
      />
    )}
    
    <div className="space-y-3">
      {hasAvatar && (
        <div className="flex items-center space-x-3">
          <SkeletonAvatar size="md" />
          <div className="flex-1">
            <Skeleton height="1rem" width="40%" className="mb-2" />
            <Skeleton height="0.875rem" width="60%" />
          </div>
        </div>
      )}
      
      <SkeletonText lines={lines} />
      
      <div className="flex space-x-2 pt-2">
        <Skeleton height="2rem" width="80px" variant="rounded" />
        <Skeleton height="2rem" width="80px" variant="rounded" />
      </div>
    </div>
  </div>
);

export const SkeletonProfileCard = ({ className = '' }) => (
  <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
    {/* Profile Image */}
    <Skeleton height="240px" variant="rectangular" />
    
    <div className="p-4">
      {/* Name and basic info */}
      <div className="mb-3">
        <Skeleton height="1.25rem" width="70%" className="mb-2" />
        <Skeleton height="1rem" width="50%" />
      </div>
      
      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <Skeleton width="16px" height="16px" variant="rectangular" />
          <Skeleton height="0.875rem" width="60%" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton width="16px" height="16px" variant="rectangular" />
          <Skeleton height="0.875rem" width="70%" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton width="16px" height="16px" variant="rectangular" />
          <Skeleton height="0.875rem" width="50%" />
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-2">
        <Skeleton height="2.5rem" className="flex-1" variant="rounded" />
        <Skeleton height="2.5rem" className="flex-1" variant="rounded" />
      </div>
    </div>
  </div>
);

export const SkeletonTable = ({ 
  rows = 5, 
  columns = 4,
  className = '' 
}) => (
  <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
    {/* Table Header */}
    <div className="bg-gray-50 p-4 border-b border-gray-200">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} height="1rem" width="80%" />
        ))}
      </div>
    </div>
    
    {/* Table Rows */}
    <div className="divide-y divide-gray-200">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} height="1rem" width="90%" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonList = ({ 
  items = 5,
  hasAvatar = true,
  className = '' 
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-start space-x-3 p-3">
        {hasAvatar && <SkeletonAvatar size="md" />}
        <div className="flex-1 space-y-2">
          <Skeleton height="1rem" width="40%" />
          <Skeleton height="0.875rem" width="80%" />
          <Skeleton height="0.875rem" width="60%" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonForm = ({ 
  fields = 5,
  className = '' 
}) => (
  <div className={`space-y-6 ${className}`}>
    {Array.from({ length: fields }).map((_, index) => (
      <div key={index}>
        <Skeleton height="1rem" width="30%" className="mb-2" />
        <Skeleton height="2.5rem" width="100%" variant="rounded" />
      </div>
    ))}
    
    <div className="flex space-x-4 pt-4">
      <Skeleton height="2.5rem" width="100px" variant="rounded" />
      <Skeleton height="2.5rem" width="100px" variant="rounded" />
    </div>
  </div>
);

// Wave animation keyframes (add to your CSS)
const waveKeyframes = `
  @keyframes wave {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  
  .animate-wave {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: wave 1.5s infinite;
  }
`;

// Export the keyframes for use in your CSS
export { waveKeyframes };

export default Skeleton;
