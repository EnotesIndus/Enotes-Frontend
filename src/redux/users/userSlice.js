import { createSlice } from "@reduxjs/toolkit";
import {
  sendResetPasswordMail,
  verifyResetPasswordToken,
  resetPassword
} from "./userThunks";

const initialState = {
  sendMail: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  verifyToken: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  resetPassword: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.sendMail = initialState.sendMail;
      state.verifyToken = initialState.verifyToken;
      state.resetPassword = initialState.resetPassword;
    },
  },

  extraReducers: (builder) => {
    builder
      // ================= SEND RESET MAIL =================
      .addCase(sendResetPasswordMail.pending, (state) => {
        state.sendMail.isLoading = true;
        state.sendMail.isError = false;
      })
      .addCase(sendResetPasswordMail.fulfilled, (state, action) => {
        state.sendMail.isLoading = false;
        state.sendMail.isSuccess = true;
        state.sendMail.message = action.payload?.message || "Mail sent successfully";
      })
      .addCase(sendResetPasswordMail.rejected, (state, action) => {
        state.sendMail.isLoading = false;
        state.sendMail.isError = true;
        state.sendMail.message = action.payload;
      })

      // ================= VERIFY RESET TOKEN =================
      .addCase(verifyResetPasswordToken.pending, (state) => {
        state.verifyToken.isLoading = true;
        state.verifyToken.isError = false;
      })
      .addCase(verifyResetPasswordToken.fulfilled, (state, action) => {
        state.verifyToken.isLoading = false;
        state.verifyToken.isSuccess = true;
        state.verifyToken.message = action.payload?.message || "Token verified";
      })
      .addCase(verifyResetPasswordToken.rejected, (state, action) => {
        state.verifyToken.isLoading = false;
        state.verifyToken.isError = true;
        state.verifyToken.message = action.payload;
      })

      // ================= RESET PASSWORD =================
      .addCase(resetPassword.pending, (state) => {
        state.resetPassword.isLoading = true;
        state.resetPassword.isError = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.isSuccess = true;
        state.resetPassword.message = action.payload?.message || "Password reset successful";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.isError = true;
        state.resetPassword.message = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
