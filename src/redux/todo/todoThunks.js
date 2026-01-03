import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoAPI } from "../../services/apis";


export const getAllTodo = createAsyncThunk(
    'todo/getAll',

    async (_, { rejectWithValue }) => {
        try {
            const response = await todoAPI.getAllTodo();
            return response.data.data || response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }

)

export const saveTodo = createAsyncThunk(
    'todo/save',
    async (todoData, {rejectWithValue})=>{
        try{
                const response = await todoAPI.saveTodo(todoData);
                return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }

)


export const getTodoById = createAsyncThunk(
    'todo/getById',
    async (id, {rejectWithValue})=>{
        try{
            const response =  await todoAPI.getTodoById(id);
            return response.data.data || response.data;
        }catch(error){   
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }


);
export const getTodoByStatus = createAsyncThunk(
    'todo/getByStatus',
    async (status, {rejectWithValue})=>{
        try{
            const response =  await todoAPI.getTodoByStatus(status);
            return response.data.data || response.data;
        }catch(error){   
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todo/delete',
    async(id, {rejectWithValue})=>{
        try{
            const response = await todoAPI.deleteTodo(id);
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }

)

export const changeStatus = createAsyncThunk(
  'todo/changeStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await todoAPI.changeStatus(id, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
