import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from 'store/slices/appSlice';
import authReducer from 'store/slices/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
   key: 'root',
   storage: storage,
};

export const rootReducers = combineReducers({
   app: appReducer,
   auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
