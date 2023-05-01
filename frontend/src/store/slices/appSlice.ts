import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store2 from 'store2';

export enum Theme {
   Light = 'light',
   Dark = 'dark',
}

export enum Language {
   EN = 'en',
   TR = 'tr',
}

export interface AppState {
   theme: Theme;
   language: Language;
}

const INITIAL_STATE = {
   theme: store2.get('theme') || Theme.Dark,
   language: store2.get('i18nextLng') || Language.TR,
} as AppState;

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
