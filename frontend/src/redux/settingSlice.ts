import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingState {
  theme: Theme;
}

type Theme = "light" | "dark" | "system";

const initialState: SettingState = {
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    resetTheme: (state) => {
      state.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    },
  },
});

export const { setTheme, resetTheme } = settingSlice.actions;

export default settingSlice.reducer;
