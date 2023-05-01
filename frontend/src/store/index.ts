import { configureStore } from '@reduxjs/toolkit';

import appReducer from 'store/slices/appSlice';

const reducer = {
   app: appReducer,
};

const store = configureStore({
   reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
