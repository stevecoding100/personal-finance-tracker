import { createSlice } from "@reduxjs/toolkit";

interface Transaction {
    id: number;
    amount: number;
    category: string;
    date: string;
}

interface TransactionsState {
    transactions: Transaction[];
}

const initialState: TransactionsState = {
    transactions: [],
};

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction(state, action) {
            state.transactions.push(action.payload);
        },
        removeTransaction(state, action) {
            state.transactions = state.transactions.filter(
                (transaction) => transaction.id !== action.payload
            );
        },
    },
});

export const { addTransaction, removeTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
