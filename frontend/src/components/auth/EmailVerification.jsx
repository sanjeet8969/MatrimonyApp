import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';
import Button from '../common/Button';

const EmailVerification = ({ 
  email, 
  onResend, 
  onVerify,
  loading = false,
  resendLoading = false,
  verified = false 
}) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    onResend();
    setCountdown(60);
    setCanResend(false);
  };

  if (verified) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h2>
        
        <p className="text-gray-600 mb-6">
          Your email has been successfully verified. You can now access all features of your account.
        </p>
        
        <Link to="/dashboard">
          <Button>Continue to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail className="w-8 h-8 text-blue-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Verify Your Email</h2>
      
      <p className="text-gray-600 mb-2">
        We've sent a verification email to:
      </p>
      <p className="font-medium text-gray-900 mb-6">{email}</p>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          Please check your email and click the verification link to activate your account.
          Don't forget to check your spam folder!
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Didn't receive the email?
        </p>
        
        <Button
          variant="outline"
          onClick={handleResend}
          disabled={!canResend || resendLoading}
          loading={resendLoading}
          icon={RefreshCw}
          className="w-full"
        >
          {canResend 
            ? 'Resend Verification Email' 
            : `Resend in ${countdown}s`
          }
        </Button>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Need to use a different email address?
          </p>
          <Link
            to="/register"
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Create a new account
          </Link>
        </div>

        <div className="pt-4">
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
