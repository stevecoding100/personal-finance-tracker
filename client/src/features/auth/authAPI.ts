import { authorizedFetch } from "./api";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
    const res = await authorizedFetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    // Save token in localStorage
    localStorage.setItem("token", data.token);
    return data;
};

export const register = async (
    name: string,
    email: string,
    password: string
) => {
    const res = await authorizedFetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    const data = await res.json();
    // Save token in localStorage
    localStorage.setItem("token", data.token);
    return data;
};
