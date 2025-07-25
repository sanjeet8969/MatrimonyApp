import React from 'react';
import { X } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const FilterPanel = ({ 
  filters, 
  onChange, 
  onApply, 
  onReset, 
  onClose, 
  isOpen 
}) => {
  if (!isOpen) return null;

  const religionOptions = [
    { value: '', label: 'Any Religion' },
    { value: 'hindu', label: 'Hindu' },
    { value: 'muslim', label: 'Muslim' },
    { value: 'christian', label: 'Christian' },
    { value: 'sikh', label: 'Sikh' },
    { value: 'buddhist', label: 'Buddhist' },
    { value: 'jain', label: 'Jain' }
  ];

  const educationOptions = [
    { value: '', label: 'Any Education' },
    { value: 'high_school', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelors', label: "Bachelor's" },
    { value: 'masters', label: "Master's" },
    { value: 'phd', label: 'PhD' }
  ];

  const handleRangeChange = (rangeType, field, value) => {
    onChange(rangeType, {
      ...filters[rangeType],
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Search Filters</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.ageRange?.min || ''}
              onChange={(e) => handleRangeChange('ageRange', 'min', e.target.value)}
              min={18}
              max={100}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.ageRange?.max || ''}
              onChange={(e) => handleRangeChange('ageRange', 'max', e.target.value)}
              min={18}
              max={100}
            />
          </div>
        </div>

        {/* Height Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min Height"
              value={filters.heightRange?.min || ''}
              onChange={(e) => handleRangeChange('heightRange', 'min', e.target.value)}
            />
            <Input
              placeholder="Max Height"
              value={filters.heightRange?.max || ''}
              onChange={(e) => handleRangeChange('heightRange', 'max', e.target.value)}
            />
          </div>
        </div>

        {/* Religion */}
        <Select
          label="Religion"
          value={filters.religion || ''}
          onChange={(e) => onChange('religion', e.target.value)}
          options={religionOptions}
        />

        {/* Location */}
        <Input
          label="Location"
          placeholder="City, State"
          value={filters.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
        />

        {/* Education */}
        <Select
          label="Education"
          value={filters.education || ''}
          onChange={(e) => onChange('education', e.target.value)}
          options={educationOptions}
        />

        {/* Occupation */}
        <Input
          label="Occupation"
          placeholder="e.g., Software Engineer"
          value={filters.occupation || ''}
          onChange={(e) => onChange('occupation', e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <Button
          variant="outline"
          onClick={onReset}
        >
          Reset Filters
        </Button>
        <Button
          onClick={onApply}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
