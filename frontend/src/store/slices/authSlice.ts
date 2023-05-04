import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountResponse, AuthResponse } from 'types';

const INITIAL_STATE: AuthResponse = {
   isAuth: false,
};

const authSlice = createSlice({
   name: 'auth',
   initialState: INITIAL_STATE,
   reducers: {
      setAuthTokens(
         state: AuthResponse,
         action: PayloadAction<{ accessToken: string; refreshToken: string }>,
      ) {
         state.isAuth = true;
         state.refreshToken = action.payload.refreshToken;
         state.token = action.payload.accessToken;
      },
      setUser(state: AuthResponse, action: PayloadAction<AccountResponse>) {
         state.user = action.payload;
      },
      setLogout(state: AuthResponse) {
         state.isAuth = false;
         state.refreshToken = null;
         state.token = null;
         state.user = null;
      },
   },
});

export const { setUser, setAuthTokens, setLogout } = authSlice.actions;

export default authSlice.reducer;
