import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Star, Trash2, Download, Copy, RotateCcw, FileDown, X } from 'lucide-react';
import {
  fetchUserNotes,
  searchNotes,
  saveNote as createNote,
  deleteNote,
  restoreNote,
  deleteNoteFromRecycle,
  deleteAllFromRecycle,
  toggleFavorite,
  fetchAllFavorites,
  fetchRecycleNotes,
  copyNote,
  downloadExcel,
  downloadFile,
} from '../redux/notes/noteThunks';
import { resetNotesState } from '../redux/notes/noteSlice';

const Notes = () => {
  const dispatch = useDispatch();
  
  // DEBUG: Log the entire notes state
  const notesState = useSelector((state) => state.notes);
  console.log('🔍 Full Notes State:', notesState);
  
  const { notes, recycleNotes, favoriteNotes, isLoading, isError, message,pagination  } = notesState;

  const [currentView, setCurrentView] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', description: '', file: null });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 9;
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch notes based on current view
  useEffect(() => {
    console.log('📥 Fetching notes for view:', currentView);
    
    if (currentView === 'all') {
      dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }))
        .then((result) => {
          console.log('✅ Fetch User Notes Result:', result);
        })
        .catch((error) => {
          console.error('❌ Fetch User Notes Error:', error);
        });
    } else if (currentView === 'favorites') {
      dispatch(fetchAllFavorites())
        .then((result) => {
          console.log('✅ Fetch Favorites Result:', result);
        });
    } else if (currentView === 'recycle') {
      dispatch(fetchRecycleNotes())
        .then((result) => {
          console.log('✅ Fetch Recycle Result:', result);
        });
    }

    // Don't cleanup on every render - only on unmount
    return () => {
      // dispatch(resetNotesState());
    };
  }, [dispatch, currentView, currentPage]);

  // Handle search
  useEffect(() => {
    if (searchKeyword.trim() !== '') {
      const debounceTimer = setTimeout(() => {
        console.log('🔍 Searching for:', searchKeyword);
        dispatch(searchNotes({ pageNo: 0, pageSize, keyword: searchKeyword }))
          .then((result) => {
            console.log('✅ Search Result:', result);
          });
      }, 500);

      return () => clearTimeout(debounceTimer);
    } else if (currentView === 'all' && searchKeyword === '') {
      dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
    }
  }, [searchKeyword, dispatch, currentPage, currentView]);

  // Get the appropriate notes list based on current view
  const getDisplayNotes = () => {
    console.log('📊 Getting display notes for view:', currentView);
    console.log('Notes:', notes);
    console.log('Recycle Notes:', recycleNotes);
    console.log('Favorite Notes:', favoriteNotes);
    
    if (currentView === 'recycle') {
      return Array.isArray(recycleNotes) ? recycleNotes : [];
    }
    if (currentView === 'favorites') {
      return Array.isArray(favoriteNotes) ? favoriteNotes : [];
    }
    return Array.isArray(notes) ? notes : [];
  };

  const filteredNotes = getDisplayNotes();
  console.log('📋 Filtered Notes to Display:', filteredNotes);

  const handleCreateNote = async () => {
    if (newNote.title.trim() === '') return;

    const noteData = {
      title: newNote.title,
      description: newNote.description,
      category: {
        id: 8
      }
    };

    console.log('💾 Creating note:', noteData);

    await dispatch(createNote({ noteData, file: newNote.file }))
      .then((result) => {
        console.log('✅ Create Note Result:', result);
      })
      .catch((error) => {
        console.error('❌ Create Note Error:', error);
      });
    
    // Refresh the notes list
    dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
    
    setNewNote({ title: '', description: '', file: null });
    setShowCreateModal(false);
  };

  const handleToggleFavorite = async (note) => {
    console.log('⭐ Toggling favorite for note:', note);
    
    await dispatch(toggleFavorite({
      notesId: note.id,
      isFavorite: note.isFavorite,
      favnotesId: note.favId,
    }));
    
    // Refresh based on current view
    if (currentView === 'favorites') {
      dispatch(fetchAllFavorites());
    } else {
      dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
    }
  };

  const handleDeleteNote = async (id) => {
    console.log('🗑️ Deleting note:', id);
    await dispatch(deleteNote(id));
    dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
  };

  const handleRestoreNote = async (id) => {
    console.log('♻️ Restoring note:', id);
    await dispatch(restoreNote(id));
    dispatch(fetchRecycleNotes());
  };

  const handlePermanentlyDelete = async (id) => {
    console.log('❌ Permanently deleting note:', id);
    await dispatch(deleteNoteFromRecycle(id));
    dispatch(fetchRecycleNotes());
  };

  const handleEmptyRecycleBin = async () => {
    console.log('🗑️ Emptying recycle bin');
    await dispatch(deleteAllFromRecycle());
    dispatch(fetchRecycleNotes());
  };

  const handleCopyNote = async (id) => {
    console.log('📋 Copying note:', id);
    await dispatch(copyNote(id));
    dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
  };

  const handleDownloadFile = async (id) => {
    console.log('⬇️ Downloading file for note:', id);
    await dispatch(downloadFile(id));
  };

  const handleDownloadExcel = () => {
    console.log('📊 Downloading Excel');
    dispatch(downloadExcel());
  };

  const openNoteModal = (note) => {
    console.log('📖 Opening note:', note);
    setSelectedNote(note);
    setIsEditing(false);
  };

  const closeNoteModal = () => {
    setSelectedNote(null);
    setIsEditing(false);
  };

  const saveNoteChanges = async () => {
    if (!selectedNote) {
      console.warn("Attempted to save, but no note is selected.");
      return;
    }

    const noteData = {
      id: selectedNote.id,
      title: selectedNote.title,
      description: selectedNote.description,
      category: selectedNote.category || { id: 8 }
    };

    console.log('💾 Saving note changes:', noteData);

    await dispatch(createNote({ noteData, file: null }));
    dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen   from-blue-50 via-indigo-50 to-purple-50">
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
        {/* Debug Info */}
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Debug Info:</strong> Current View: {currentView} | 
            Notes Count: {filteredNotes.length} | 
            Loading: {isLoading ? 'Yes' : 'No'} | 
            Error: {isError ? 'Yes' : 'No'}
          </p>
          {isError && <p className="text-sm text-red-600 mt-1">Error Message: {message}</p>}
        </div>

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
              <Star size={18} />
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
              <Trash2 size={18} />
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

        {/* Recycle Bin Actions */}
        {currentView === 'recycle' && filteredNotes.length > 0 && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={handleEmptyRecycleBin}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              Empty Recycle Bin
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Notes Grid */}
        {/* Notes Grid */}
        {!isLoading && filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              {currentView === 'recycle' ? <Trash2 size={64} className="mx-auto" /> : <Search size={64} className="mx-auto" />}
            </div>
            <p className="text-xl text-gray-600">
              {currentView === 'recycle' ? 'Recycle bin is empty' : 'No notes found'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Check the console (F12) for debugging information
            </p>
          </div>
        ) : !isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => openNoteModal(note)}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">{note.title || 'Untitled'}</h3>
                    {!note.isDeleted && currentView !== 'recycle' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(note);
                        }}
                        className="ml-2"
                      >
                        <Star
                          size={20}
                          className={note.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                        />
                      </button>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.description || 'No description'}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{note.createdAt || 'No date'}</span>
                    {note.hasFile && (
                      <span className="flex items-center gap-1 text-indigo-600">
                        <Download size={14} />
                        Attachment
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {currentView !== 'recycle' ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyNote(note.id);
                          }}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                        >
                          <Copy size={16} />
                          Copy
                        </button>
                        {note.hasFile && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadFile(note.id);
                            }}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-sm"
                          >
                            <Download size={16} />
                            File
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(note.id);
                          }}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestoreNote(note.id);
                          }}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                        >
                          <RotateCcw size={16} />
                          Restore
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePermanentlyDelete(note.id);
                          }}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                        >
                          <X size={16} />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {currentView === 'all' && !searchKeyword && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0 || isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <span className="text-gray-700 font-medium">
                  Page {currentPage + 1} of {notesState.pagination?.totalPages || 1}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={notesState.pagination?.islast || isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}

            {/* Show total count */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Showing {filteredNotes.length} of {notesState.pagination?.totalElements || filteredNotes.length} notes
            </p>
          </>
        )}
        
 
      
        
      </div>
      

      {/* Create Note Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Create New Note</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter note title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newNote.description}
                  onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter note description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setNewNote({ ...newNote, file: e.target.files[0] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateNote}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Note'}
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View/Edit Note Modal - Keep existing code */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full h-full max-h-screen flex flex-col">
            <div className="  from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-4 flex-1">
                {currentView !== 'recycle' && (
                  <>
                    <button
                      onClick={() => handleToggleFavorite(selectedNote)}
                      className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      <Star size={20} className={selectedNote.isFavorite ? 'fill-yellow-300 text-yellow-300' : 'text-white'} />
                      <span className="text-sm font-medium">{selectedNote.isFavorite ? 'Unfavorite' : 'Favorite'}</span>
                    </button>
                    {isEditing ? (
                      <button onClick={saveNoteChanges} disabled={isLoading} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors disabled:opacity-50">
                        <span className="text-sm font-medium">{isLoading ? 'Saving...' : 'Save Changes'}</span>
                      </button>
                    ) : (
                      <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors">
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                    )}
                  </>
                )}
              </div>
              <button onClick={closeNoteModal} className="ml-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-4xl mx-auto space-y-6">
                {isEditing ? (
                  <input
                    type="text"
                    value={selectedNote.title}
                    onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
                    className="w-full text-4xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none pb-2"
                  />
                ) : (
                  <h1 className="text-4xl font-bold text-gray-900">{selectedNote.title}</h1>
                )}
                {isEditing ? (
                  <textarea
                    value={selectedNote.description}
                    onChange={(e) => setSelectedNote({ ...selectedNote, description: e.target.value })}
                    className="w-full min-h-96 text-lg text-gray-700 leading-relaxed border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedNote.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;