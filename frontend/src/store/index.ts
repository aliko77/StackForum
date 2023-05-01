import { configureStore, combineReducers } from '@reduxjs/toolkit';

import appReducer from 'store/slices/appSlice';

const rootReducer = combineReducers({
   app: appReducer,
});

const store = configureStore({
   reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
