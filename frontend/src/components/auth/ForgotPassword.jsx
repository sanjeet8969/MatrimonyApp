import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { validationRules, validateField } from '../../utils/validators';

const ForgotPassword = ({ onSubmit, loading = false, emailSent = false }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const validateForm = () => {
    const emailError = validateField(email, [
      validationRules.required,
      validationRules.email
    ]);
    
    if (emailError) {
      setError(emailError);
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ email });
    }
  };

  if (emailSent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h2>
        
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => onSubmit({ email })}
              disabled={loading}
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              resend it
            </button>
          </p>
          
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to login</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
        <p className="text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={handleChange}
          error={error}
          icon={Mail}
          placeholder="Enter your email address"
          required
        />

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Send Reset Link
        </Button>

        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
