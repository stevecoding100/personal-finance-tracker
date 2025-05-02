import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactions/transactionSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
    },
});
