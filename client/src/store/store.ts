import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setUser } from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

const token = localStorage.getItem("token");
if (token) {
    const user = JSON.parse(atob(token.split(".")[1])); // crude decode
    store.dispatch(setUser({ ...user, token }));
}
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
