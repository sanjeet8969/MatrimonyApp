import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';

const EducationDetails = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const educationOptions = [
    { value: '', label: 'Select Highest Qualification' },
    { value: 'high_school', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor', label: "Bachelor's Degree" },
    { value: 'master', label: "Master's Degree" },
    { value: 'phd', label: 'PhD/Doctorate' },
    { value: 'professional', label: 'Professional Degree' },
    { value: 'other', label: 'Other' }
  ];

  const fieldOfStudyOptions = [
    { value: '', label: 'Select Field of Study' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'arts', label: 'Arts' },
    { value: 'science', label: 'Science' },
    { value: 'law', label: 'Law' },
    { value: 'management', label: 'Management' },
    { value: 'computers', label: 'Computers' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Highest Qualification"
          value={data.highestQualification || ''}
          onChange={(e) => handleChange('highestQualification', e.target.value)}
          options={educationOptions}
          required
        />

        <Select
          label="Field of Study"
          value={data.fieldOfStudy || ''}
          onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
          options={fieldOfStudyOptions}
        />
      </div>

      {data.fieldOfStudy === 'other' && (
        <Input
          label="Please specify field of study"
          value={data.customFieldOfStudy || ''}
          onChange={(e) => handleChange('customFieldOfStudy', e.target.value)}
          placeholder="Enter your field of study"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="College/University Name"
          value={data.college || ''}
          onChange={(e) => handleChange('college', e.target.value)}
          placeholder="Enter college/university name"
        />

        <Input
          label="Graduation Year"
          type="number"
          value={data.graduationYear || ''}
          onChange={(e) => handleChange('graduationYear', e.target.value)}
          placeholder="YYYY"
          min="1980"
          max={new Date().getFullYear()}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Specialization"
          value={data.specialization || ''}
          onChange={(e) => handleChange('specialization', e.target.value)}
          placeholder="e.g., Computer Science, Cardiology"
        />

        <Input
          label="Grade/Percentage"
          value={data.grade || ''}
          onChange={(e) => handleChange('grade', e.target.value)}
          placeholder="e.g., A+, 85%, First Class"
        />
      </div>

      {/* Additional Qualifications */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Additional Qualifications</h4>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Post Graduate Qualification"
              value={data.postGraduation || ''}
              onChange={(e) => handleChange('postGraduation', e.target.value)}
              placeholder="e.g., MBA, M.Tech, MD"
            />

            <Input
              label="Post Graduate College"
              value={data.postGraduationCollege || ''}
              onChange={(e) => handleChange('postGraduationCollege', e.target.value)}
              placeholder="Enter college/university name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Professional Certifications"
              value={data.certifications || ''}
              onChange={(e) => handleChange('certifications', e.target.value)}
              placeholder="e.g., CPA, PMP, AWS Certified"
            />

            <Input
              label="Additional Skills"
              value={data.skills || ''}
              onChange={(e) => handleChange('skills', e.target.value)}
              placeholder="e.g., Python, Digital Marketing"
            />
          </div>
        </div>
      </div>

      {/* Current Education Status */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Current Status</h4>
        
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="currentStatus"
              value="completed"
              checked={data.currentStatus === 'completed' || !data.currentStatus}
              onChange={(e) => handleChange('currentStatus', e.target.value)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Education Completed</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="currentStatus"
              value="pursuing"
              checked={data.currentStatus === 'pursuing'}
              onChange={(e) => handleChange('currentStatus', e.target.value)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Currently Pursuing</span>
          </label>
        </div>

        {data.currentStatus === 'pursuing' && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Course Currently Pursuing"
              value={data.currentCourse || ''}
              onChange={(e) => handleChange('currentCourse', e.target.value)}
              placeholder="e.g., MBA, M.Tech"
            />

            <Input
              label="Expected Completion Year"
              type="number"
              value={data.expectedCompletion || ''}
              onChange={(e) => handleChange('expectedCompletion', e.target.value)}
              placeholder="YYYY"
              min={new Date().getFullYear()}
              max={new Date().getFullYear() + 10}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationDetails;
