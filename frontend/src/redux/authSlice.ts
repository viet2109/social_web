import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserLoginResponse } from "../types";

interface AuthState {
  user: User | null;
  fcmToken: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  fcmToken: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserLoginResponse>) => {
      state.user = {
        ...action.payload.user,
      };
      state.token = action.payload.token;
    },
    refreshTokenSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    loginSuccessWithFcmToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
    },
    logOutSuccess: (state) => {
      state.user = null;
      state.fcmToken = null;
      state.token = null;
    },
    updateUserSuccess: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    updateAVTSuccess: (state, action: PayloadAction<User>) => {
      state.user = {
        ...action.payload,
        avatar: action.payload.avatar ?? state.user?.avatar,
      };
      console.log("updateAVTSuccess", state.user);
    },
  },
});

export const {
  loginSuccess,
  logOutSuccess,
  updateUserSuccess,
  loginSuccessWithFcmToken,
  refreshTokenSuccess,
  updateAVTSuccess,
} = authSlice.actions;

export default authSlice.reducer;
