import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { validationRules, validateField } from '../../utils/validators';

const RegisterForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // First Name
    const firstNameError = validateField(formData.firstName, [
      validationRules.required,
      validationRules.minLength(2)
    ]);
    if (firstNameError) newErrors.firstName = firstNameError;

    // Last Name
    const lastNameError = validateField(formData.lastName, [
      validationRules.required,
      validationRules.minLength(2)
    ]);
    if (lastNameError) newErrors.lastName = lastNameError;

    // Email
    const emailError = validateField(formData.email, [
      validationRules.required,
      validationRules.email
    ]);
    if (emailError) newErrors.email = emailError;

    // Phone
    const phoneError = validateField(formData.phone, [
      validationRules.required,
      validationRules.phone
    ]);
    if (phoneError) newErrors.phone = phoneError;

    // Password
    const passwordError = validateField(formData.password, [
      validationRules.password
    ]);
    if (passwordError) newErrors.password = passwordError;

    // Confirm Password
    const confirmPasswordError = validateField(formData.confirmPassword, [
      validationRules.required,
      validationRules.confirmPassword(formData.password)
    ]);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    // Gender
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    // Terms
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          icon={User}
          placeholder="Enter first name"
          required
        />

        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          icon={User}
          placeholder="Enter last name"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
          placeholder="Enter email address"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          icon={Phone}
          placeholder="+91 XXXXX XXXXX"
          required
        />
      </div>

      <Select
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        error={errors.gender}
        options={genderOptions}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={Lock}
            placeholder="Create password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <Input
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={Lock}
          placeholder="Confirm password"
          required
        />
      </div>

      <div>
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
          />
          <span className="text-sm text-gray-600">
            I accept the{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-sm text-red-600 mt-1">{errors.acceptTerms}</p>
        )}
      </div>

      <Button
        type="submit"
        fullWidth
        loading={loading}
        disabled={loading}
      >
        Create Account
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
