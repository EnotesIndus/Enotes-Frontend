import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { changePassword } from '../redux/users/userThunks';
import { resetUserState } from '../redux/users/userSlice';

export default function ChangePassword() {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      
      // Reset state after 3 seconds
      const timer = setTimeout(() => {
        dispatch(resetUserState());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    // Reset validation error when user starts typing
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
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setValidationError('All fields are required');
      return false;
    }
    if (formData.newPassword.length < 8) {
      setValidationError('New password must be at least 8 characters long');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError('New passwords do not match');
      return false;
    }
    if (formData.oldPassword === formData.newPassword) {
      setValidationError('New password must be different from old password');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    dispatch(resetUserState());
    dispatch(changePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword
    }));
  };

  const displayMessage = validationError || message;
  const messageType = validationError ? 'error' : isSuccess ? 'success' : isError ? 'error' : '';

  return (
    <div className="min-h-screen  from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Change Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your current password and choose a new one
        </p>

        {displayMessage && (
          <div className={`mb-4 p-4 rounded-lg flex items-start gap-3 ${
            messageType === 'success' 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}>
            {messageType === 'success' ? (
              <CheckCircle className="w-5 h-5   mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5  mt-0.5" />
            )}
            <span className="text-sm">{displayMessage}</span>
          </div>
        )}

        <div onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.old ? 'text' : 'password'}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none pr-10"
                placeholder="Enter current password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('old')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.old ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none pr-10"
                placeholder="Enter new password"
                disabled={isLoading}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none pr-10"
                placeholder="Confirm new password"
                disabled={isLoading}
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
            disabled={isLoading}
            className="w-full bg-indigo-600  py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Changing Password...
              </>
            ) : (
              'Change Password'
            )}
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium mb-2">Password Requirements:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>At least 8 characters long</li>
            <li>Different from your current password</li>
            <li>Should contain uppercase, lowercase, numbers and symbols</li>
          </ul>
        </div>
      </div>
    </div>
  );
}