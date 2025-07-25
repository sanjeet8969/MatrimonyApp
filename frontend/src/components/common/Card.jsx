import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'default',
  shadow = 'sm',
  rounded = 'lg'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  };

  const classes = `
    bg-white border border-gray-200 
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${roundedClasses[rounded]}
    ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
    ${className}
  `;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;
