import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    createBudget,
    fetchBudgets,
    updateBudget,
    deleteBudget,
} from "../../services/api/budgetAPI";
import { Budget } from "../../types/type";

// Async thunks
export const fetchBudgetsThunk = createAsyncThunk(
    "budgets/fetchAll",
    async () => {
        const data = await fetchBudgets();
        return data as Budget[];
    }
);

// Thunk to create a new budget
export const createBudgetThunk = createAsyncThunk(
    "budgets/create",
    async (
        newBudget: {
            category: string;
            amount: number;
            created_at: string;
            user_id: number;
        },
        { rejectWithValue }
    ) => {
        try {
            const data = await createBudget(newBudget);

            return {
                ...data,
                created_at: data.created_at,
            } as Budget;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to create budget");
        }
    }
);

export const updateBudgetThunk = createAsyncThunk(
    "budgets/update",
    async ({ id, data }: { id: number; data: Partial<Budget> }) => {
        const res = await updateBudget(id, data);
        return res as Budget;
    }
);

export const deleteBudgetThunk = createAsyncThunk(
    "budgets/delete",
    async (id: number) => {
        await deleteBudget(id);
        return id;
    }
);
// Slice state
interface BudgetsState {
    budgets: Budget[];
    selectedBudget: Budget | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    hasMore: boolean;
}

const initialState: BudgetsState = {
    budgets: [],
    selectedBudget: null,
    status: "idle",
    error: null,
    hasMore: true,
};
// Slice
const budgetSlice = createSlice({
    name: "budgets",
    initialState,
    reducers: {
        addBudget: (state, action) => {
            state.budgets.push(action.payload);
        },
        selectBudget: (state, action: PayloadAction<Budget | null>) => {
            state.selectedBudget = action.payload;
        },

        clearBudgets: (state) => {
            state.budgets = [];
            state.status = "idle";
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchBudgetsThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBudgetsThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.budgets = action.payload;
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchBudgetsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch budgets";
            })
            // Create
            .addCase(createBudgetThunk.fulfilled, (state, action) => {
                state.budgets.push(action.payload);
            })
            .addCase(createBudgetThunk.rejected, (state, action) => {
                state.error = action.error.message || "Failed to create budget";
            })

            // Update
            .addCase(updateBudgetThunk.fulfilled, (state, action) => {
                const index = state.budgets.findIndex(
                    (b) => b.id === action.payload.id
                );
                if (index !== -1) {
                    state.budgets[index] = action.payload;
                }
            })
            .addCase(updateBudgetThunk.rejected, (state, action) => {
                state.error = action.error.message || "Failed to update budget";
            })
            // Delete
            .addCase(deleteBudgetThunk.fulfilled, (state, action) => {
                state.budgets = state.budgets.filter(
                    (b) => b.id !== action.payload
                );
            })
            .addCase(deleteBudgetThunk.rejected, (state, action) => {
                state.error = action.error.message || "Failed to delete budget";
            });
    },
});

export const { selectBudget, addBudget, clearBudgets } = budgetSlice.actions;

export default budgetSlice.reducer;
