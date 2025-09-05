import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { isClearAllOpen: false },
  reducers: {
    openClearAllModal: (state) => { state.isClearAllOpen = true; },
    closeClearAllModal: (state) => { state.isClearAllOpen = false; },
  },
});

export const { openClearAllModal, closeClearAllModal } = modalSlice.actions;
export default modalSlice.reducer;
