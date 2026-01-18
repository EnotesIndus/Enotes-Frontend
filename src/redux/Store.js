import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import notesReducer from "./notes/noteSlice";
import todoReducer from "./todo/todoSlice";
import userReducer from "./users/userSlice";
import compilerReducer from "./compiler/compilerSlice";
export const Store =configureStore({
    reducer:{
        auth: authReducer,
        notes: notesReducer,
        todo: todoReducer,
        user: userReducer,
        compiler: compilerReducer,
    }
})

export default Store;