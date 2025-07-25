import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';

const FamilyDetails = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const familyTypeOptions = [
    { value: '', label: 'Select Family Type' },
    { value: 'joint', label: 'Joint Family' },
    { value: 'nuclear', label: 'Nuclear Family' }
  ];

  const familyStatusOptions = [
    { value: '', label: 'Select Family Status' },
    { value: 'middle_class', label: 'Middle Class' },
    { value: 'upper_middle_class', label: 'Upper Middle Class' },
    { value: 'rich', label: 'Rich' },
    { value: 'affluent', label: 'Affluent' }
  ];

  const familyValuesOptions = [
    { value: '', label: 'Select Family Values' },
    { value: 'orthodox', label: 'Orthodox' },
    { value: 'traditional', label: 'Traditional' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'liberal', label: 'Liberal' }
  ];

  const siblingOptions = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5+' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Family Type"
          value={data.familyType || ''}
          onChange={(e) => handleChange('familyType', e.target.value)}
          options={familyTypeOptions}
          required
        />

        <Select
          label="Family Status"
          value={data.familyStatus || ''}
          onChange={(e) => handleChange('familyStatus', e.target.value)}
          options={familyStatusOptions}
        />
      </div>

      <Select
        label="Family Values"
        value={data.familyValues || ''}
        onChange={(e) => handleChange('familyValues', e.target.value)}
        options={familyValuesOptions}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Father's Name"
          value={data.fatherName || ''}
          onChange={(e) => handleChange('fatherName', e.target.value)}
          placeholder="Enter father's name"
        />

        <Input
          label="Father's Occupation"
          value={data.fatherOccupation || ''}
          onChange={(e) => handleChange('fatherOccupation', e.target.value)}
          placeholder="Enter father's occupation"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Mother's Name"
          value={data.motherName || ''}
          onChange={(e) => handleChange('motherName', e.target.value)}
          placeholder="Enter mother's name"
        />

        <Input
          label="Mother's Occupation"
          value={data.motherOccupation || ''}
          onChange={(e) => handleChange('motherOccupation', e.target.value)}
          placeholder="Enter mother's occupation"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Number of Brothers"
          value={data.brothers || 0}
          onChange={(e) => handleChange('brothers', parseInt(e.target.value))}
          options={siblingOptions}
        />

        <Select
          label="Number of Sisters"
          value={data.sisters || 0}
          onChange={(e) => handleChange('sisters', parseInt(e.target.value))}
          options={siblingOptions}
        />
      </div>

      {(data.brothers > 0 || data.sisters > 0) && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-4">Sibling Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.brothers > 0 && (
              <Input
                label={`Brother${data.brothers > 1 ? 's' : ''} Details`}
                value={data.brothersDetails || ''}
                onChange={(e) => handleChange('brothersDetails', e.target.value)}
                placeholder="e.g., 1 married, 1 unmarried"
              />
            )}
            {data.sisters > 0 && (
              <Input
                label={`Sister${data.sisters > 1 ? 's' : ''} Details`}
                value={data.sistersDetails || ''}
                onChange={(e) => handleChange('sistersDetails', e.target.value)}
                placeholder="e.g., 1 married, 1 unmarried"
              />
            )}
          </div>
        </div>
      )}

      <div>
        <Input
          label="Family Location"
          value={data.familyLocation || ''}
          onChange={(e) => handleChange('familyLocation', e.target.value)}
          placeholder="Enter family's native place"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          About Family
        </label>
        <textarea
          value={data.aboutFamily || ''}
          onChange={(e) => handleChange('aboutFamily', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Tell us about your family background, values, and traditions..."
        />
        <p className="text-sm text-gray-500 mt-1">
          {(data.aboutFamily || '').length}/500 characters
        </p>
      </div>
    </div>
  );
};

export default FamilyDetails;
