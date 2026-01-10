import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { saveNote as createNote, fetchUserNotes } from '../redux/notes/noteThunks';

const CreateNoteModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.notes);
  const [newNote, setNewNote] = useState({ title: '', description: '', file: null });

  const handleCreateNote = async () => {
    if (newNote.title.trim() === '') {
      alert('Please enter a title for your note');
      return;
    }

    const noteData = {
      title: newNote.title,
      description: newNote.description,
      category: {
        id: 8
      }
    };

    console.log('💾 Creating note:', noteData);

    await dispatch(createNote({ noteData, file: newNote.file }));
    
    // Refresh the notes list
    dispatch(fetchUserNotes({ pageNo: 0, pageSize: 9 }));
    
    setNewNote({ title: '', description: '', file: null });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Create New Note</h2>
          <button
            onClick={onClose}
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
              className="flex-1 px-4 py-2 bg-indigo-600  rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Note'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;