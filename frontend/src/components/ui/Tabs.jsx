import React, { useState } from 'react';

const Tabs = ({ 
  children, 
  defaultTab = 0, 
  className = '',
  variant = 'default',
  size = 'md' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const variantClasses = {
    default: 'border-b border-gray-200',
    pills: 'bg-gray-100 p-1 rounded-lg',
    underline: ''
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={className}>
      <div className={`${variantClasses[variant]} ${sizeClasses[size]}`}>
        <nav className={`flex ${variant === 'pills' ? 'space-x-1' : 'space-x-8'}`}>
          {React.Children.map(children, (child, index) => {
            if (child.type !== TabPanel) return null;
            
            const isActive = activeTab === index;
            
            if (variant === 'pills') {
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive 
                      ? 'bg-white text-primary-700 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {child.props.label}
                </button>
              );
            }

            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                  isActive
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {child.props.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-6">
        {React.Children.map(children, (child, index) => {
          if (child.type !== TabPanel) return null;
          return activeTab === index ? child : null;
        })}
      </div>
    </div>
  );
};

const TabPanel = ({ children, label }) => {
  return <div>{children}</div>;
};

Tabs.Panel = TabPanel;

export default Tabs;
