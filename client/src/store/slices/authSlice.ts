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
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
    user: parsedUser
        ? {
              ...parsedUser,
              id: parsedUser.id,
          }
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        signOut(state) {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const { setUser, signOut } = authSlice.actions;
export default authSlice.reducer;
