import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/apis';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      
      if (response.data.status === 'Success' && response.data.data) {
        // No token in response - backend stores it in HttpOnly cookie
        // Just return the user data
        return { user: response.data.data.userDto };
      }
      
      return rejectWithValue(response.data.message || 'Login failed');
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      
      if (response.data.status === 'Success') {
        // Register just returns a success message, no token/user data
        return { message: response.data.message };
      }
      
      return rejectWithValue(response.data.message || 'Registration failed');
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout(); // Call backend to clear the cookie
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      // Cookie is sent automatically by browser
      const response = await authAPI.refreshToken();
      if (response.data.status === 'Success') {
        return true;
      }
      return rejectWithValue('Refresh failed');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);