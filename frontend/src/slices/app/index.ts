import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'stores';

type StateProps = {
   theme: string;
};

const initialState = {
   theme: 'default',
} as StateProps;

const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      _setTheme: (state, action: PayloadAction<string>) => {
         state.theme = action.payload;
      },
   },
});

export const { _setTheme } = appSlice.actions;
export const getTheme = (state: RootState) => state.app.theme;

export default appSlice.reducer;
