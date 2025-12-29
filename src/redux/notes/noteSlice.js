import { createSlice } from '@reduxjs/toolkit';
import {
 
  fetchUserNotes,
  searchNotes,
  saveNote as createNote,
  deleteNote,
  restoreNote,
  downloadFile,
  fetchRecycleNotes,
  deleteNoteFromRecycle,
  deleteAllFromRecycle,
  toggleFavorite,
  fetchAllFavorites,
  copyNote,
  downloadExcel,
} from '../notes/noteThunks';

const initialState = {
  notes: [],
  recycleNotes: [],
  favoriteNotes: [],
  currentNote: null,
  pagination: {
    currentPage: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetNotesState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
    },
    clearNotes: (state) => {
      state.notes = [];
      state.currentNote = null;
    },
    clearRecycleNotes: (state) => {
      state.recycleNotes = [];
    },
  },
  extraReducers: (builder) => {
   
    //   // Fetch All Notes
    //   .addCase(fetchAllNotes.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(fetchAllNotes.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.notes = action.payload;
    //   })
    //   .addCase(fetchAllNotes.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //   })
       builder
      // Fetch User Notes
      .addCase(fetchUserNotes.pending, (state) => {
        state.isLoading = true;
      })
     .addCase(fetchUserNotes.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.notes = action.payload.notesDtoList; // ← Changed this
  state.pagination = {
    pageNo: action.payload.pageNo,
    pageSize: action.payload.pageSize,
    totalElements: action.payload.totalElements,
    totalPages: action.payload.totalPages,
    isFirst: action.payload.isFirst,
    islast: action.payload.islast,
  };
})
      .addCase(fetchUserNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Search Notes
      .addCase(searchNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload.notesList || action.payload;
      })
      .addCase(searchNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Create Note
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Note created successfully';
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Delete Note
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = state.notes.filter(note => note.id !== action.payload);
        state.message = 'Note moved to recycle bin';
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Restore Note
      .addCase(restoreNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recycleNotes = state.recycleNotes.filter(note => note.id !== action.payload);
        state.message = 'Note restored successfully';
      })
      .addCase(restoreNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Fetch Recycle Notes
      .addCase(fetchRecycleNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecycleNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recycleNotes = action.payload;
      })
      .addCase(fetchRecycleNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Delete Note From Recycle
      .addCase(deleteNoteFromRecycle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNoteFromRecycle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recycleNotes = state.recycleNotes.filter(note => note.id !== action.payload);
        state.message = 'Note permanently deleted';
      })
      .addCase(deleteNoteFromRecycle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Delete All From Recycle
      .addCase(deleteAllFromRecycle.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recycleNotes = [];
        state.message = 'Recycle bin emptied';
      })
      
      // Toggle Favorite
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { notesId, isFavorite } = action.payload;
        const note = state.notes.find(n => n.id === notesId);
        if (note) {
          note.isFavorite = !isFavorite;
        }
        state.message = isFavorite ? 'Removed from favorites' : 'Added to favorites';
      })
      
      // Fetch All Favorites
      .addCase(fetchAllFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favoriteNotes = action.payload;
      })
      
      // Copy Note
      .addCase(copyNote.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Note copied successfully';
      })
      
      // Download Excel
      .addCase(downloadExcel.fulfilled, (state) => {
        state.message = 'Excel downloaded successfully';
      });
  },
});

export const { resetNotesState, setCurrentNote, clearNotes, clearRecycleNotes } = notesSlice.actions;
export default notesSlice.reducer;