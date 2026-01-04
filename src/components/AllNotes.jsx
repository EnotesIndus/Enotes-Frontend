import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronLeftCircle, ChevronLeftCircleIcon, ChevronLeftIcon, ChevronRight, Search } from 'lucide-react';
import {
  fetchUserNotes,
  searchNotes,
  deleteNote,
  toggleFavorite,
  copyNote,
  downloadFile,
} from '../redux/notes/noteThunks';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';

const AllNotes = ({ searchKeyword }) => {
  const dispatch = useDispatch();
  const { notes, isLoading, pagination } = useSelector((state) => state.notes);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null);
  const pageSize = 9;

  // Fetch notes on mount and page change
  useEffect(() => {
    console.log('📥 Fetching all notes, page:', currentPage);
    dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
  }, [dispatch, currentPage]);

  // Handle search
  useEffect(() => {
    if (searchKeyword.trim() !== '') {
      const debounceTimer = setTimeout(() => {
        console.log('🔍 Searching for:', searchKeyword);
        dispatch(searchNotes({ pageNo: 0, pageSize, keyword: searchKeyword }));
      }, 500);
      return () => clearTimeout(debounceTimer);
    } else {
      dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
    }
  }, [searchKeyword, dispatch, currentPage]);

  const handleToggleFavorite = async (note) => {
    await dispatch(toggleFavorite({
      notesId: note.id,
      isFavorite: note.isFavorite,
      favnotesId: note.favId,
    }));
    dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
  };

  const handleDeleteNote = async (id) => {
    await dispatch(deleteNote(id));
    dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
  };

  const handleCopyNote = async (id) => {
    await dispatch(copyNote(id));
    dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }));
  };

  const handleDownloadFile = async (id) => {
    await dispatch(downloadFile(id));
  };

  const displayNotes = Array.isArray(notes) ? notes : [];

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
          <Search size={64} className="mx-auto" />
        </div>
        <p className="text-xl text-gray-600">No notes found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteNote}
            onCopy={handleCopyNote}
            onDownloadFile={handleDownloadFile}
            onClick={() => setSelectedNote(note)}
            viewType="all"
          />
        ))}
      </div>

      {/* Pagination */}
      {!searchKeyword && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0 || isLoading}
            className="px-4 py-2 bg-indigo-600  rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
                <ChevronLeft className="w-5 h-5" />

          </button>
          
          <span className="text-gray-700 font-medium">
            Page {currentPage + 1} of {pagination?.totalPages || 1}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={pagination?.islast || isLoading}
            className="px-4 py-2 bg-indigo-600  rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
           <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onToggleFavorite={handleToggleFavorite}
          onRefresh={() => dispatch(fetchUserNotes({ pageNo: currentPage, pageSize }))}
        />
      )}
    </>
  );
};

export default AllNotes;