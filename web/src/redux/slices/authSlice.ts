import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, googleProvider } from '../../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

interface User extends FirebaseUser {}

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Check for localStorage only in the client
if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    initialState.user = JSON.parse(storedUser);
  }
}

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (_, thunkAPI) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginWithEmail = createAsyncThunk('auth/loginWithEmail', async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const registerWithEmail = createAsyncThunk('auth/registerWithEmail', async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
    localStorage.removeItem('user');
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(loginWithEmail.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(registerWithEmail.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded';
          state.error = null; 
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      );
  },
});

export default authSlice.reducer;
