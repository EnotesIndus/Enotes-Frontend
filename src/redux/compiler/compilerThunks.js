import { createAsyncThunk } from "@reduxjs/toolkit";
import { compileApi } from "../../services/apis";

export const compileCode = createAsyncThunk(
    'compiler/compileCode',
    async (codeData, {rejectWithValue})=>{
        try{
                const response = await compileApi.runCode(codeData);
                return response.data.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);