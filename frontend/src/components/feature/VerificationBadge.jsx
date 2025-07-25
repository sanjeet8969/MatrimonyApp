import React from 'react';
import { CheckCircle, Star, Shield } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

const VerificationBadge = ({ 
  type = 'verified', 
  size = 'sm',
  showTooltip = true,
  className = '' 
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const badgeConfig = {
    verified: {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      tooltip: 'Verified Profile'
    },
    premium: {
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      tooltip: 'Premium Member'
    },
    trusted: {
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      tooltip: 'Trusted Profile'
    }
  };

  const config = badgeConfig[type] || badgeConfig.verified;
  const Icon = config.icon;

  const badge = (
    <div className={`inline-flex items-center justify-center rounded-full p-1 ${config.bgColor} ${className}`}>
      <Icon className={`${sizeClasses[size]} ${config.color} fill-current`} />
    </div>
  );

  if (showTooltip) {
    return (
      <Tooltip content={config.tooltip}>
        {badge}
      </Tooltip>
    );
  }

  return badge;
};

export default VerificationBadge;
