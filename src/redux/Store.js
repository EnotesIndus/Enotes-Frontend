import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import notesReducer from "./notes/noteSlice";


export const Store =configureStore({
    reducer:{
        auth: authReducer,
        notes: notesReducer,
    }
})

export default Store;