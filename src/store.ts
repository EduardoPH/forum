// store.ts
import { configureStore } from '@reduxjs/toolkit';
import publicationsReducer from './slices/publicationsSlice';

export const store = configureStore({
  reducer: {
    publications: publicationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
