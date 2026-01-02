import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, X } from 'lucide-react';
import { saveNote as createNote } from '../redux/notes/noteThunks';

const NoteModal = ({ note, onClose, onToggleFavorite, onRefresh }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.notes);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const saveNoteChanges = async () => {
    const noteData = {
      id: editedNote.id,
      title: editedNote.title,
      description: editedNote.description,
      category: editedNote.category || { id: 8 },
      createdOn: editedNote.createdAt,
    };

    console.log('💾 Saving note changes:', noteData);

    await dispatch(createNote({ noteData, file: null }));
    setIsEditing(false);
    onRefresh();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full h-full max-h-screen flex flex-col">
        <div className="from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-4 flex-1">
            {onToggleFavorite && (
              <>
                <button
                  onClick={() => onToggleFavorite(editedNote)}
                  className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                >
                  <Star
                    size={20}
                    className={editedNote.isFavorite ? 'fill-yellow-300 text-yellow-300' : 'text-white'}
                  />
                  <span className="text-sm font-medium">
                    {editedNote.isFavorite ? 'Unfavorite' : 'Favorite'}
                  </span>
                </button>
                {isEditing ? (
                  <button
                    onClick={saveNoteChanges}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <span className="text-sm font-medium">
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                )}
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {isEditing ? (
              <input
                type="text"
                value={editedNote.title}
                onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
                className="w-full text-4xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none pb-2"
              />
            ) : (
              <h1 className="text-4xl font-bold text-gray-900">{editedNote.title}</h1>
            )}
            {isEditing ? (
              <textarea
                value={editedNote.description}
                onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
                className="w-full min-h-96 text-lg text-gray-700 leading-relaxed border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {editedNote.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;