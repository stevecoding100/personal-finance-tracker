import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setUser } from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

const token = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

if (token && storedUser) {
    const user = JSON.parse(storedUser);
    store.dispatch(setUser({ ...user, token }));
}
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
