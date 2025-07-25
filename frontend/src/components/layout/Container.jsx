import React from 'react';

const Container = ({ 
  children, 
  size = 'default', 
  className = '',
  as: Component = 'div' 
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-full',
    fluid: 'w-full'
  };

  const classes = `
    mx-auto px-4 sm:px-6 lg:px-8
    ${sizeClasses[size]}
    ${className}
  `;

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
};

export default Container;
