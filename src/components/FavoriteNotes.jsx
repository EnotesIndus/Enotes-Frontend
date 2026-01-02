import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from 'lucide-react';
import {
  fetchAllFavorites,
  deleteNote,
  toggleFavorite,
  copyNote,
  downloadFile,
} from '../redux/notes/noteThunks';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';

const FavoriteNotes = ({ searchKeyword }) => {
  const dispatch = useDispatch();
  const { favoriteNotes, isLoading } = useSelector((state) => state.notes);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    console.log('📥 Fetching favorite notes');
    dispatch(fetchAllFavorites());
  }, [dispatch]);


useEffect(() => {
  console.log('favoriteNotesssssssssssssssssssss:', favoriteNotes);
  console.log('isLoading:', isLoading);
}, [favoriteNotes, isLoading]);


  const handleToggleFavorite = async (note) => {
    await dispatch(toggleFavorite({
      notesId: note.id,
      isFavorite: true,
      favnotesId: note.favId,
    }));
    dispatch(fetchAllFavorites()); // Refresh after toggle
  };

  const handleDeleteNote = async (id) => {
    await dispatch(deleteNote(id));
    dispatch(fetchAllFavorites());
  };

  const handleCopyNote = async (id) => {
    await dispatch(copyNote(id));
    dispatch(fetchAllFavorites());
  };

  const handleDownloadFile = async (id) => {
    await dispatch(downloadFile(id));
  };

  // Filter the already-flattened favoriteNotes array
  const filteredNotes = Array.isArray(favoriteNotes)
    ? favoriteNotes.filter(note =>
        searchKeyword.trim() === '' ||
        note.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        note.description?.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : [];

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (filteredNotes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <Star size={64} className="mx-auto" />
        </div>
        <p className="text-xl text-gray-600">No favorite notes found</p>
        <p className="text-sm text-gray-500 mt-2">
          {searchKeyword.trim() !== ''
            ? 'No notes match your search'
            : 'Star your important notes to see them here'}
        </p>
      </div>
    );
  }


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteNote}
            onCopy={handleCopyNote}
            onDownloadFile={handleDownloadFile}
            onClick={() => setSelectedNote(note)}
            viewType="favorites"
          />
        ))}
      </div>

      <p className="text-center text-sm text-gray-600 mt-4">
        Showing {filteredNotes.length} favorite note{filteredNotes.length !== 1 ? 's' : ''}
      </p>

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onToggleFavorite={handleToggleFavorite}
          onRefresh={() => dispatch(fetchAllFavorites())}
        />
      )}
    </>
  );
};

export default FavoriteNotes;