import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '@api/auth';

export const login = createAsyncThunk('auth/login', async (data) => {
  const response = await loginApi(data);
  const { access_token, user } = response.data;

  return {
    token: access_token,
    role: user?.role || user?.role_id || null,
    user,
  };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: undefined,
    role: null,
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.user = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout, setRole } = authSlice.actions;
export default authSlice.reducer;

