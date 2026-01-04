import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { resetPassword } from '../redux/users/userThunks';
import { resetUserState } from '../redux/users/userSlice';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user.resetPassword
  );

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  });
  const [validationError, setValidationError] = useState('');
  const [uid, setUid] = useState(null);

  useEffect(() => {
    dispatch(resetUserState());
    
    const params = new URLSearchParams(window.location.search);
    const uidParam = params.get('uid');
    
    if (uidParam) {
      setUid(parseInt(uidParam));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setFormData({ newPassword: '', confirmPassword: '' });
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    }
  }, [isSuccess]);

  useEffect(() => {
    // Clear validation error when user types
    if (validationError) {
      setValidationError('');
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const validateForm = () => {
    if (!formData.newPassword || !formData.confirmPassword) {
      setValidationError('All fields are required');
      return false;
    }
    if (formData.newPassword.length < 8) {
      setValidationError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!uid) {
      setValidationError('Invalid reset link');
      return;
    }

    if (!validateForm()) return;

    dispatch(resetPassword({
      uid: uid,
      newPassword: formData.newPassword
    }));
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  const displayMessage = validationError || (!uid ? 'Invalid reset link. User ID is missing.' : message);
  const messageType = validationError || !uid ? 'error' : isSuccess ? 'success' : isError ? 'error' : '';

  return (
    <div className="min-h-screen  from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <Lock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below
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
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none pr-10"
                placeholder="Enter new password"
                disabled={isLoading || !uid}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none pr-10"
                placeholder="Confirm new password"
                disabled={isLoading || !uid}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !uid}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Resetting Password...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium mb-2">Password Requirements:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>At least 8 characters long</li>
            <li>Should contain uppercase, lowercase, numbers and symbols</li>
            <li>Must be different from your previous password</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handleBackToLogin}
            className="text-green-600 hover:text-green-700 text-sm transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}