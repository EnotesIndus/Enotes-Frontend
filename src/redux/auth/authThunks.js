import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/apis';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      
      if (response.data.status === 'Success' && response.data.data) {
        const { token, userDto } = response.data.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userDto));
        
        return { token, user: userDto };
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
      
      if (response.data.status === 'Success' && response.data.data) {
        const { token, userDto } = response.data.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userDto));
        
        return { token, user: userDto };
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
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);