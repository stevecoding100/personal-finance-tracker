import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number;
    name: string;
    email: string;
    token: string;
}

interface AuthState {
    user: User | null;
}

// Load user from localStorage
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
