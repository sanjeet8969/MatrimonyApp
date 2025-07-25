import React from 'react';
import { Filter, X } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import RangeSlider from '../forms/RangeSlider';
import Button from '../common/Button';

const MatchFilters = ({ 
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
    { value: 'sikh', label: 'Sikh' }
  ];

  const educationOptions = [
    { value: '', label: 'Any Education' },
    { value: 'high_school', label: 'High School' },
    { value: 'bachelor', label: "Bachelor's" },
    { value: 'master', label: "Master's" },
    { value: 'phd', label: 'PhD' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Match Filters</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Age Range
          </label>
          <RangeSlider
            min={18}
            max={60}
            value={filters.ageRange || [25, 35]}
            onChange={(value) => onChange('ageRange', value)}
            formatValue={(val) => `${val} years`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Religion"
            value={filters.religion || ''}
            onChange={(e) => onChange('religion', e.target.value)}
            options={religionOptions}
          />

          <Select
            label="Education"
            value={filters.education || ''}
            onChange={(e) => onChange('education', e.target.value)}
            options={educationOptions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Location"
            value={filters.location || ''}
            onChange={(e) => onChange('location', e.target.value)}
            placeholder="City, State"
          />

          <Input
            label="Profession"
            value={filters.profession || ''}
            onChange={(e) => onChange('profession', e.target.value)}
            placeholder="e.g., Engineer, Doctor"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Minimum Match Score: {filters.matchScore || 70}%
          </label>
          <input
            type="range"
            min="50"
            max="100"
            value={filters.matchScore || 70}
            onChange={(e) => onChange('matchScore', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
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
    </div>
  );
};

export default MatchFilters;
