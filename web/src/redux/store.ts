import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import firestoreReducer from './slices/firestoreSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    firestore: firestoreReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
