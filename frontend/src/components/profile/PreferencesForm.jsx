import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import RangeSlider from '../forms/RangeSlider';

const PreferencesForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

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
    { value: 'bachelor', label: "Bachelor's" },
    { value: 'master', label: "Master's" },
    { value: 'phd', label: 'PhD' }
  ];

  const occupationOptions = [
    { value: '', label: 'Any Occupation' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'business', label: 'Business' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Age Range (years)
          </label>
          <RangeSlider
            min={18}
            max={60}
            value={data.ageRange || [25, 35]}
            onChange={(value) => handleChange('ageRange', value)}
            formatValue={(val) => `${val} years`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Height Range
          </label>
          <RangeSlider
            min={48}
            max={84}
            value={data.heightRange || [60, 72]}
            onChange={(value) => handleChange('heightRange', value)}
            formatValue={(val) => `${Math.floor(val/12)}'${val%12}"`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Preferred Religion"
          value={data.religion || ''}
          onChange={(e) => handleChange('religion', e.target.value)}
          options={religionOptions}
        />

        <Select
          label="Minimum Education"
          value={data.education || ''}
          onChange={(e) => handleChange('education', e.target.value)}
          options={educationOptions}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Preferred Occupation"
          value={data.occupation || ''}
          onChange={(e) => handleChange('occupation', e.target.value)}
          options={occupationOptions}
        />

        <Input
          label="Preferred Location"
          value={data.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="City, State or Country"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          About Partner Expectations
        </label>
        <textarea
          value={data.aboutPartner || ''}
          onChange={(e) => handleChange('aboutPartner', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Describe your ideal life partner..."
        />
      </div>
    </div>
  );
};

export default PreferencesForm;
