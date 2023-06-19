import { configureStore } from '@reduxjs/toolkit';

//reducers
import app from 'slices/app';

export const store = configureStore({
   reducer: {
      app,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
