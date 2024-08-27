import JWTService from '@/lib/inMemoryJWTService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { signIn, signUp } from '../services/auth';

interface AuthState {
  status: 'pending' | 'fulfilled' | 'error';
  error: string | null;
}

const initialState: AuthState = {
  status: 'pending',
  error: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      JWTService.removeToken();
      state.status = 'pending';
      state.error = null;
    },
    checkAuth: (state) => {
      const token = JWTService.getToken();
      if (token) {
        state.error = null;
        state.status = 'fulfilled';
      } else {
        state.error = null;
        state.status = 'pending';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.error = null;
        state.status = 'pending';
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        state.error = null;
        state.status = 'fulfilled';
        JWTService.setToken(action.payload.token);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to sign in';
      })
      .addCase(signUp.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        state.status = 'fulfilled';
        state.error = null;
        JWTService.setToken(action.payload.token);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to sign up';
      });
  },
});
export const { logout, checkAuth } = authSlice.actions;
export const selectIsAuth = (state: RootState) => state.auth.status === 'fulfilled';
export default authSlice.reducer;
