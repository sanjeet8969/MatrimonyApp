import React, { useState } from 'react';
import { Heart, Check, Clock } from 'lucide-react';
import Button from '../common/Button';

const InterestButton = ({ 
  profileId, 
  status = 'none', // 'none', 'sent', 'accepted', 'declined'
  onSendInterest,
  disabled = false,
  size = 'md',
  showText = true 
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (status !== 'none' || disabled || loading) return;
    
    setLoading(true);
    try {
      await onSendInterest(profileId);
    } finally {
      setLoading(false);
    }
  };

  const getButtonProps = () => {
    switch (status) {
      case 'sent':
        return {
          variant: 'outline',
          icon: Clock,
          text: 'Interest Sent',
          className: 'bg-yellow-50 border-yellow-300 text-yellow-700',
          disabled: true
        };
      case 'accepted':
        return {
          variant: 'outline',
          icon: Check,
          text: 'Interest Accepted',
          className: 'bg-green-50 border-green-300 text-green-700',
          disabled: true
        };
      case 'declined':
        return {
          variant: 'outline',
          icon: Heart,
          text: 'Interest Declined',
          className: 'bg-gray-50 border-gray-300 text-gray-500',
          disabled: true
        };
      default:
        return {
          variant: 'primary',
          icon: Heart,
          text: 'Send Interest',
          className: '',
          disabled: false
        };
    }
  };

  const buttonProps = getButtonProps();

  return (
    <Button
      size={size}
      variant={buttonProps.variant}
      icon={buttonProps.icon}
      onClick={handleClick}
      disabled={buttonProps.disabled || disabled || loading}
      loading={loading}
      className={buttonProps.className}
    >
      {showText && buttonProps.text}
    </Button>
  );
};

export default InterestButton;
