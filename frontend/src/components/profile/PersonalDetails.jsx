import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import DatePicker from '../forms/DatePicker';

const PersonalDetails = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const heightOptions = [
    { value: '', label: 'Select Height' },
    { value: "4'6\"", label: "4'6\"" },
    { value: "4'7\"", label: "4'7\"" },
    { value: "4'8\"", label: "4'8\"" },
    { value: "4'9\"", label: "4'9\"" },
    { value: "4'10\"", label: "4'10\"" },
    { value: "4'11\"", label: "4'11\"" },
    { value: "5'0\"", label: "5'0\"" },
    { value: "5'1\"", label: "5'1\"" },
    { value: "5'2\"", label: "5'2\"" },
    { value: "5'3\"", label: "5'3\"" },
    { value: "5'4\"", label: "5'4\"" },
    { value: "5'5\"", label: "5'5\"" },
    { value: "5'6\"", label: "5'6\"" },
    { value: "5'7\"", label: "5'7\"" },
    { value: "5'8\"", label: "5'8\"" },
    { value: "5'9\"", label: "5'9\"" },
    { value: "5'10\"", label: "5'10\"" },
    { value: "5'11\"", label: "5'11\"" },
    { value: "6'0\"", label: "6'0\"" },
    { value: "6'1\"", label: "6'1\"" },
    { value: "6'2\"", label: "6'2\"" },
    { value: "6'3\"", label: "6'3\"" },
    { value: "6'4\"", label: "6'4\"" },
    { value: "6'5\"", label: "6'5\"" },
    { value: "6'6\"", label: "6'6\"" }
  ];

  const bodyTypeOptions = [
    { value: '', label: 'Select Body Type' },
    { value: 'slim', label: 'Slim' },
    { value: 'average', label: 'Average' },
    { value: 'athletic', label: 'Athletic' },
    { value: 'heavy', label: 'Heavy' }
  ];

  const complexionOptions = [
    { value: '', label: 'Select Complexion' },
    { value: 'very_fair', label: 'Very Fair' },
    { value: 'fair', label: 'Fair' },
    { value: 'wheatish', label: 'Wheatish' },
    { value: 'wheatish_brown', label: 'Wheatish Brown' },
    { value: 'dark', label: 'Dark' }
  ];

  const bloodGroupOptions = [
    { value: '', label: 'Select Blood Group' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          value={data.firstName || ''}
          onChange={(e) => handleChange('firstName', e.target.value)}
          placeholder="Enter first name"
          required
        />

        <Input
          label="Last Name"
          value={data.lastName || ''}
          onChange={(e) => handleChange('lastName', e.target.value)}
          placeholder="Enter last name"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DatePicker
          label="Date of Birth"
          value={data.dateOfBirth || ''}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
          required
        />

        <Select
          label="Height"
          value={data.height || ''}
          onChange={(e) => handleChange('height', e.target.value)}
          options={heightOptions}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Body Type"
          value={data.bodyType || ''}
          onChange={(e) => handleChange('bodyType', e.target.value)}
          options={bodyTypeOptions}
        />

        <Select
          label="Complexion"
          value={data.complexion || ''}
          onChange={(e) => handleChange('complexion', e.target.value)}
          options={complexionOptions}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Blood Group"
          value={data.bloodGroup || ''}
          onChange={(e) => handleChange('bloodGroup', e.target.value)}
          options={bloodGroupOptions}
        />

        <Input
          label="Weight (kg)"
          type="number"
          value={data.weight || ''}
          onChange={(e) => handleChange('weight', e.target.value)}
          placeholder="Enter weight in kg"
          min="30"
          max="200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Physical Disability (if any)
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="disability"
              value=""
              checked={!data.disability}
              onChange={(e) => handleChange('disability', e.target.value)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">None</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="disability"
              value="physical"
              checked={data.disability === 'physical'}
              onChange={(e) => handleChange('disability', e.target.value)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Physical Disability</span>
          </label>
        </div>
        
        {data.disability === 'physical' && (
          <div className="mt-4">
            <Input
              label="Please specify"
              value={data.disabilityDetails || ''}
              onChange={(e) => handleChange('disabilityDetails', e.target.value)}
              placeholder="Please provide details"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;
