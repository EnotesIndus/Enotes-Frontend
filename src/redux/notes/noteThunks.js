import { createAsyncThunk } from '@reduxjs/toolkit';
import { notesAPI } from '../../services/apis';

export const fetchUserNotes = createAsyncThunk(
    'notes/fetchUserNotes',
     async ({ pageNo = 0, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const response = await notesAPI.getUserNotes(pageNo, pageSize);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }

);