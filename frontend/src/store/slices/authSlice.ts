import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountResponse } from 'types';

export interface AuthState {
   user: AccountResponse | null;
   token: string | null;
   refreshToken: string | null;
}

const INITIAL_STATE: AuthState = {
   user: null,
   token: null,
   refreshToken: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState: INITIAL_STATE,
   reducers: {
      setAuthTokens(
         state: AuthState,
         action: PayloadAction<{ accessToken: string; refreshToken: string }>,
      ) {
         state.refreshToken = action.payload.refreshToken;
         state.token = action.payload.accessToken;
      },
      setUser(state: AuthState, action: PayloadAction<AccountResponse>) {
         state.user = action.payload;
      },
      setLogout(state: AuthState) {
         state.user = null;
         state.token = null;
         state.refreshToken = null;
      },
   },
});

export const { setUser, setAuthTokens, setLogout } = authSlice.actions;

export default authSlice.reducer;
