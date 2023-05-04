import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppResponse, Language, Theme } from 'types';

const INITIAL_STATE = {
   theme: Theme.Dark,
   language: Language.TR,
} as AppResponse;

const appSlice = createSlice({
   name: 'app',
   initialState: INITIAL_STATE,
   reducers: {
      setTheme: (state, action: PayloadAction<Theme>) => {
         state.theme = action.payload;
      },
      setLanguage: (state, action: PayloadAction<Language>) => {
         state.language = action.payload;
      },
   },
});

export const { setTheme, setLanguage } = appSlice.actions;

export default appSlice.reducer;
