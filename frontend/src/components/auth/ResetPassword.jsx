import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { validationRules, validateField } from '../../utils/validators';

const ResetPassword = ({ onSubmit, loading = false, success = false }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        token,
        password: formData.password
      });
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset Successfully</h2>
        
        <p className="text-gray-600 mb-6">
          Your password has been successfully reset. You can now sign in with your new password.
        </p>
        
        <Button onClick={() => navigate('/login')}>
          Continue to Login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-600">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={Lock}
            placeholder="Enter new password"
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
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={Lock}
          placeholder="Confirm new password"
          required
        />

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Password Requirements:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>
              • At least 8 characters long
            </li>
            <li className={/(?=.*[a-z])/.test(formData.password) ? 'text-green-600' : ''}>
              • Contains lowercase letter
            </li>
            <li className={/(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : ''}>
              • Contains uppercase letter
            </li>
            <li className={/(?=.*\d)/.test(formData.password) ? 'text-green-600' : ''}>
              • Contains number
            </li>
          </ul>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
