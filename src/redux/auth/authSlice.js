import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser } from './authThunks';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
reducers: {
    resetAuthState: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
        },
    clearAuth: (state) => {
        state.user = null;
        state.token = null;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
        },
    },

    extraReducers: (builder) => {
        
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.message = 'Login successful';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.token = null;
            })


        builder 
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = '';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.message = 'Registration successful';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.token = null;
            })


        builder
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isSuccess = false;
                state.message = '';
            });
    },
});

export const { resetAuthState, clearAuth } = authSlice.actions;
export default authSlice.reducer;