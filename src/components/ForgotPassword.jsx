import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { sendResetPasswordMail } from '../redux/users/userThunks';
import { resetUserState } from '../redux/users/userSlice';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user.sendMail
  );

  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    // Clear state when component mounts
    dispatch(resetUserState());
  }, [dispatch]);

  useEffect(() => {
    // Clear validation error when user types
    if (validationError) {
      setValidationError('');
    }
  }, [email]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setValidationError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    dispatch(sendResetPasswordMail(email));
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  const displayMessage = validationError || message;
  const messageType = validationError ? 'error' : isSuccess ? 'success' : isError ? 'error' : '';

  return (
    <div className="min-h-screen   from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-purple-100 p-3 rounded-full">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your password
        </p>

        {displayMessage && (
          <div className={`mb-4 p-4 rounded-lg flex items-start gap-3 ${
            messageType === 'success' 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}>
            {messageType === 'success' ? (
              <CheckCircle className="w-5 h-5  mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5  mt-0.5" />
            )}
            <span className="text-sm">{displayMessage}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-purple-600   py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending Email...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>

          <button
            type="button"
            onClick={handleBackToLogin}
            className="w-full flex items-center justify-center gap-2 text-purple-600 hover:text-purple-700 py-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> If you don't receive an email within a few minutes, please check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}