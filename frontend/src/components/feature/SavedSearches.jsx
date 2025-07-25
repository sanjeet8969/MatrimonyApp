import React from 'react';
import { Search, Trash2, Edit, Play } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const SavedSearches = ({ searches = [], onRunSearch, onEditSearch, onDeleteSearch }) => {
  const formatFilters = (filters) => {
    const filterStrings = [];
    
    if (filters.ageRange?.min || filters.ageRange?.max) {
      filterStrings.push(`Age: ${filters.ageRange.min || '18'}-${filters.ageRange.max || '60'}`);
    }
    
    if (filters.location) {
      filterStrings.push(`Location: ${filters.location}`);
    }
    
    if (filters.religion) {
      filterStrings.push(`Religion: ${filters.religion}`);
    }
    
    if (filters.education) {
      filterStrings.push(`Education: ${filters.education}`);
    }
    
    return filterStrings.slice(0, 3); // Show only first 3 filters
  };

  if (searches.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Saved Searches</h3>
          <p className="text-gray-600">Save your search filters for quick access later</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Saved Searches</h2>
      
      <div className="space-y-4">
        {searches.map((search) => (
          <div key={search.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2">{search.name}</h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {formatFilters(search.filters).map((filter, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {filter}
                    </span>
                  ))}
                  {Object.keys(search.filters).length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{Object.keys(search.filters).length - 3} more filters
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-gray-500">
                  Created {new Date(search.createdAt).toLocaleDateString()}
                  {search.lastRun && (
                    <span className="ml-2">
                      • Last run {new Date(search.lastRun).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  size="sm"
                  variant="primary"
                  icon={Play}
                  onClick={() => onRunSearch(search)}
                >
                  Run
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  icon={Edit}
                  onClick={() => onEditSearch(search)}
                />
                
                <Button
                  size="sm"
                  variant="outline"
                  icon={Trash2}
                  onClick={() => onDeleteSearch(search.id)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SavedSearches;
