import React from 'react';
import { Calendar } from 'lucide-react';
import Input from '../common/Input';

const DatePicker = ({ 
  label,
  value,
  onChange,
  min,
  max,
  error,
  className = '',
  ...props 
}) => {
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className={className}>
      <Input
        type="date"
        label={label}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        error={error}
        icon={Calendar}
        {...props}
      />
      
      {value && !error && (
        <p className="text-sm text-gray-500 mt-1">
          Age: {calculateAge(value)} years
        </p>
      )}
    </div>
  );
};

export default DatePicker;
