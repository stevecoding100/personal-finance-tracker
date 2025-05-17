import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setUser } from "../features/auth/authSlice";
import transactionReducer from "../features/transactions/transactionSlice";
import budgetReducer from "../features/budgets/budgetSlice";
import savingReducer from "../features/savings/savingSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        transactions: transactionReducer,
        budgets: budgetReducer,
        savings: savingReducer,
    },
});

const storedUser = localStorage.getItem("user");

if (storedUser) {
    const user = JSON.parse(storedUser);
    store.dispatch(setUser(user));
}
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
