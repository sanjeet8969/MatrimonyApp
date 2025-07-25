import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const Alert = ({ 
  type = 'info', 
  title, 
  children, 
  onClose,
  className = '' 
}) => {
  const config = {
    success: {
      icon: CheckCircle,
      classes: 'bg-green-50 border-green-200 text-green-800',
      iconColor: 'text-green-400'
    },
    error: {
      icon: AlertCircle,
      classes: 'bg-red-50 border-red-200 text-red-800',
      iconColor: 'text-red-400'
    },
    warning: {
      icon: AlertTriangle,
      classes: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      iconColor: 'text-yellow-400'
    },
    info: {
      icon: Info,
      classes: 'bg-blue-50 border-blue-200 text-blue-800',
      iconColor: 'text-blue-400'
    }
  };

  const { icon: Icon, classes, iconColor } = config[type];

  return (
    <div className={`border rounded-lg p-4 ${classes} ${className}`}>
      <div className="flex">
        <Icon className={`w-5 h-5 mt-0.5 ${iconColor}`} />
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 ${iconColor} hover:bg-black hover:bg-opacity-10`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
