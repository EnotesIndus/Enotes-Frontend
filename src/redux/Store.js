import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import notesReducer from "./notes/noteSlice";
import todoReducer from "./todo/todoSlice";


export const Store =configureStore({
    reducer:{
        auth: authReducer,
        notes: notesReducer,
        todo: todoReducer,
    }
})

export default Store;