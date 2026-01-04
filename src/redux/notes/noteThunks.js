import { createAsyncThunk } from '@reduxjs/toolkit';
import { notesAPI } from '../../services/apis';

export const fetchUserNotes = createAsyncThunk(
    'notes/fetchUserNotes',
     async ({ pageNo = 0, pageSize = 100 }, { rejectWithValue }) => {
    try { 
      const response = await notesAPI.getUserNotes(pageNo, pageSize);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }

);

export const searchNotes = createAsyncThunk(
  'notes/search',
  async ({ pageNo = 0, pageSize = 100, keyword }, { rejectWithValue }) => {
    try {
      const response = await notesAPI.searchNotes(pageNo, pageSize, keyword);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const saveNote = createAsyncThunk(
  'notes/save',
   async ({ noteData, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('notes', JSON.stringify(noteData));
      if (file) {
        formData.append('file', file);
      }
      
      const response = await notesAPI.saveNote(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (id, { rejectWithValue }) => {
    try {
      await notesAPI.deleteNote(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const restoreNote = createAsyncThunk(
  'notes/restore',
  async (id, { rejectWithValue }) => {
    try {
      await notesAPI.restoreNote(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const downloadFile = createAsyncThunk(
  'notes/downloadFile',
  async ({ fileId, fileName }, { rejectWithValue }) => {
    try {
      const response = await notesAPI.downloadFile(fileId);

      // Blob with the correct MIME type
      const contentType = response.headers['content-type'] || 'application/octet-stream';
      const blob = new Blob([response.data], { type: contentType });

      // Use fileName from your note object (fileDetails.displayFileName)
      const filename = fileName || 'download';

      // Create temporary download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      return true;
    } catch (err) {
      return rejectWithValue('Download failed');
    }
  }
);


export const fetchRecycleNotes = createAsyncThunk(
  'notes/fetchRecycle',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notesAPI.getRecycleNotes();
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete note from recycle (hard delete)
export const deleteNoteFromRecycle = createAsyncThunk(
  'notes/deleteFromRecycle',
  async (id, { rejectWithValue }) => {
    try {
      await notesAPI.deleteNoteFromRecycle(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete all from recycle bin
export const deleteAllFromRecycle = createAsyncThunk(
  'notes/deleteAllFromRecycle',
  async (_, { rejectWithValue }) => {
    try {
      await notesAPI.deleteAllFromRecycle();
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Toggle favorite
export const toggleFavorite = createAsyncThunk(
  'notes/toggleFavorite',
  async ({ notesId, isFavorite, favnotesId }, { rejectWithValue }) => {
    try {
      if (isFavorite) {
        await notesAPI.removeFromFavorites(favnotesId);
      } else {
        await notesAPI.addToFavorites(notesId);
      }
      return { notesId, isFavorite };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch all favorites
export const fetchAllFavorites = createAsyncThunk(
  'notes/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notesAPI.getAllFavorites();
      
      // The actual array is in response.data.data, not response.data
      const favoritesArray = response.data.data; // <-- THIS IS THE FIX
      
      console.log('🔍 API Response:', favoritesArray);
      
      return favoritesArray.map(fav => ({
        favId: fav.id,            // favorite row id
        id: fav.notesDto.id,      // note id
        title: fav.notesDto.title,
        description: fav.notesDto.description,
        category: fav.notesDto.category,
        fileDetails: fav.notesDto.fileDetails,
        createdBy: fav.notesDto.createdBy,
        createdOn: fav.notesDto.createdOn,
        updatedBy: fav.notesDto.updatedBy,
        updatedOn: fav.notesDto.updatedOn,
        isDeleted: fav.notesDto.isDeleted,
        deletedOn: fav.notesDto.deletedOn,
        isFavorite: true,
      }));
    } catch (error) {
      console.error('❌ Fetch favorites error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


// Copy note
export const copyNote = createAsyncThunk(
  'notes/copy',
  async (id, { rejectWithValue }) => {
    try {
      const response = await notesAPI.copyNote(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Download Excel
export const downloadExcel = createAsyncThunk(
  'notes/downloadExcel',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notesAPI.downloadExcel();
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'notes_export.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

