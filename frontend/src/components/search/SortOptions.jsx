import React from 'react';
import { ChevronDown } from 'lucide-react';

const SortOptions = ({ value, onChange, options = [] }) => {
  const defaultOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'newest', label: 'Newest First' },
    { value: 'age_asc', label: 'Age: Low to High' },
    { value: 'age_desc', label: 'Age: High to Low' },
    { value: 'last_active', label: 'Last Active' }
  ];

  const sortOptions = options.length > 0 ? options : defaultOptions;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Sort by:</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default SortOptions;
