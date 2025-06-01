import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setUser } from "./slices/authSlice";
import transactionReducer from "./slices/transactionSlice";
import budgetReducer from "./slices/budgetSlice";
import savingReducer from "./slices/savingSlice";
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
    store.dispatch(
        setUser({
            ...user,
            id: Number(user.id),
        })
    );
}
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
