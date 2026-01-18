import { createSlice } from "@reduxjs/toolkit";
import { compileCode } from "./compilerThunks";

const initialState = {
  output: "",
  error: "",
  loading: false,
};

const compilerSlice = createSlice({
  name: "compiler",
  initialState,
  reducers: {
    clearOutput: (state) => {
      state.output = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(compileCode.pending, (state) => {
        state.loading = true;
        state.output = "";
        state.error = "";
      })
      .addCase(compileCode.fulfilled, (state, action) => {
        state.loading = false;
        state.output = action.payload.output || "";
        state.error = action.payload.error || "";
      })
      .addCase(compileCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to execute code";
      });
  },
});

export const { clearOutput } = compilerSlice.actions;
export default compilerSlice.reducer;