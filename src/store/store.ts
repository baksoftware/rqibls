import { configureStore } from '@reduxjs/toolkit';
import engineReducer from './engineSlice';

export const store = configureStore({
  reducer: {
    engine: engineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 