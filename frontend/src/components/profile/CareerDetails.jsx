import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';

const CareerDetails = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const workingWithOptions = [
    { value: '', label: 'Select Working With' },
    { value: 'private_company', label: 'Private Company' },
    { value: 'government', label: 'Government/Public Sector' },
    { value: 'self_employed', label: 'Self Employed' },
    { value: 'business', label: 'Business/Entrepreneur' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'not_working', label: 'Not Working' }
  ];

  const incomeOptions = [
    { value: '', label: 'Select Annual Income' },
    { value: 'no_income', label: 'No Income' },
    { value: '0-2', label: 'Less than ₹2 Lakhs' },
    { value: '2-5', label: '₹2-5 Lakhs' },
    { value: '5-10', label: '₹5-10 Lakhs' },
    { value: '10-15', label: '₹10-15 Lakhs' },
    { value: '15-25', label: '₹15-25 Lakhs' },
    { value: '25-50', label: '₹25-50 Lakhs' },
    { value: '50-75', label: '₹50-75 Lakhs' },
    { value: '75-100', label: '₹75 Lakhs - 1 Crore' },
    { value: '100+', label: 'Above ₹1 Crore' }
  ];

  const experienceOptions = [
    { value: '', label: 'Select Experience' },
    { value: 'fresher', label: 'Fresher' },
    { value: '0-1', label: '0-1 Years' },
    { value: '1-3', label: '1-3 Years' },
    { value: '3-5', label: '3-5 Years' },
    { value: '5-10', label: '5-10 Years' },
    { value: '10-15', label: '10-15 Years' },
    { value: '15+', label: '15+ Years' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Working With"
          value={data.workingWith || ''}
          onChange={(e) => handleChange('workingWith', e.target.value)}
          options={workingWithOptions}
          required
        />

        <Input
          label="Designation/Job Title"
          value={data.designation || ''}
          onChange={(e) => handleChange('designation', e.target.value)}
          placeholder="e.g., Software Engineer, Doctor"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Company Name"
          value={data.companyName || ''}
          onChange={(e) => handleChange('companyName', e.target.value)}
          placeholder="Enter company/organization name"
        />

        <Select
          label="Work Experience"
          value={data.experience || ''}
          onChange={(e) => handleChange('experience', e.target.value)}
          options={experienceOptions}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Annual Income"
          value={data.annualIncome || ''}
          onChange={(e) => handleChange('annualIncome', e.target.value)}
          options={incomeOptions}
        />

        <Input
          label="Work Location"
          value={data.workLocation || ''}
          onChange={(e) => handleChange('workLocation', e.target.value)}
          placeholder="e.g., Mumbai, Remote"
        />
      </div>

      {/* Industry and Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Industry"
          value={data.industry || ''}
          onChange={(e) => handleChange('industry', e.target.value)}
          placeholder="e.g., IT, Healthcare, Finance"
        />

        <Input
          label="Key Skills"
          value={data.keySkills || ''}
          onChange={(e) => handleChange('keySkills', e.target.value)}
          placeholder="e.g., Java, Marketing, Surgery"
        />
      </div>

      {/* Business Details (if applicable) */}
      {(data.workingWith === 'business' || data.workingWith === 'self_employed') && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Business Details</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Business Name"
              value={data.businessName || ''}
              onChange={(e) => handleChange('businessName', e.target.value)}
              placeholder="Enter business name"
            />

            <Input
              label="Business Type"
              value={data.businessType || ''}
              onChange={(e) => handleChange('businessType', e.target.value)}
              placeholder="e.g., Manufacturing, Retail, Services"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Your Business
            </label>
            <textarea
              value={data.businessDescription || ''}
              onChange={(e) => handleChange('businessDescription', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of your business..."
            />
          </div>
        </div>
      )}

      {/* Career Goals */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Career Information</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Your Career
            </label>
            <textarea
              value={data.careerDescription || ''}
              onChange={(e) => handleChange('careerDescription', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Tell us about your career journey, achievements, and future goals..."
            />
            <p className="text-sm text-gray-500 mt-1">
              {(data.careerDescription || '').length}/500 characters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Willing to Relocate for Work?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="relocateForWork"
                    value="yes"
                    checked={data.relocateForWork === 'yes'}
                    onChange={(e) => handleChange('relocateForWork', e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="relocateForWork"
                    value="no"
                    checked={data.relocateForWork === 'no'}
                    onChange={(e) => handleChange('relocateForWork', e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Travel Required for Work?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="travelRequired"
                    value="frequent"
                    checked={data.travelRequired === 'frequent'}
                    onChange={(e) => handleChange('travelRequired', e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Frequent Travel</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="travelRequired"
                    value="occasional"
                    checked={data.travelRequired === 'occasional'}
                    onChange={(e) => handleChange('travelRequired', e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Occasional Travel</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="travelRequired"
                    value="no"
                    checked={data.travelRequired === 'no'}
                    onChange={(e) => handleChange('travelRequired', e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No Travel</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;
