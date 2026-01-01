import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserBox({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
 
    navigate('/login');
  };    

  const handleViewProfile = () => {
    console.log('View Profile clicked');
    navigate('/userprofile');
  };


  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-10"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20 border border-gray-200">
        <button
          onClick={handleViewProfile}
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <User size={18} />
          <span>View Profile</span>
        </button>

        <div className="border-t my-1" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
