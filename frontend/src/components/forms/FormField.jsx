import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';

const FormField = ({ 
  type = 'text', 
  field, 
  form, 
  options = [], 
  ...props 
}) => {
  const { name } = field;
  const { errors, touched } = form;
  
  const hasError = errors[name] && touched[name];
  const errorMessage = hasError ? errors[name] : '';

  const commonProps = {
    ...field,
    ...props,
    error: errorMessage
  };

  switch (type) {
    case 'select':
      return <Select {...commonProps} options={options} />;
    
    case 'textarea':
      return <Textarea {...commonProps} />;
    
    case 'number':
      return <Input {...commonProps} type="number" />;
    
    case 'email':
      return <Input {...commonProps} type="email" />;
    
    case 'tel':
      return <Input {...commonProps} type="tel" />;
    
    case 'date':
      return <Input {...commonProps} type="date" />;
    
    default:
      return <Input {...commonProps} type="text" />;
  }
};

export default FormField;
