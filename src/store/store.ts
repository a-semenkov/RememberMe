/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import userReducer from '../features/user/userSlice';
import entryReducer from '../features/calendarEntry/entrySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    entry: entryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
