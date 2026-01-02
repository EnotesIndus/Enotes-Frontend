import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';
import {
  fetchRecycleNotes,
  restoreNote,
  deleteNoteFromRecycle,
  deleteAllFromRecycle,
} from '../redux/notes/noteThunks';
import NoteCard from './NoteCard';

const RecycleBin = () => {
  const dispatch = useDispatch();
  const { recycleNotes, isLoading } = useSelector((state) => state.notes);

  useEffect(() => {
    console.log('📥 Fetching recycle bin notes');
    dispatch(fetchRecycleNotes());
  }, [dispatch]);

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
    if (window.confirm('Are you sure you want to permanently delete all notes in the recycle bin? This action cannot be undone.')) {
      console.log('🗑️ Emptying recycle bin');
      await dispatch(deleteAllFromRecycle());
      dispatch(fetchRecycleNotes());
    }
  };

  const displayNotes = Array.isArray(recycleNotes) ? recycleNotes : [];

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (displayNotes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <Trash2 size={64} className="mx-auto" />
        </div>
        <p className="text-xl text-gray-600">Recycle bin is empty</p>
        <p className="text-sm text-gray-500 mt-2">
          Deleted notes will appear here
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Empty Recycle Bin Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleEmptyRecycleBin}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          Empty Recycle Bin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onRestore={handleRestoreNote}
            onPermanentDelete={handlePermanentlyDelete}
            viewType="recycle"
          />
        ))}
      </div>

      <p className="text-center text-sm text-gray-600 mt-4">
        {displayNotes.length} note{displayNotes.length !== 1 ? 's' : ''} in recycle bin
      </p>
    </>
  );
};

export default RecycleBin;