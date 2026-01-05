import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Lock, Mail, Shield, ChevronRight } from 'lucide-react';
import ChangePassword from '../components/ChangePassword';
import ForgotPassword from '../components/ForgotPassword';
import EditProfileModal from "../components/EditProfileModal";
import { editUser } from "../redux/users/userThunks";

const UserProfile = () => {
  // Get user from Redux store instead of localStorage
  const storedUser = useSelector((state) => state.user?.currentUser);
  
  // Initialize state from Redux or localStorage as fallback
  const [user, setUser] = useState(() => {
    return storedUser || JSON.parse(localStorage.getItem("user") || 'null');
  });
  
  const [activeSection, setActiveSection] = useState('profile');

  // Sync with Redux store when it changes
  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
    }
  }, [storedUser]);

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileInfo user={user} setUser={setUser} />;
      case 'change-password':
        return <ChangePassword />;
      case 'forgot-password':
        return <ForgotPassword />;
      default:
        return <ProfileInfo user={user} setUser={setUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Sidebar Navigation */}
            <div className="md:w-64 bg-gray-800 text-white p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-600 p-2 rounded-full">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-semibold">My Profile</h2>
                  <p className="text-xs text-gray-400">Manage your account</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeSection === 'profile'
                      ? 'text-blue-300 hover:bg-gray-700'
                      : 'bg-indigo-600 text-black'
                      
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">Profile Info</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveSection('change-password')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeSection === 'change-password'
                      ? 'text-green-500 hover:bg-gray-700'
                      : 'bg-indigo-600 text-black'
                      
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5" />
                    <span className="text-sm font-medium">Change Password</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveSection('forgot-password')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeSection === 'forgot-password'
                      ? 'text-red-600 hover:bg-gray-700'
                      : 'bg-indigo-600 text-black'
                      
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm font-medium">Reset Password</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-2">Account Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Active</span>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 md:p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => {
  return (
    <div className="bg-gray-50 p-5 rounded-lg flex items-start gap-4">
      <div className="text-indigo-600">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-gray-900 mt-1">{value || "—"}</p>
      </div>
    </div>
  );
};

const ProfileInfo = ({ user, setUser }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSave = async (updatedUser) => {
    try {
      setError(null);
      const result = await dispatch(editUser(updatedUser));

      if (editUser.fulfilled.match(result)) {
        const updatedLocalUser = {
          ...user,
          ...updatedUser
        };

        // Update local state (triggers re-render)
        setUser(updatedLocalUser);

        // Keep localStorage in sync
        localStorage.setItem("user", JSON.stringify(updatedLocalUser));

        setOpenEdit(false);
      } else if (editUser.rejected.match(result)) {
        setError(result.payload || "Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      setError(error.message || "An unexpected error occurred");
    }
  };

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Profile Information
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage your personal details
          </p>
        </div>

        <button
          onClick={() => setOpenEdit(true)}
          className="px-5 py-2.5 rounded-lg bg-indigo-600  text-sm font-medium hover:bg-indigo-700 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-8 pb-8 border-b">
          <div className="w-28 h-28 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="w-14 h-14 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {fullName || "User"}
            </h2>
            <p className="text-gray-600 mt-1">{user?.email}</p>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                Active Account
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                {user?.role?.[0]?.role}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <InfoCard icon={<Mail />} label="Email Address" value={user?.email} />
          <InfoCard icon={<User />} label="Mobile Number" value={user?.mobileNo} />
          <InfoCard
            icon={<Shield />}
            label="Account Status"
            value={user?.accountStatus?.isActive ? "Active" : "Inactive"}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      <EditProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        user={user}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserProfile;