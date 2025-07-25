import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import PersonalDetails from './PersonalDetails';
import FamilyDetails from './FamilyDetails';
import EducationDetails from './EducationDetails';
import CareerDetails from './CareerDetails';
import PreferencesForm from './PreferencesForm';

const ProfileForm = ({ 
  initialData = {}, 
  onSubmit, 
  onSave,
  loading = false 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalDetails: {},
    familyDetails: {},
    educationDetails: {},
    careerDetails: {},
    preferences: {},
    ...initialData
  });

  const steps = [
    { id: 'personal', title: 'Personal Details', component: PersonalDetails },
    { id: 'family', title: 'Family Details', component: FamilyDetails },
    { id: 'education', title: 'Education', component: EducationDetails },
    { id: 'career', title: 'Career', component: CareerDetails },
    { id: 'preferences', title: 'Preferences', component: PreferencesForm }
  ];

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleSave = () => {
    onSave(formData);
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {steps[currentStep].title}
          </h2>
          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg mx-1 transition-colors ${
                index === currentStep
                  ? 'bg-primary-100 text-primary-700'
                  : index < currentStep
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <CurrentStepComponent
          data={formData[steps[currentStep].id] || {}}
          onChange={(data) => updateFormData(steps[currentStep].id, data)}
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <div className="flex space-x-4">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                icon={ArrowLeft}
                iconPosition="left"
              >
                Previous
              </Button>
            )}
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handleSave}
              loading={loading}
              icon={Save}
            >
              Save Draft
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                icon={ArrowRight}
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                loading={loading}
              >
                Complete Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
