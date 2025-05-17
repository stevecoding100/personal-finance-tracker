import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
} from "../../services/api/budgetAPI";
import { Budget } from "../../types/type";

// Thunks
export const fetchBudgetsThunk = createAsyncThunk(
    "budgets/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchBudgets();
            return data as Budget[];
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const createBudgetThunk = createAsyncThunk(
    "budgets/create",
    async (
        newBudget: Omit<Budget, "id" | "created_at" | "updated_at">,
        { rejectWithValue }
    ) => {
        try {
            const data = await createBudget(newBudget);
            return data as Budget;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateBudgetThunk = createAsyncThunk(
    "budgets/update",
    async (
        { id, data }: { id: number; data: Partial<Budget> },
        { rejectWithValue }
    ) => {
        try {
            const res = await updateBudget(id, data);
            return res as Budget;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteBudgetThunk = createAsyncThunk(
    "budgets/delete",
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteBudget(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// Slice

interface BudgetState {
    budgets: Budget[];
    selected: Budget | null;
    loading: boolean;
    error: string | null;
}

const initialState: BudgetState = {
    budgets: [],
    selected: null,
    loading: false,
    error: null,
};

const budgetSlice = createSlice({
    name: "budgets",
    initialState,
    reducers: {
        clearBudget: (state) => {
            state.budgets = [];
            state.selected = null;
        },
        selectBudget: (state, action: PayloadAction<Budget>) => {
            state.selected = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBudgetsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBudgetsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.budgets = action.payload;
            })
            .addCase(fetchBudgetsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createBudgetThunk.fulfilled, (state, action) => {
                state.budgets.push(action.payload);
            })
            .addCase(updateBudgetThunk.fulfilled, (state, action) => {
                const index = state.budgets.findIndex(
                    (s) => s.id === action.payload.id
                );
                if (index !== -1) {
                    state.budgets[index] = action.payload;
                }
            })
            .addCase(deleteBudgetThunk.fulfilled, (state, action) => {
                state.budgets = state.budgets.filter(
                    (s) => s.id !== action.payload
                );
            });
    },
});

export const { clearBudget, selectBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
