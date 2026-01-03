import { createSlice } from "@reduxjs/toolkit";
import { changeStatus, deleteTodo, getAllTodo, getTodoById, getTodoByStatus, saveTodo } from "./todoThunks";


const initialState = {
    todos: [],
    currentTodo: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        resetTodoState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
        setCurrentTodo: (state, action) => {
            state.currentTodo = action.payload;
        },
        clearTodos: (state) => {
            state.todos = [];
            state.currentTodo = null;
        },
    },

    extraReducers: (builder) => {
        builder 
            // Fetch All Todo
            .addCase(getAllTodo.pending, (state)=>{
                state.isLoading = true; 
            })

            .addCase(getAllTodo.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.todos = action.payload;
            })
            
            .addCase(getAllTodo.rejected,(state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload; 
            })

        builder 
            
            // Save Todo
            .addCase(saveTodo.pending,(state)=>{
                state.isLoading = true;
            })

            .addCase(saveTodo.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.message = 'todo saved successfully';
                state.todos.push(action.payload);
            })

            .addCase(saveTodo.rejected,(state,action)=>{       
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        builder
            // Get Todo By Id
            .addCase(getTodoById.pending,(state)=>{
                state.isLoading = true;
            })

            .addCase(getTodoById.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.currentTodo = action.payload;
                state.message = 'todo  by id fetched successfully';
            })
            .addCase(getTodoById.rejected,(state,action)=>{     
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

        builder
            // Get Todo By Status
            .addCase(getTodoByStatus.pending,(state)=>{
                state.isLoading = true;
            })                      

            .addCase(getTodoByStatus.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.todos = action.payload;
                state.message = 'todo  by status fetched successfully';
            })
            .addCase(getTodoByStatus.rejected,(state,action)=>{     
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

        builder
            // Delete Todo
            .addCase(deleteTodo.pending,(state)=>{
                state.isLoading = true;
            })                    
            .addCase(deleteTodo.fulfilled,(state,action)=>{ 
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.todos = state.todos.filter(todo => todo.id !== action.meta.arg);
            })
            .addCase(deleteTodo.rejected,(state,action)=>{     
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })  

        builder
            // Change Status
            .addCase(changeStatus.pending,(state)=>{
                state.isLoading = true;
            })                    
            .addCase(changeStatus.fulfilled,(state,action)=>{ 
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                const { id, status } = action.meta.arg;
                const index = state.todos.findIndex(todo => todo.id === id);
                if (index !== -1) {
                    state.todos[index].status = status;
                }
            })
            .addCase(changeStatus.rejected,(state,action)=>{     
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })      
            
    },
    
});

export const {resetTodoState, setCurrentTodo, clearTodos} = todoSlice.actions;
export default todoSlice.reducer;
