import React, { useState, useEffect } from 'react';
import { Search, Plus, Star, Trash2, Download, Copy, RotateCcw, FileDown, X } from 'lucide-react';
import { API_BASE_URL, API_BASE_URL_NOTES } from '../Constants/APICONSTANTS';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentView, setCurrentView] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', file: null });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockNotes = [
      { id: 1, title: 'Project Ideas', content: 'Build a note-taking app with React...', isFavorite: true, isDeleted: false, createdAt: '2024-12-20', hasFile: false },
      { id: 2, title: 'Meeting Notes', content: 'Discussed the new feature requirements...', isFavorite: false, isDeleted: false, createdAt: '2024-12-21', hasFile: true },
      { id: 3, title: 'Shopping List', content: 'Groceries: Milk, Eggs, Bread...', isFavorite: false, isDeleted: false, createdAt: '2024-12-22', hasFile: false },
      { id: 4, title: 'Deleted Note', content: 'This note is in recycle bin...', isFavorite: false, isDeleted: true, createdAt: '2024-12-19', hasFile: false },
    ];
    setNotes(mockNotes);
  }, []);

  const filteredNotes = notes.filter(note => {
    if (currentView === 'all') return !note.isDeleted;
    if (currentView === 'favorites') return note.isFavorite && !note.isDeleted;
    if (currentView === 'recycle') return note.isDeleted;
    return false;
  }).filter(note => 
    searchKeyword === '' || 
    note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    note.content.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleCreateNote = () => {
    if (newNote.title.trim() === '') return;
    
    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      isFavorite: false,
      isDeleted: false,
      createdAt: new Date().toISOString().split('T')[0],
      hasFile: newNote.file !== null
    };
    
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', file: null });
    setShowCreateModal(false);
  };

  const toggleFavorite = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isDeleted: true } : note
    ));
  };

  const restoreNote = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isDeleted: false } : note
    ));
  };

  const permanentlyDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const emptyRecycleBin = () => {
    setNotes(notes.filter(note => !note.isDeleted));
  };

  const copyNote = (id) => {
    const originalNote = notes.find(note => note.id === id);
    if (originalNote) {
      const copiedNote = {
        ...originalNote,
        id: Date.now(),
        title: `${originalNote.title} (Copy)`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setNotes([copiedNote, ...notes]);
    }
  };

  const openNoteModal = (note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  const closeNoteModal = () => {
    setSelectedNote(null);
    setIsEditing(false);
  };

  const saveNoteChanges = () => {
    setNotes(notes.map(note => 
      note.id === selectedNote.id ? selectedNote : note
    ));
    setIsEditing(false);
  };
  

  return (
    <div className="min-h-screen from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
        <h1>{API_BASE_URL_NOTES}</h1>

      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <div className="flex gap-2">
              <button
                onClick={() => alert('Downloading Excel...')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
              onClick={emptyRecycleBin}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Empty Recycle Bin
            </button>
          </div>
        )}

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              {currentView === 'recycle' ? <Trash2 size={64} className="mx-auto" /> : <Search size={64} className="mx-auto" />}
            </div>
            <p className="text-xl text-gray-600">
              {currentView === 'recycle' ? 'Recycle bin is empty' : 'No notes found'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map(note => (
              <div 
                key={note.id} 
                onClick={() => openNoteModal(note)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{note.title}</h3>
                  {!note.isDeleted && (
                    <button
                      onClick={() => toggleFavorite(note.id)}
                      className="ml-2"
                    >
                      <Star
                        size={20}
                        className={note.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                      />
                    </button>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{note.createdAt}</span>
                  {note.hasFile && (
                    <span className="flex items-center gap-1 text-indigo-600">
                      <Download size={14} />
                      Attachment
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {!note.isDeleted ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyNote(note.id);
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
                            alert('Downloading file...');
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
                          deleteNote(note.id);
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
                          restoreNote(note.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                      >
                        <RotateCcw size={16} />
                        Restore
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          permanentlyDelete(note.id);
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
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter note content..."
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
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Create Note
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

      {/* View/Edit Note Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full h-full max-h-screen flex flex-col">
            {/* Action Bar */}
            <div className=" from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-4 flex-1">
                {!selectedNote.isDeleted && (
                  <>
                    <button
                      onClick={() => toggleFavorite(selectedNote.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                      title="Toggle Favorite"
                    >
                      <Star
                        size={20}
                        className={selectedNote.isFavorite ? 'fill-yellow-300 text-yellow-300' : 'text-white'}
                      />
                      <span className="text-sm font-medium">
                        {selectedNote.isFavorite ? 'Unfavorite' : 'Favorite'}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        copyNote(selectedNote.id);
                        closeNoteModal();
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                      title="Copy Note"
                    >
                      <Copy size={20} />
                      <span className="text-sm font-medium">Copy</span>
                    </button>

                    {selectedNote.hasFile && (
                      <button
                        onClick={() => alert('Downloading file...')}
                        className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                        title="Download Attachment"
                      >
                        <Download size={20} />
                        <span className="text-sm font-medium">Download</span>
                      </button>
                    )}

                    {isEditing ? (
                      <button
                        onClick={saveNoteChanges}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                        title="Save Changes"
                      >
                        <span className="text-sm font-medium">Save Changes</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                        title="Edit Note"
                      >
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        deleteNote(selectedNote.id);
                        closeNoteModal();
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 size={20} />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </>
                )}

                {selectedNote.isDeleted && (
                  <>
                    <button
                      onClick={() => {
                        restoreNote(selectedNote.id);
                        closeNoteModal();
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                      title="Restore Note"
                    >
                      <RotateCcw size={20} />
                      <span className="text-sm font-medium">Restore</span>
                    </button>

                    <button
                      onClick={() => {
                        permanentlyDelete(selectedNote.id);
                        closeNoteModal();
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                      title="Permanently Delete"
                    >
                      <X size={20} />
                      <span className="text-sm font-medium">Delete Forever</span>
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={closeNoteModal}
                className="ml-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Title */}
                {isEditing ? (
                  <input
                    type="text"
                    value={selectedNote.title}
                    onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
                    className="w-full text-4xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none pb-2"
                    placeholder="Note title..."
                  />
                ) : (
                  <h1 className="text-4xl font-bold text-gray-900">{selectedNote.title}</h1>
                )}

                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Created: {selectedNote.createdAt}</span>
                  {selectedNote.hasFile && (
                    <span className="flex items-center gap-1 text-indigo-600">
                      <Download size={14} />
                      Has Attachment
                    </span>
                  )}
                  {selectedNote.isFavorite && (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <Star size={14} className="fill-yellow-600" />
                      Favorited
                    </span>
                  )}
                </div>

                {/* Content */}
                {isEditing ? (
                  <textarea
                    value={selectedNote.content}
                    onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
                    className="w-full min-h-96 text-lg text-gray-700 leading-relaxed border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Start typing your note..."
                  />
                ) : (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedNote.content}
                    </p>
                  </div>
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