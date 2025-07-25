import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Button from '../common/Button';

const SearchBar = ({ 
  onSearch, 
  onFilterToggle, 
  showFilters = false,
  placeholder = "Search profiles...",
  loading = false 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <Button
        type="button"
        variant="outline"
        onClick={onFilterToggle}
        icon={Filter}
        className={showFilters ? 'bg-primary-50 border-primary-300 text-primary-700' : ''}
      >
        Filters
      </Button>
      
      <Button
        type="submit"
        loading={loading}
        disabled={loading}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
