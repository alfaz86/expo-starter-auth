import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  activeTheme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
    setActiveTheme: (state, action) => {
      state.activeTheme = action.payload;
    },
  },
});

export const { setTheme, setActiveTheme } = themeSlice.actions;
export default themeSlice.reducer;
