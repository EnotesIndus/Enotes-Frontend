import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../services/apis";

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (passwordData, {rejectWithValue})=>{
        try{
                const response = await userAPI.changePassword(passwordData);
                return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const sendResetPasswordMail = createAsyncThunk(
    'user/sendResetPasswordMail',
    async (emailData, {rejectWithValue})=>{
        try{
                const response = await userAPI.resetPasswordMail(emailData);
                return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const verifyResetPasswordToken = createAsyncThunk(   
    'user/verifyResetPasswordToken',
    async ({uid,resetCode}, {rejectWithValue})=>{
        try{
                const response = await userAPI.verifyEmailResetLink({uid,resetCode});
                return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }           
    }
);


export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async (resetData, {rejectWithValue})=>{
        try{
                const response = await userAPI.resetPassword(resetData);
                return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }           
    }
);