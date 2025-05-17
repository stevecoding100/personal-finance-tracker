import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchTransactions as fetchTransactionsAPI,
    createTransactionAPI,
    fetchTransactionById,
    updateTransaction,
    deleteTransaction,
} from "../../services/api/transactionAPI";
import { Transaction } from "../../types/type";

interface TransactionsState {
    transactions: Transaction[];
    selectedTransaction: Transaction | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    hasMore: boolean;
}

const initialState: TransactionsState = {
    transactions: [],
    selectedTransaction: null,
    status: "idle",
    error: null,
    hasMore: true,
};

// Async thunks
export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async (_, thunkAPI) => {
        try {
            return await fetchTransactionsAPI();
        } catch (error: any) {
            return thunkAPI.rejectWithValue((error as Error).message);
        }
    }
);

export const createTransaction = createAsyncThunk(
    "transactions/createTransaction",
    async (data: Omit<Transaction, "id">, thunkAPI) => {
        try {
            const response = await createTransactionAPI(data);
            return response as Transaction;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getTransactionById = createAsyncThunk(
    "transactions/getTransactionById",
    async (id: number, thunkAPI) => {
        try {
            return await fetchTransactionById(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const editTransaction = createAsyncThunk(
    "transactions/editTransaction",
    async (
        { id, data }: { id: number; data: Partial<Transaction> },
        thunkAPI
    ) => {
        try {
            return await updateTransaction(id, data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteTransactionById = createAsyncThunk(
    "transactions/deleteTransaction",
    async (id: number, thunkAPI) => {
        try {
            await deleteTransaction(id);
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Slice
const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        resetTransactions(state) {
            state.transactions = [];
            state.hasMore = true;
            state.status = "idle";
            state.error = null;
            state.selectedTransaction = null;
        },
        addTransaction(state, action) {
            state.transactions.push(action.payload);
        },
        removeTransaction(state, action) {
            state.transactions = state.transactions.filter(
                (transaction) => transaction.id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.transactions.unshift(action.payload);
            })
            .addCase(fetchTransactions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(getTransactionById.fulfilled, (state, action) => {
                state.selectedTransaction = action.payload;
            })
            .addCase(editTransaction.fulfilled, (state, action) => {
                const index = state.transactions.findIndex(
                    (t) => t.id === action.payload.id
                );
                if (index !== -1) {
                    state.transactions[index] = action.payload;
                }
                state.selectedTransaction = null;
            })
            .addCase(deleteTransactionById.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter(
                    (t) => t.id !== action.payload
                );
            });
    },
});

// Exports
export const { addTransaction, removeTransaction, resetTransactions } =
    transactionSlice.actions;

export default transactionSlice.reducer;
