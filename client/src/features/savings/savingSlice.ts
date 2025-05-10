import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchGoals,
    createGoal,
    fetchGoal,
    updateGoal,
    deleteGoal,
} from "../../services/api/savingAPI";
import { Saving } from "../../types/type";

// Thunks

export const fetchSavingsThunk = createAsyncThunk(
    "savings/fetchAll",
    async (
        { page, limit }: { page: number; limit: number },
        { rejectWithValue }
    ) => {
        try {
            const data = await fetchGoals(page, limit);
            return data as Saving[];
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const createSavingThunk = createAsyncThunk(
    "savings/create",
    async (
        newGoal: Omit<Saving, "id" | "created_at" | "updated_at">,
        { rejectWithValue }
    ) => {
        try {
            const data = await createGoal(newGoal);
            return data as Saving;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchSavingThunk = createAsyncThunk(
    "savings/fetchOne",
    async (id: number, { rejectWithValue }) => {
        try {
            const data = await fetchGoal(id);
            return data as Saving;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateSavingThunk = createAsyncThunk(
    "savings/update",
    async (
        { id, data }: { id: number; data: Partial<Saving> },
        { rejectWithValue }
    ) => {
        try {
            const res = await updateGoal(id, data);
            return res as Saving;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteSavingThunk = createAsyncThunk(
    "savings/delete",
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteGoal(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// Slice

interface SavingState {
    savings: Saving[];
    selected: Saving | null;
    loading: boolean;
    error: string | null;
}

const initialState: SavingState = {
    savings: [],
    selected: null,
    loading: false,
    error: null,
};

const savingSlice = createSlice({
    name: "savings",
    initialState,
    reducers: {
        clearSavings: (state) => {
            state.savings = [];
            state.selected = null;
        },
        selectSaving: (state, action: PayloadAction<Saving>) => {
            state.selected = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSavingsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSavingsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.savings = action.payload;
            })
            .addCase(fetchSavingsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createSavingThunk.fulfilled, (state, action) => {
                state.savings.push(action.payload);
            })
            .addCase(updateSavingThunk.fulfilled, (state, action) => {
                const index = state.savings.findIndex(
                    (s) => s.id === action.payload.id
                );
                if (index !== -1) {
                    state.savings[index] = action.payload;
                }
            })
            .addCase(deleteSavingThunk.fulfilled, (state, action) => {
                state.savings = state.savings.filter(
                    (s) => s.id !== action.payload
                );
            })
            .addCase(fetchSavingThunk.fulfilled, (state, action) => {
                state.selected = action.payload;
            });
    },
});

export const { clearSavings, selectSaving } = savingSlice.actions;

export default savingSlice.reducer;
