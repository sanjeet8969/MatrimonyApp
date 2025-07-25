import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordion = ({ 
  children, 
  className = '',
  allowMultiple = false,
  defaultOpen = []
}) => {
  const [openItems, setOpenItems] = useState(
    Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen].filter(Boolean)
  );

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={`divide-y divide-gray-200 ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (child.type !== AccordionItem) return null;
        
        const isOpen = openItems.includes(index);
        
        return React.cloneElement(child, {
          key: index,
          isOpen,
          onToggle: () => toggleItem(index)
        });
      })}
    </div>
  );
};

const AccordionItem = ({ 
  title, 
  children, 
  isOpen, 
  onToggle,
  className = '' 
}) => {
  return (
    <div className={`border border-gray-200 rounded-lg mb-2 ${className}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

Accordion.Item = AccordionItem;

export default Accordion;
