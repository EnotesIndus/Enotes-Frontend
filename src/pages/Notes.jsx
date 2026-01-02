import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Search, Plus, FileDown } from 'lucide-react';
import AllNotes from '../components/AllNotes';
import FavoriteNotes from '../components/FavoriteNotes';
import RecycleBin from '../components/RecycleBin';
import CreateNoteModal from '../components/CreateNoteModal';

const Notes = () => {
  const { isLoading, isError, message } = useSelector((state) => state.notes);
  const [currentView, setCurrentView] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDownloadExcel = () => {
    // This would need to be implemented based on your requirements
    console.log('📊 Downloading Excel');
  };

  return (
    <div className="min-h-screen from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadExcel}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <FileDown size={18} />
                Export Excel
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={18} />
                New Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {isError && message && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {message}
          </div>
        )}

        {/* Navigation and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Notes
            </button>
            <button
              onClick={() => setCurrentView('favorites')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'favorites'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Favorites
            </button>
            <button
              onClick={() => setCurrentView('recycle')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'recycle'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Recycle Bin
            </button>
          </div>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Render appropriate component based on current view */}
        {currentView === 'all' && <AllNotes searchKeyword={searchKeyword} />}
        {currentView === 'favorites' && <FavoriteNotes searchKeyword={searchKeyword} />}
        {currentView === 'recycle' && <RecycleBin />}
      </div>

      {/* Create Note Modal */}
      {showCreateModal && (
        <CreateNoteModal
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default Notes;