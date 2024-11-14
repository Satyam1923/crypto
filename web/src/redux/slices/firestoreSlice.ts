import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../lib/firebase'; 
import { RootState } from '../store'; 
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';

// Define a type for your Firestore data
interface DataItem {
    id?: string;
    userId: string;
    name: string;
    value: number;
}

interface FileItem {
    id?: string;
    userId: string;
    fileName: string;
    fileUrl: string;
}

interface FirestoreState {
    data: DataItem[];
    files: FileItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FirestoreState = {
    data: [],
    files: [],
    status: 'idle',
    error: null,
};

interface AddDataPayload {
    collectionPath: string;
    documentId: string;
    response: any; 
}

// Create an async thunk for adding data to Firestore
export const addData = createAsyncThunk<DataItem, AddDataPayload>(
    'firestore/addData',
    async ({ collectionPath, documentId, response }, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.uid;

        if (!userId) throw new Error('User is not authenticated');

        // Use the collectionPath in your Firestore operation
        const docRef = await addDoc(collection(db, collectionPath), { ...response, userId });
        return { id: docRef.id, ...response, userId }; 
    }
);

// Create an async thunk for fetching data from Firestore with dynamic collection path
export const fetchData = createAsyncThunk<DataItem[], string>(
    'firestore/fetchData',
    async (collectionPath, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.uid;

        if (!userId) throw new Error('User is not authenticated');

        // Use the collectionPath in your Firestore query
        const q = query(collection(db, collectionPath), where('userId', '==', userId));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DataItem[]; 
    }
);

// Create an async thunk for removing data from Firestore
export const removeData = createAsyncThunk<string, string>(
    'firestore/removeData',
    async (id) => {
        await deleteDoc(doc(db, 'yourCollection', id));
        return id; 
    }
);

// Create an async thunk for fetching files from Firestore
export const fetchFiles = createAsyncThunk<FileItem[], void>(
    'firestore/fetchFiles',
    async (_, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.uid;

        if (!userId) throw new Error('User is not authenticated');

        const q = query(collection(db, 'yourFilesCollection'), where('userId', '==', userId));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FileItem[]; 
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
                state.data.push(action.payload); 
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
                state.data = action.payload;
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
                state.data = state.data.filter(item => item.id !== action.payload);
            })
            .addCase(removeData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to remove data';
            })
            .addCase(fetchFiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFiles.fulfilled, (state, action: PayloadAction<FileItem[]>) => {
                state.status = 'succeeded';
                state.files = action.payload; 
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch files';
            });
    },
});

export default firestoreSlice.reducer;
