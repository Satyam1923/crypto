// src/redux/slices/firestoreSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../lib/firebase'; // Adjust the path to your Firebase configuration
import { RootState } from '../store'; // Import RootState to access user ID
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

// Define a type for your Firestore data
interface DataItem {
    id?: string; // Firestore document ID
    userId: string; // User ID to associate the data with
    name: string;
    value: number;
}

interface FirestoreState {
    data: DataItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FirestoreState = {
    data: [],
    status: 'idle',
    error: null,
};

// Create an async thunk for adding data to Firestore
export const addData = createAsyncThunk<DataItem, Omit<DataItem, 'id'>>(
    'firestore/addData',
    async (data, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.uid; // Get the current user's ID

        if (!userId) throw new Error('User is not authenticated');

        const docRef = await addDoc(collection(db, 'yourCollection'), { ...data, userId });
        return { id: docRef.id, ...data, userId }; // Return the added data with its new ID
    }
);

// Create an async thunk for fetching data from Firestore
export const fetchData = createAsyncThunk<DataItem[], void>(
    'firestore/fetchData',
    async (_, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.uid; // Get the current user's ID

        if (!userId) throw new Error('User is not authenticated');

        const q = query(collection(db, 'yourCollection'), where('userId', '==', userId));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DataItem[]; // Type assertion
    }
);

// Create an async thunk for removing data from Firestore
export const removeData = createAsyncThunk<string, string>(
    'firestore/removeData',
    async (id) => {
        await deleteDoc(doc(db, 'yourCollection', id));
        return id; // Return the ID of the deleted document
    }
);

const firestoreSlice = createSlice({
    name: 'firestore',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addData.fulfilled, (state, action: PayloadAction<DataItem>) => {
                state.status = 'succeeded';
                state.data.push(action.payload); // Add the new data to the state
            })
            .addCase(addData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to add data';
            })
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
                state.status = 'succeeded';
                state.data = action.payload; // Replace current state with fetched data
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch data';
            })
            .addCase(removeData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeData.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.data = state.data.filter(item => item.id !== action.payload); // Remove the deleted data from state
            })
            .addCase(removeData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to remove data';
            });
    },
});

export default firestoreSlice.reducer;
