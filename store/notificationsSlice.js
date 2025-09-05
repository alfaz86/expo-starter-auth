import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.list.push({ ...action.payload, read: false });
    },
    markAsRead: (state, action) => {
      state.list = state.list.map(n =>
        n.id === action.payload ? { ...n, read: true } : n
      );
    },
    clearNotifications: (state) => {
      state.list = [];
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
